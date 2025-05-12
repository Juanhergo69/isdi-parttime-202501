//Exporta una función asíncrona llamada handleRemoveImage que elimina el avatar de un usuario//
export const handleRemoveImage = (userId) => {
    //Retorna una nueva Promesa para manejar operaciones asíncronas//
    return new Promise((resolve, reject) => {
        //Validación inicial: verifica si se proporcionó un userId//
        if (!userId) {
            //Rechaza inmediatamente si no hay userId con un error descriptivo//
            reject(new Error('User ID is required'))
            //Termina la ejecución de la función//
            return
        }

        //Realiza una petición HTTP DELETE al endpoint de avatar del usuario//
        fetch(`http://localhost:3001/api/users/${userId}/avatar`, {
            method: 'DELETE',                        //Método HTTP para eliminar recursos//
            headers: {
                'Content-Type': 'application/json',  //Indica que esperamos JSON//
            },
        })
            //Primera promesa: maneja la respuesta HTTP del servidor//
            .then(response => {
                //Verifica si la respuesta no fue exitosa (status 4xx/5xx)//
                if (!response.ok) {
                    //Si hay error, parsea el cuerpo del error y rechaza con su mensaje//
                    return response.json().then(error => reject(new Error(error.error || 'Failed to delete avatar')))
                }
                //Si la respuesta es OK, parsea el JSON de la respuesta//
                return response.json()
            })
            //Segunda promesa: maneja los datos parseados del servidor//
            .then(data => {
                //Verifica si la operación fue exitosa según el servidor//
                if (data.success) {
                    //Resuelve la promesa con los datos del servidor//
                    resolve(data)
                } else {
                    //Rechaza con el mensaje de error del servidor o uno por defecto//
                    reject(new Error(data.error || 'Avatar deletion failed'))
                }
            })
            //Captura cualquier error que ocurra en la cadena de promesas//
            .catch(error => reject(error))
    })
}