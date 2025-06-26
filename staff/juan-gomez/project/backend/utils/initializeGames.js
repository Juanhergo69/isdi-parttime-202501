import Game from '../models/Game.js'

const initialGames = [
    {
        id: 1,
        name: 'Snake',
        description: 'Slither. Eat. Grow. Repeat',
        image: '/images/Snake.jpg',
        likes: [],
        dislikes: [],
        highscores: [],
        messages: []
    },
    {
        id: 2,
        name: 'Tetris',
        description: 'Fit fast. Think faster',
        image: '/images/Tetris.jpg',
        likes: [],
        dislikes: [],
        highscores: [],
        messages: []
    },
    {
        id: 3,
        name: 'Pacman',
        description: 'Eat dots. Dodge ghosts',
        image: '/images/Pacman.jpg',
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