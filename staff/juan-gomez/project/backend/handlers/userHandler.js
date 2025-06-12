import * as userService from '../services/userService.js'
import * as userRepository from '../data/userRepository.js'
import bcrypt from 'bcrypt'

export const getUserById = async (req, res, next) => {
    try {
        const user = await userRepository.findUserById(parseInt(req.params.id))
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const { password, ...userWithoutPassword } = user
        res.json(userWithoutPassword)
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const updates = req.body
        const currentUser = req.user

        if (!currentUser) {
            return res.status(401).json({
                message: 'Authentication required',
                errorCode: 'UNAUTHORIZED'
            })
        }

        if (parseInt(id) !== currentUser.id) {
            return res.status(403).json({
                message: 'Unauthorized to update this profile',
                errorCode: 'FORBIDDEN'
            })
        }

        const user = await userRepository.findUserById(parseInt(id))
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                errorCode: 'USER_NOT_FOUND'
            })
        }

        if (updates.username && updates.username !== user.username) {
            const existingUser = await userRepository.findUserByUsername(updates.username)
            if (existingUser) {
                return res.status(409).json({
                    message: 'Username already taken',
                    errorCode: 'USERNAME_TAKEN'
                })
            }
        }

        if (updates.email && updates.email !== user.email) {
            const existingUser = await userRepository.findUserByEmail(updates.email)
            if (existingUser) {
                return res.status(409).json({
                    message: 'Email already in use',
                    errorCode: 'EMAIL_IN_USE'
                })
            }
        }

        if (updates.newPassword) {
            if (!updates.currentPassword) {
                return res.status(400).json({
                    message: 'Current password is required',
                    errorCode: 'REQUIRED_FIELDS'
                })
            }

            const isCurrentPasswordValid = await userRepository.comparePasswords(
                updates.currentPassword,
                user.password
            )

            if (!isCurrentPasswordValid) {
                return res.status(400).json({
                    message: 'Current password is incorrect',
                    errorCode: 'INVALID_PASSWORD'
                })
            }

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
            if (!passwordRegex.test(updates.newPassword)) {
                return res.status(400).json({
                    message: 'Password must contain at least 8 characters, one uppercase letter, one number and one special character',
                    errorCode: 'INVALID_PASSWORD'
                })
            }

            updates.password = await bcrypt.hash(updates.newPassword, 10)
            delete updates.currentPassword
            delete updates.newPassword
        }

        const allowedUpdates = ['username', 'email', 'avatar', 'password']
        const updatesToApply = {}

        allowedUpdates.forEach(field => {
            if (updates[field] !== undefined) {
                updatesToApply[field] = updates[field]
            }
        })

        const updatedUser = await userService.updateUser(parseInt(id), updatesToApply)

        const { password, ...userWithoutPassword } = updatedUser
        res.json(userWithoutPassword)
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({
            message: 'Internal server error',
            errorCode: 'INTERNAL_ERROR'
        })
    }
}

export const addFavorite = async (req, res, next) => {
    try {
        const { userId, gameId } = req.body

        if (!userId || !gameId) {
            return res.status(400).json({
                success: false,
                message: 'userId and gameId are required'
            })
        }

        if (req.user.id !== parseInt(userId)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to modify favorites'
            })
        }

        const updatedUser = await userService.addUserFavorite(parseInt(userId), parseInt(gameId))

        res.json({
            success: true,
            favorites: updatedUser.favorites
        })
    } catch (error) {
        next(error)
    }
}

export const removeFavorite = async (req, res, next) => {
    try {
        const { userId, gameId } = req.body

        if (!userId || !gameId) {
            return res.status(400).json({
                success: false,
                message: 'userId and gameId are required'
            })
        }

        if (req.user.id !== parseInt(userId)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to modify favorites'
            })
        }

        const updatedUser = await userService.removeUserFavorite(parseInt(userId), parseInt(gameId))

        res.json({
            success: true,
            favorites: updatedUser.favorites
        })
    } catch (error) {
        next(error)
    }
}

export const getUserFavorites = async (req, res, next) => {
    try {
        const user = await userRepository.findUserById(parseInt(req.params.id))
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(user.favorites || []);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const currentUser = req.user

        if (!currentUser) {
            return res.status(401).json({ message: 'Authentication required' })
        }

        if (parseInt(id) !== currentUser.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this profile' })
        }

        userService.deleteUser(parseInt(id))

        res.clearCookie('token')
        res.status(204).end()
    } catch (error) {
        console.error('Error deleting user:', error)

        let status = 500
        let message = 'Internal server error'

        if (error.message === 'User not found') {
            status = 404
            message = error.message
        }

        res.status(status).json({ message })
    }
}
