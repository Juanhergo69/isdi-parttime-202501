import * as userService from './userService.js'
import { validatePassword, validateEmail } from '../utils/helpers.js'

export const register = async (userData) => {
    const { username, email, password, confirmPassword } = userData

    if (!username || !email || !password || !confirmPassword) {
        throw { status: 400, message: 'All fields are required' }
    }

    if (password !== confirmPassword) {
        throw { status: 400, message: 'Passwords do not match' }
    }

    try {
        validateEmail(email);
        validatePassword(password)
    } catch (error) {
        throw { status: 400, message: error.message }
    }

    const existingUserByEmail = await userService.findUserByEmail(email)
    if (existingUserByEmail) {
        throw { status: 409, message: 'Email already in use' }
    }

    const existingUserByUsername = await userService.findUserByUsername(username)
    if (existingUserByUsername) {
        throw { status: 409, message: 'Username already taken' }
    }

    return userService.createUser({ username, email, password })
}

export const login = async (email, password) => {
    if (!email || !password) {
        throw { status: 400, message: 'Email and password are required' }
    }

    const user = await userService.findUserByEmail(email)
    if (!user) {
        throw { status: 401, message: 'Account not found' }
    }

    if (user.password !== password) {
        throw { status: 401, message: 'Incorrect password' }
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
}

