import api from '../api/axiosConfig'

export const fetchUserProfile = async () => {
    try {
        const response = await api.get('/auth/me')
        return response.data
    } catch (error) {
        console.error('Error loading user data:', error)
        throw error
    }
}

export const updateUserProfile = async (userId, updates) => {
    try {
        const response = await api.put(`/users/${userId}`, updates)
        return response.data
    } catch (error) {
        console.error('Error updating profile:', error)
        throw error
    }
}

export const updateUserAvatar = async (userId, avatarData) => {
    try {
        const response = await api.put(`/users/${userId}`, { avatar: avatarData })
        return response.data
    } catch (error) {
        console.error('Error updating avatar:', error)
        throw error
    }
}

export const deleteUserAccount = async (userId) => {
    try {
        await api.delete(`/users/${userId}`)
    } catch (error) {
        console.error('Error deleting account:', error)
        throw error
    }
}