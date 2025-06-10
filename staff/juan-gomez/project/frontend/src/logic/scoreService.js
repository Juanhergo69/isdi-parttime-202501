import api from '../api/axiosConfig';

export const submitScore = async (userId, gameId, score, userData = {}) => {
    try {
        const response = await api.post(`/games/${gameId}/scores`, {
            userId: parseInt(userId),
            score: parseInt(score),
            username: userData.username || 'Anonymous',
            avatar: userData.avatar || null
        })
        return response.data
    } catch (error) {
        console.error('Score submission failed:', error.response?.data || error.message)
        throw error
    }
}

export const getHighScore = async (gameId, userId) => {
    try {
        const response = await api.get(`/games/${gameId}/scores/${userId}`)
        return response.data.highScore || 0;
    } catch (error) {
        console.error('Error fetching high score:', error.response?.data || error.message)
        return 0
    }
}
