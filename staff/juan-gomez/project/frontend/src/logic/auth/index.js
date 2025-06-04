import { setUserSession, clearUserSession } from './storage'
import { authenticateUser, createUser, checkUserExists } from './authRepository'
import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateRequiredField
} from './validators'

export const registerUser = (userData) => {
    const { username, email, password, confirmPassword } = userData

    validateRequiredField(username, 'Username')
    validateRequiredField(email, 'Email')
    validateEmail(email)
    validateRequiredField(password, 'Password')
    validatePassword(password)
    validatePasswordMatch(password, confirmPassword)

    checkUserExists(username, email)

    const newUser = createUser({ username, email, password })
    setUserSession(newUser.id)
    return newUser
}

export const loginUser = (credentials, rememberMe) => {
    const { email, password } = credentials

    validateEmail(email)
    validatePassword(password)

    const user = authenticateUser(email, password)
    setUserSession(user.id, rememberMe)
    return user
}

export const logoutUser = () => {
    clearUserSession()
}