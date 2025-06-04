import { updateHighscore } from '../repositories/scoreRepository'
import { validateScore } from '../validators/gameValidators'

export const submitScore = async (userId, gameId, score, userData = {}) => {
    try {
        validateScore(score)
        return await updateHighscore(userId, gameId, score, userData)
    } catch (error) {
        console.error('Score submission failed:', error)
        throw error
    }
}

