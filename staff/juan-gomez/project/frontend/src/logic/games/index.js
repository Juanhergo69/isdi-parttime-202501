import { likeGame, dislikeGame } from './services/interactionService'
import { submitScore } from './services/scoreService'
import { getAllGames } from './repositories/gameRepository'

export {
    getAllGames,
    likeGame,
    dislikeGame,
    submitScore as updateHighscore
}