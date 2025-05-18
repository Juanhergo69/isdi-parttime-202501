//Importa el servicio de usuarios que contiene la lógica de negocio relacionada con usuarios//
const UserService = require('../services/userService')

//Define el controlador de usuarios que manejará las operaciones CRUD de usuarios//
const userHandler = {
    //Método para obtener un usuario específico por su ID//
    getUser: (req, res) => {
        //Extrae el ID del usuario de los parámetros de la URL//
        const { id } = req.params;

        //Llama al servicio para obtener el usuario por ID//
        UserService.getUserById(id)
            .then(({ success, user }) => {
                //Si no se encuentra el usuario, devuelve error 404//
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        error: 'User not found'
                    });
                }

                //Prepara un objeto de usuario con todos los campos necesarios, estableciendo valores por defecto si faltan//
                const completeUser = {
                    id: user.id,
                    email: user.email || '',            //Usa cadena vacía si email es null/undefined//
                    userName: user.userName || '',      //Usa cadena vacía si userName es null/undefined//
                    avatar: user.avatar || null,        //Usa null si avatar es null/undefined//
                    status: user.status || ''           //Usa cadena vacía si status es null/undefined//
                }

                //Devuelve el usuario completo con éxito 200//
                res.json({
                    success: true,
                    user: completeUser
                })
            })
            .catch(error => {
                //Si ocurre un error en el servidor, registra el error y devuelve error 500//
                console.error('Error getting user:', error)
                res.status(500).json({
                    success: false,
                    error: 'Error retrieving user data'
                })
            })
    },

    //Método para actualizar los datos de un usuario//
    updateUser: (req, res) => {
        //Extrae el ID del usuario de los parámetros de la URL//
        const { id } = req.params
        //Extrae los datos a actualizar del cuerpo de la solicitud//
        let updateData = req.body

        //Si la solicitud incluye un archivo (avatar), procesa la imagen//
        if (req.file) {
            //Convierte el buffer de la imagen a base64//
            const imageBase64 = req.file.buffer.toString('base64')
            //Combina los datos de actualización con el nuevo avatar//
            updateData = { ...updateData, avatar: imageBase64 }
        }

        //Llama al servicio para actualizar el usuario con los nuevos datos//
        UserService.updateUser(id, updateData)
            .then(({ success, user }) => {
                //Si la actualización es exitosa, devuelve el usuario actualizado//
                res.json({ success, user })
            })
            .catch(error => {
                //Si falla (datos inválidos), devuelve error 400//
                res.status(400).json({
                    success: false,
                    error: error.error || 'Failed to update user'
                })
            })
    },

    //Método para eliminar un usuario//
    deleteUser: (req, res) => {
        //Extrae el ID del usuario de los parámetros de la URL//
        const { id } = req.params

        //Llama al servicio para eliminar el usuario//
        UserService.deleteUser(id)
            .then(({ success }) => {
                //Si la eliminación es exitosa, devuelve confirmación//
                res.json({ success })
            })
            .catch(error => {
                //Si falla, registra el error y devuelve error 400//
                console.error('Error deleting user:', error)
                res.status(400).json(error)
            })
    },

    //Método para actualizar el estado de un usuario//
    updateStatus: (req, res) => {
        //Extrae el ID del usuario de los parámetros de la URL//
        const { id } = req.params
        //Extrae el nuevo estado del cuerpo de la solicitud//
        const { status } = req.body

        //Llama al servicio para actualizar el estado del usuario//
        UserService.updateUserStatus(id, status)
            .then(({ success, user }) => {
                //Si es exitoso, devuelve el usuario con estado actualizado//
                res.json({ success, user })
            })
            .catch(error => {
                //Si falla, devuelve error 400//
                res.status(400).json(error)
            })
    },

    //Método para actualizar el avatar de un usuario//
    updateAvatar: (req, res) => {
        //Verifica si se proporcionó un archivo de imagen válido//
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No valid image provided'
            })
        }

        //Convierte el buffer de la imagen a base64 (similar al procesamiento en mensajes)//
        const imageBase64 = req.file ? req.file.buffer.toString('base64') : null

        //Llama al servicio para actualizar el avatar del usuario//
        UserService.updateUserAvatar(req.params.id, imageBase64)
            .then(({ success, user }) => {
                //Devuelve el resultado exitoso con el usuario actualizado//
                res.json({ success, user, notification })
            })
            .catch(error => {
                //Si falla, devuelve error 400//
                res.status(400).json(error)
            })
    },

    //Método para eliminar el avatar de un usuario//
    deleteAvatar: (req, res) => {
        //Extrae el ID del usuario de los parámetros de la URL//
        const { id } = req.params

        //Llama al servicio para eliminar el avatar del usuario//
        UserService.deleteUserAvatar(id)
            .then(({ success, user }) => {
                //Devuelve confirmación de eliminación exitosa//
                res.json({ success, user })
            })
            .catch(error => {
                //Si falla, devuelve error 400//
                res.status(400).json(error)
            })
    },

    //Método para obtener todos los usuarios//
    getAllUsers: (req, res) => {
        //Llama al servicio para obtener todos los usuarios//
        UserService.getAllUsers()
            .then(({ success, users }) => {
                //Asegura que users sea siempre un array (incluso si el servicio devuelve undefined/null)//
                const safeUsers = Array.isArray(users) ? users : []

                //Devuelve la lista de usuarios con éxito 200//
                res.json({
                    success,
                    users: safeUsers
                })
            })
            .catch(error => {
                //Si ocurre un error, registra el error y devuelve error 500 con array vacío//
                console.error('Error getting users:', error)
                res.status(500).json({
                    success: false,
                    error: 'Error retrieving users',
                    users: [] //Array vacío en caso de error//
                })
            })
    }
}

//Exporta el controlador para ser utilizado en las rutas//
module.exports = userHandler