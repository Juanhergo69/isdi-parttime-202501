//Exporta una función constante llamada handleFavorite para manejar el favorito de mensajes//
export const handleFavorite = (messageDate, userId) => {
    //Codifica la fecha del mensaje para usarla de forma segura en la URL//
    //Esto previene problemas con caracteres especiales en la fecha//
    const encodedDate = encodeURIComponent(messageDate)

    //Realiza una petición HTTP POST al endpoint de favoritos del servidor//
    return fetch(`http://localhost:3001/api/messages/${encodedDate}/favorite`, {
        method: 'POST', //Especifica que es una petición de tipo POST//
        headers: {
            //Indica al servidor que estamos enviando datos en formato JSON//
            'Content-Type': 'application/json',
        },
        //Convierte el objeto con el userId a una cadena JSON para enviarlo en el cuerpo//
        body: JSON.stringify({ userId })
    })
        //Primera promesa: maneja la respuesta inicial del servidor//
        .then(response => {
            //Verifica si la respuesta HTTP no fue exitosa (status fuera de 200-299)//
            if (!response.ok) {
                //Lanza un error si hubo un problema con la petición HTTP//
                throw new Error('Failed to favorite message')
            }
            //Convierte la respuesta del servidor de JSON a objeto JavaScript//
            return response.json();
        })
        //Segunda promesa: maneja los datos JSON recibidos del servidor//
        .then(data => {
            //Verifica si la operación fue exitosa según la respuesta del servidor//
            if (data.success) {
                //Retorna el array de mensajes actualizado si todo fue exitoso//
                return data.messages
            }
            //Lanza un error si el servidor respondió que la operación falló//
            throw new Error('Failed to update messages after favorite')
        })
}