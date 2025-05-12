//Valida formato de email usando expresión regular//
const validateEmail = (email) => {
    //Define la expresión regular para validar emails://
    //- ^[^\s@]+: 1+ caracteres que no sean espacios ni @ al inicio//
    //- @: seguido de una @//
    //- [^\s@]+: 1+ caracteres que no sean espacios ni @//
    //- \.: seguido de un punto//
    //- [^\s@]+$: 1+ caracteres que no sean espacios ni @ al final//
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    //Prueba si el email cumple con el patrón y retorna true/false//
    return emailRegex.test(email)
}

// Valida que la contraseña cumpla con requisitos de seguridad
const validatePassword = (password) => {
    //Define la expresión regular para contraseñas seguras://
    //- ^(?=.*[a-z]): debe contener al menos 1 minúscula//
    //- (?=.*[A-Z]): debe contener al menos 1 mayúscula//
    //- (?=.*\d): debe contener al menos 1 número//
    //- (?=.*[@$!%*?&]): debe contener al menos 1 caracter especial//
    //- [A-Za-z\d@$!%*?&]{6,}: mínimo 6 caracteres de los tipos permitidos//
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    //Prueba si la contraseña cumple los requisitos y retorna true/false//
    return passwordRegex.test(password)
}

// Valida que un título no exceda 5 palabras
const validateTitle = (title) => {
    //Divide el título en palabras usando espacios como separadores://
    //- split(/\s+/): divide por cualquier cantidad de espacios//
    //- filter(word => word.length > 0): elimina "palabras" vacías//
    const words = title.split(/\s+/).filter(word => word.length > 0)

    //Retorna true si tiene 5 palabras o menos, false si tiene más//
    return words.length <= 5
}

//Valida que un texto no exceda 100 palabras//
const validateTextarea = (textarea) => {
    //Divide el texto en palabras (mismo método que en validateTitle)//
    const words = textarea.split(/\s+/).filter(word => word.length > 0)

    //Retorna true si tiene 100 palabras o menos, false si tiene más//
    return words.length <= 100
}

//Exporta todas las funciones de validación para ser usadas en otros módulos//
module.exports = {
    validateEmail,    //Función para validar emails//
    validatePassword, //Función para validar contraseñas//
    validateTitle,    //Función para validar títulos (límite palabras)//
    validateTextarea  //Función para validar textareas (límite palabras)//
}