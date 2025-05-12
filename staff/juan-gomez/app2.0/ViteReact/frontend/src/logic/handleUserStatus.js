//Exporta una función para manejar el cambio de estado (status) de un usuario//
export const handleUserStatus = (userId, status) => {
    //Retorna una nueva Promesa para manejar operaciones asíncronas//
    return new Promise((resolve, reject) => {
        //Validación inicial: verifica que se haya proporcionado un userId//
        if (!userId) {
            //Rechaza la promesa inmediatamente si no hay userId//
            reject(new Error('User ID is required'))
            //Termina la ejecución//
            return
        }

        //Realiza una petición HTTP para actualizar el estado del usuario//
        fetch(`http://localhost:3001/api/users/${userId}/status`, {
            method: 'PUT',  // Método HTTP para actualizar recursos
            headers: {
                'Content-Type': 'application/json', //Indica que enviamos datos JSON//
            },
            body: JSON.stringify({ status })        //Convierte el estado a JSON para enviar//
        })
            //Maneja la respuesta HTTP del servidor//
            .then(response => {
                //Verifica si la respuesta no fue exitosa (status 4xx/5xx)//
                if (!response.ok) {
                    //Si hay error, parsea el mensaje de error del servidor//
                    return response.json().then(error =>
                        //Rechaza con el mensaje de error del servidor o uno por defecto//
                        reject(new Error(error.error || 'Failed to update status'))
                    )
                }
                //Si la respuesta es OK, parsea el cuerpo como JSON//
                return response.json()
            })
            //Maneja los datos parseados de la respuesta//
            .then(data => {
                //Verifica si la operación fue exitosa según el servidor//
                if (data.success) {
                    //Resuelve la promesa con los datos del servidor//
                    resolve(data)
                } else {
                    //Rechaza con el mensaje de error del servidor o uno por defecto//
                    reject(new Error(data.error || 'Status update failed'))
                }
            })
            //Captura cualquier error que ocurra en la cadena de promesas//
            .catch(error =>
                //Rechaza la promesa con el error capturado//
                reject(error)
            )
    })
}