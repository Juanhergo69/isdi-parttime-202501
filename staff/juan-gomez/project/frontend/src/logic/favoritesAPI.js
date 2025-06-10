import api from '../api/axiosConfig'

export const fetchUserFavorites = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}/favorites`)
        return Array.isArray(response.data) ? response.data : []
    } catch (error) {
        console.error("Error loading favorites:", error)
        throw error
    }
}

export const addUserFavorite = async (userId, gameId) => {
    try {
        const response = await api.post('/users/favorites/add', {
            userId,
            gameId
        })
        return response.data.favorites || []
    } catch (error) {
        console.error("Error adding favorite:", error)
        throw error
    }
}

export const removeUserFavorite = async (userId, gameId) => {
    try {
        const response = await api.post('/users/favorites/remove', {
            userId,
            gameId
        })
        return response.data.favorites || []
    } catch (error) {
        console.error("Error removing favorite:", error)
        throw error
    }
}