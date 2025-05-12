//Valida que un título no exceda 5 palabras//
export const validateTitle = (title) => {
    const words = title.split(/\s+/).filter(word => word.length > 0) //Divide y filtra palabras vacías//
    return words.length <= 5 //True si tiene 5 palabras o menos//
}

//Valida que un texto no exceda 100 palabras//
export const validateTextarea = (textarea) => {
    const words = textarea.split(/\s+/).filter(word => word.length > 0)
    return words.length <= 100 //True si tiene 100 palabras o menos//
}

//Exporta una función para manejar el envío de mensajes con validaciones y soporte para imágenes//
export const handleSubmitMessage = (formData, userId, selectedImage, callback) => {
    //PRIMERA VALIDACIÓN: Verifica que el título cumpla con los requisitos//
    if (!validateTitle(formData.title)) {
        //Ejecuta el callback con el error si la validación falla//
        callback({
            success: false,
            error: 'Title cannot exceed 5 words'
        })
        //Retorna una promesa rechazada para detener el flujo//
        return Promise.reject('Title validation failed')
    }

    //SEGUNDA VALIDACIÓN: Verifica que el mensaje cumpla con los requisitos//
    if (!validateTextarea(formData.msg)) {
        //Ejecuta el callback con el error si la validación falla//
        callback({
            success: false,
            error: 'Message cannot exceed 100 words'
        })
        //Retorna una promesa rechazada para detener el flujo//
        return Promise.reject('Message validation failed')
    }

    //PREPARACIÓN DEL FORMULARIO: Crea un objeto FormData para enviar al servidor//
    const formDataToSend = new FormData()
    //Agrega el ID del usuario al formulario//
    formDataToSend.append('userId', userId)
    //Agrega el título del mensaje al formulario//
    formDataToSend.append('title', formData.title)
    //Agrega el contenido del mensaje al formulario//
    formDataToSend.append('msg', formData.msg)

    //Si hay una imagen seleccionada, la agrega al formulario//
    if (selectedImage) {
        formDataToSend.append('image', selectedImage);
    }

    //PETICIÓN HTTP: Envía los datos al servidor//
    return fetch('http://localhost:3001/api/messages', {
        method: 'POST',  // Método HTTP para crear recursos
        body: formDataToSend  //Usa FormData directamente (no necesita headers para 'Content-Type')//
    })
        //PRIMER THEN: Maneja la respuesta HTTP del servidor//
        .then(response => {
            //Si la respuesta no es exitosa (status 4xx/5xx)//
            if (!response.ok) {
                //Lanza un error para ser capturado en el catch//
                throw new Error('Failed to submit message')
            }
            //Convierte la respuesta a JSON si fue exitosa//
            return response.json()
        })
        //SEGUNDO THEN: Maneja los datos procesados del servidor//
        .then(data => {
            //Si el servidor confirma el éxito de la operación//
            if (data.success) {
                //Ejecuta el callback con mensaje de éxito (diferente si hay imagen)//
                callback({
                    success: true,
                    message: selectedImage
                        ? 'Message stored successfully with image!'
                        : 'Message stored successfully!'
                })
                //Retorna el mensaje creado para uso posterior//
                return data.message
            }
            //Si el servidor indica fallo, lanza error//
            throw new Error('Failed to process message')
        })
        //CATCH: Manejo centralizado de errores//
        .catch(error => {
            //Registra el error en consola para depuración//
            console.error('Error submitting message:', error)
            //Ejecuta el callback con el error//
            callback({
                success: false,
                error: error.message || 'Failed to submit message'
            })
            //Propaga el error para manejo adicional si es necesario//
            throw error;
        })
}