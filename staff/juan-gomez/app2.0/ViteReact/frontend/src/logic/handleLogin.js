//Exporta una función llamada validateEmail que maneja los parámetros base de un email//
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//Exporta una función llamada handleLogin que maneja el proceso de inicio de sesión//
export const handleLogin = (formData) => {
    //Primera validación: verifica el formato del email antes de enviar al servidor//
    if (!validateEmail(formData.email)) {
        //Si el email no es válido, rechaza inmediatamente con un objeto de error estructurado//
        return Promise.reject({
            success: false,                 //Indica que la operación falló//
            error: 'Invalid email format',  //Mensaje descriptivo del error//
            shouldRedirect: false           //Indica que no se debe redirigir al usuario//
        })
    }

    //Prepara los datos para enviar al backend://
    //Crea un objeto con solo los campos necesarios para el login//
    const loginData = {
        email: formData.email,                    //Email del usuario//
        password: formData.password,              //Contraseña//
        rememberme: formData.rememberme || false  //Opción "recordarme", default false//
    }

    //Realiza la petición HTTP POST al endpoint de login del servidor//
    return fetch('http://localhost:3001/api/login', {
        method: 'POST',                          //Método HTTP para enviar datos//
        headers: {
            'Content-Type': 'application/json',  //Indica que enviamos JSON//
        },
        body: JSON.stringify(loginData)          //Convierte el objeto a string JSON//
    })
        //Primera promesa: maneja la respuesta HTTP del servidor//
        .then(response => {
            //Si la respuesta no es exitosa (status 4xx/5xx)//
            if (!response.ok) {
                //Intenta parsear el cuerpo del error y rechaza con él//
                return response.json().then(error => Promise.reject(error))
            }
            //Si la respuesta es OK, parsea el JSON de la respuesta//
            return response.json()
        })
        //Segunda promesa: maneja los datos parseados del servidor//
        .then(data => {
            //Si el servidor indica que la operación no fue exitosa//
            if (!data.success) {
                //Rechaza con los datos del error del servidor//
                return Promise.reject(data)
            }
            //Si todo es correcto, resuelve con los datos del servidor//
            return data
        })
        //Manejo de errores: captura cualquier error en la cadena//
        .catch(error => {
            //Registra el error en consola para depuración//
            console.error('Login error:', error)

            //Asegura que el error tenga una estructura consistente//
            if (!error || typeof error !== 'object') {
                //Crea un objeto de error estándar si el error no lo era//
                return Promise.reject({
                    success: false,
                    error: 'Login failed. Please try again later.',
                    shouldRedirect: false
                })
            }
            //Si el error ya tenía estructura adecuada, lo rechaza tal cual//
            return Promise.reject(error)
        })
}