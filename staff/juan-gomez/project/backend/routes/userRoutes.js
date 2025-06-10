import express from 'express'
const router = express.Router()
import * as userController from '../handlers/userHandler.js'
import { authenticate } from '../middleware/auth.js'

router.get('/:id', authenticate, userController.getUserById)
router.put('/:id', authenticate, userController.updateUser)
router.delete('/:id', authenticate, userController.deleteUser)
router.post('/favorites/add', authenticate, userController.addFavorite)
router.post('/favorites/remove', authenticate, userController.removeFavorite)
router.get('/:id/favorites', authenticate, userController.getUserFavorites)

export default router

