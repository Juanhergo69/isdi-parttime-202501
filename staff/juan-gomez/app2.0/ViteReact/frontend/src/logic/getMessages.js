//Exporta una función llamada getMessages que no recibe parámetros//
export const getMessages = () => {
    //Realiza una petición HTTP GET al endpoint de mensajes del servidor//
    return fetch('http://localhost:3001/api/messages')
        //Primera promesa: maneja la respuesta del servidor//
        .then(response => {
            //Verifica si la respuesta no fue exitosa (status fuera del rango 200-299)//
            if (!response.ok) {
                //Lanza un error si la respuesta de red no fue satisfactoria//
                throw new Error('Network response was not ok')
            }
            //Convierte la respuesta a formato JSON y la retorna para el siguiente then//
            return response.json()
        })
        //Segunda promesa: maneja los datos JSON recibidos//
        .then(data => {
            //Validación exhaustiva de la estructura de datos recibida://
            //1. Que exista el objeto data//
            //2. Que la propiedad success sea verdadera//
            //3. Que messages sea un array//
            if (data && data.success && Array.isArray(data.messages)) {
                //Retorna solo el array de mensajes si pasa todas las validaciones//
                return data.messages
            }
            //Lanza un error si la estructura de datos no es la esperada//
            throw new Error('Invalid messages data format')
        })
        //Manejo de errores (catch): captura cualquier error en la cadena de promesas//
        .catch(error => {
            //Registra el error en la consola para depuración//
            console.error('Error in getMessages:', error)
            //Retorna un array vacío como valor de fallback para continuar el flujo//
            return []
        })
}





