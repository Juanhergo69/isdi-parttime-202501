import api from '../api/axiosConfig'

export const dislikeGame = async (gameId, userId) => {
    try {
        const response = await api.post(`/games/${gameId}/dislike`, { userId })
        return response.data
    } catch (error) {
        console.error('Error disliking game:', error)
        throw error
    }
}