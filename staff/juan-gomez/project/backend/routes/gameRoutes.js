import express from 'express'
const router = express.Router()
import * as gameController from '../handlers/gameHandler.js'

router.get('/', gameController.getAllGames)
router.get('/:id', gameController.getGameById)
router.post('/:id/like', gameController.likeGame)
router.post('/:id/dislike', gameController.dislikeGame)
router.post('/:id/messages', gameController.addMessage)
router.delete('/:gameId/messages', gameController.deleteMessage)
router.post('/:id/scores', gameController.submitScore)
router.get('/:id/scores/:userId', gameController.getUserHighScore)

export default router