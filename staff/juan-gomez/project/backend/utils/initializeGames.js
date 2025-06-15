import Game from '../models/Game.js'

const initialGames = [
    {
        id: 1,
        name: 'Snake',
        description: 'Classic Nokia Snake game',
        image: '/images/Snake.jpg',
        likes: [],
        dislikes: [],
        highscores: [],
        messages: []
    },
    {
        id: 2,
        name: 'Tetris',
        description: 'From Russia with love',
        image: '/images/Tetris.jpg',
        likes: [],
        dislikes: [],
        highscores: [],
        messages: []
    }
]

export async function initializeGames() {
    try {
        const count = await Game.countDocuments()
        if (count === 0) {
            await Game.insertMany(initialGames)
            console.log('✅ Juegos iniciales insertados')
        }
    } catch (error) {
        console.error('❌ Error inicializando juegos:', error)
    }
}