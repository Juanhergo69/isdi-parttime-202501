import * as userService from '../services/userService.js'

export const getUserById = async (req, res, next) => {
    try {
        const user = userService.findUserById(parseInt(req.params.id))
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
            return res.status(401).json({ message: 'Authentication required' })
        }

        if (parseInt(id) !== currentUser.id) {
            return res.status(403).json({ message: 'Unauthorized to update this profile' })
        }

        const user = await userService.findUserById(parseInt(id))
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        if (updates.username && updates.username !== user.username) {
            const existingUser = await userService.findUserByUsername(updates.username)
            if (existingUser) {
                return res.status(400).json({ message: 'Username already taken' })
            }
        }

        if (updates.email && updates.email !== user.email) {
            const existingUser = await userService.findUserByEmail(updates.email)
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' })
            }
        }

        if (updates.newPassword) {
            if (!updates.currentPassword) {
                return res.status(400).json({ message: 'Current password is required' });
            }

            if (updates.currentPassword !== user.password) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
            if (!passwordRegex.test(updates.newPassword)) {
                return res.status(400).json({
                    message: 'Password must contain at least 8 characters, one uppercase letter, one number and one special character'
                })
            }

            updates.password = updates.newPassword
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
        res.status(500).json({ message: 'Internal server error' })
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
        const user = await userService.findUserById(parseInt(req.params.id))
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
