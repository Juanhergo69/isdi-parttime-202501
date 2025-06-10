import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storagePath = path.join(__dirname, '../storage')

export const readFile = (filename) => {
    try {
        const filePath = path.join(storagePath, filename);

        if (!fs.existsSync(filePath)) {
            if (filename === 'users.json') return []
            if (filename === 'games.json') return []
            return {}
        }

        const fileContent = fs.readFileSync(filePath, 'utf8')

        if (!fileContent.trim()) {
            if (filename === 'users.json') return []
            if (filename === 'games.json') return []
            return {}
        }

        return JSON.parse(fileContent)
    } catch (error) {
        console.error(`Error reading file ${filename}:`, error)
        if (filename === 'users.json') return []
        if (filename === 'games.json') return []
        return {}
    }
}

export const writeFile = (filename, data) => {
    try {
        if (!fs.existsSync(storagePath)) {
            fs.mkdirSync(storagePath, { recursive: true })
        }

        const filePath = path.join(storagePath, filename)
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
        return true
    } catch (error) {
        console.error(`Error saving file ${filename}:`, error)
        throw error
    }
}

export const initializeStorage = () => {
    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath, { recursive: true })
    }

    const gamesFilePath = path.join(storagePath, 'games.json')
    if (!fs.existsSync(gamesFilePath) || fs.readFileSync(gamesFilePath, 'utf8').trim() === '') {
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
        writeFile('games.json', initialGames)
    }
}
