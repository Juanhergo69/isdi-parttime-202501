export const validateUsername = (username, users, currentUserId = null) => {
    if (!username.trim()) throw new Error('Username is required')

    const usernameExists = users.some(
        user => user.username === username && user.id !== currentUserId
    )
    if (usernameExists) throw new Error('Username already taken')
}

export const validateEmail = (email, users, currentUserId = null) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) throw new Error('Please enter a valid email address')

    const emailExists = users.some(
        user => user.email === email && user.id !== currentUserId
    )
    if (emailExists) throw new Error('Email already in use')
}

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    if (!passwordRegex.test(password)) {
        throw new Error('Password must contain at least one uppercase letter, one number, and one special character')
    }
}