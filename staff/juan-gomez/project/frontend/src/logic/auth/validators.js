export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
    }
}

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    if (!passwordRegex.test(password)) {
        throw new Error('Password must contain: 8+ chars, 1 uppercase, 1 number, 1 special char')
    }
}

export const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
    }
}

export const validateRequiredField = (value, fieldName) => {
    if (!value.trim()) {
        throw new Error(`${fieldName} is required`)
    }
}