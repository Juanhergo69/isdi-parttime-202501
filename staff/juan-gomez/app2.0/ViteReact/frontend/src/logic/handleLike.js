//Exporta una función llamada handleLike que permite a un usuario dar "like" a un mensaje//
export const handleLike = (messageDate, userId) => {
    //Codifica la fecha del mensaje para usarla de forma segura en la URL//
    //Esto convierte caracteres especiales para que sean válidos en URLs//
    const encodedDate = encodeURIComponent(messageDate)

    //Realiza una petición HTTP al servidor para registrar el "like"//
    return fetch(`http://localhost:3001/api/messages/${encodedDate}/like`, {
        method: 'POST', //Método HTTP POST para crear/modificar recursos//
        headers: {
            //Especifica que el cuerpo de la petición está en formato JSON//
            'Content-Type': 'application/json',
        },
        //Convierte el objeto {userId} a string JSON para enviarlo en el cuerpo//
        body: JSON.stringify({ userId })
    })
        //Maneja la respuesta HTTP inicial del servidor//
        .then(response => {
            //Verifica si la respuesta no fue exitosa (código de estado 4xx/5xx)//
            if (!response.ok) {
                //Lanza un error si falló la petición HTTP//
                throw new Error('Failed to like message')
            }
            //Convierte la respuesta a formato JSON (devuelve una promesa)//
            return response.json()
        })
        //Maneja los datos JSON recibidos del servidor//
        .then(data => {
            //Verifica si la operación fue exitosa según el servidor//
            if (data.success) {
                //Retorna los mensajes actualizados si todo fue correcto//
                return data.messages
            }
            //Lanza un error si el servidor indica que falló la operación//
            throw new Error('Failed to update messages after like')
        })
}