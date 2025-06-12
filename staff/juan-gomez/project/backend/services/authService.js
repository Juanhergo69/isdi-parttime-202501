import * as userRepository from '../data/userRepository.js'
import { validatePassword, validateEmail } from '../utils/helpers.js'
import {
    ValidationError,
    InvalidEmailError,
    InvalidPasswordError,
    PasswordsDontMatchError,
    RequiredFieldsError,
    EmailInUseError,
    UsernameTakenError,
    UnauthorizedError
} from 'common'

export const register = async (userData) => {
    const { username, email, password, confirmPassword } = userData

    if (!username || !email || !password || !confirmPassword) {
        throw new RequiredFieldsError('All fields are required')
    }

    if (password !== confirmPassword) {
        throw new PasswordsDontMatchError()
    }

    try {
        validateEmail(email);
        validatePassword(password)
    } catch (error) {
        if (error.message.includes('email')) {
            throw new InvalidEmailError()
        } else if (error.message.includes('Password')) {
            throw new InvalidPasswordError()
        }
        throw new ValidationError(error.message)
    }

    const existingUserByEmail = await userRepository.findUserByEmail(email)
    if (existingUserByEmail) {
        throw new EmailInUseError()
    }

    const existingUserByUsername = await userRepository.findUserByUsername(username)
    if (existingUserByUsername) {
        throw new UsernameTakenError()
    }

    return userRepository.createUser({ username, email, password })
}

export const login = async (email, password) => {
    if (!email || !password) {
        throw new ValidationError('Email and password are required')
    }

    const user = await userRepository.findUserByEmail(email)
    if (!user) {
        throw new UnauthorizedError('Account not found')
    }

    const isPasswordValid = await userRepository.comparePasswords(password, user.password)
    if (!isPasswordValid) {
        throw new UnauthorizedError('Incorrect password')
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
}

