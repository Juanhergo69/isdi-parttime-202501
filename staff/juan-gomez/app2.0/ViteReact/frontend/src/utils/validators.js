//Valida formato de email con expresión regular//
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //texto@texto.texto//
    return emailRegex.test(email); //Retorna true si cumple el patrón//
}

//Valida fortaleza de contraseña//
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    //Requiere: 1 minúscula, 1 mayúscula, 1 número, 1 caracter especial y mínimo 6 caracteres//
    return passwordRegex.test(password)
}

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

//Función para validar todos los campos del formulario//
export const validateForm = (formData, setErrors) => {
    const newErrors = {}
    
    if (!formData.userName.trim()) {
        newErrors.userName = 'Username is required'
    }

    if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Invalid email format'
    }

    if (formData.password || formData.confirmPassword) {
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        else if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase, one lowercase, one number and one special character'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
}