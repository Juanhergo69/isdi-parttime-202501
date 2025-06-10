import { initializeStorage } from './utils/fileStorage.js'
//import connectDB from './config/db.js'

initializeStorage()

import app from './app.js'
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})