//Exporta una función llamada handleDislike que maneja la acción de "dislike" a un mensaje//
export const handleDislike = (messageDate, userId) => {
    //Codifica la fecha del mensaje para usarla de forma segura en la URL//
    //Esto convierte caracteres especiales a su representación URL-safe//
    const encodedDate = encodeURIComponent(messageDate)

    //Realiza una petición HTTP POST al endpoint de dislikes del servidor//
    return fetch(`http://localhost:3001/api/messages/${encodedDate}/dislike`, {
        method: 'POST',                         //Especifica que es una petición de tipo POST//
        headers: {
            'Content-Type': 'application/json', //Indica que enviaremos datos JSON//
        },
        body: JSON.stringify({ userId })        //Convierte el userId a formato JSON para enviarlo//
    })
        //Primera promesa: maneja la respuesta inicial del servidor//
        .then(response => {
            //Verifica si la respuesta no fue exitosa (status fuera del rango 200-299)//
            if (!response.ok) {
                //Lanza un error si el servidor respondió con un error HTTP//
                throw new Error('Failed to dislike message')
            }
            //Convierte la respuesta a formato JSON para procesarla//
            return response.json()
        })
        //Segunda promesa: maneja los datos JSON recibidos del servidor//
        .then(data => {
            //Verifica si la operación fue exitosa según la respuesta del servidor//
            if (data.success) {
                //Retorna los mensajes actualizados si todo fue exitoso//
                return data.messages
            }
            //Lanza un error si el servidor respondió con success: false//
            throw new Error('Failed to update messages after dislike')
        })
}