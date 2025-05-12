//Exporta una función llamada deleteMessage que recibe un parámetro 'date' (fecha del mensaje a eliminar)//
export const deleteMessage = (date) => {
    //Realiza una petición HTTP DELETE al servidor, enviando la fecha codificada en la URL//
    return fetch(`http://localhost:3001/api/messages/${encodeURIComponent(date)}`, {
        method: 'DELETE' //Especifica que es una petición de tipo DELETE//
    })
        //Primera promesa: maneja la respuesta del servidor//
        .then(response => {
            //Verifica si la respuesta no fue exitosa (status fuera del rango 200-299)//
            if (!response.ok) {
                //Lanza un error si la respuesta no fue exitosa//
                throw new Error('Failed to delete message')
            }
            //Convierte la respuesta a formato JSON y la retorna para el siguiente then//
            return response.json()
        })
        //Segunda promesa: maneja los datos JSON recibidos//
        .then(data => {
            //Verifica si el servidor indicó que la operación no fue exitosa (success: false)//
            if (!data.success) {
                //Lanza un error si el servidor reportó fallo en la eliminación//
                throw new Error('Message deletion failed on server')
            }

            //Obtiene todos los mensajes almacenados en localStorage, o un array vacío si no hay ninguno//
            const messages = JSON.parse(localStorage.getItem('messages') || '[]')
            //Filtra los mensajes, eliminando el que coincide con la fecha proporcionada//
            const updatedMessages = messages.filter(msg => msg.date !== date)
            //Guarda la lista actualizada de mensajes de vuelta en localStorage//
            localStorage.setItem('messages', JSON.stringify(updatedMessages))

            //Retorna los datos recibidos del servidor para posibles usos posteriores//
            return data
        })
}