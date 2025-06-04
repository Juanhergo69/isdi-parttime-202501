import * as userRepo from '../repositories/userRepository'
import * as gameInteractionRepo from '../repositories/gameInteractionRepository'
import * as validators from '../validators/userValidators'

export const updateUserProfile = (userId, updates) => {
    const users = userRepo.getAllUsers()
    const currentUser = userRepo.findUserById(userId)

    if (!currentUser) throw new Error('User not found')

    if (updates.username) {
        validators.validateUsername(updates.username, users, userId)
    }

    if (updates.email) {
        validators.validateEmail(updates.email, users, userId)
    }

    if (updates.password) {
        validators.validatePassword(updates.password)
    }

    const updatedUser = userRepo.updateUser(userId, updates)
    storeOnlyUserId(userId)

    if (updates.username || updates.avatar) {
        const messageUpdates = {}
        if (updates.username) messageUpdates.username = updates.username
        if (updates.avatar !== null) messageUpdates.avatar = updates.avatar

        gameInteractionRepo.updateUserMessages(userId, messageUpdates)
    }

    return updatedUser
}

export const updateUserAvatar = (userId, avatarData) => {
    return updateUserProfile(userId, { avatar: avatarData })
}

export const removeUserAvatar = (userId) => {
    const updatedUser = userRepo.updateUser(userId, { avatar: null })
    storeOnlyUserId(userId)

    gameInteractionRepo.updateUserMessages(userId, { avatar: null })

    return updatedUser
}

export const deleteUserAccount = (userId) => {
    userRepo.deleteUser(userId)

    gameInteractionRepo.cleanUserGameInteractions(userId)

    sessionStorage.removeItem('retroUser')
    localStorage.removeItem('retroUser')
}

export const storeOnlyUserId = (userId) => {
    const currentSessionUser = JSON.parse(sessionStorage.getItem('retroUser'))
    const currentLocalUser = JSON.parse(localStorage.getItem('retroUser'))

    if (currentSessionUser && currentSessionUser.id === userId) {
        sessionStorage.setItem('retroUser', JSON.stringify({ id: userId }))
    }

    if (currentLocalUser && currentLocalUser.id === userId) {
        localStorage.setItem('retroUser', JSON.stringify({ id: userId }))
    }
}