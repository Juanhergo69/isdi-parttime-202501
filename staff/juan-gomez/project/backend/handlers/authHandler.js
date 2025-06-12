import jwt from 'jsonwebtoken'
import * as authService from '../services/authService.js'
import * as userRepository from '../data/userRepository.js'

export const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body)

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        )

        const { password, ...userWithoutPassword } = user

        res.status(201).json({
            token,
            user: userWithoutPassword
        })
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await authService.login(email, password)

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        )

        const { password: _, ...userWithoutPassword } = user

        res.json({
            token,
            user: userWithoutPassword
        })
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        next(error)
    }
}

export const getCurrentUser = async (req, res, next) => {
    try {
        const user = await userRepository.findUserById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const { password, ...userWithoutPassword } = user
        res.json(userWithoutPassword)
    } catch (error) {
        next(error)
    }
}


