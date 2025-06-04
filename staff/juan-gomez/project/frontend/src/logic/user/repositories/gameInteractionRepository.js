export const cleanUserGameInteractions = (userId) => {
    const games = JSON.parse(sessionStorage.getItem('retroGames') || '[]')

    const updatedGames = games.map(game => ({
        ...game,
        likes: game.likes?.filter(id => id !== userId) || [],
        dislikes: game.dislikes?.filter(id => id !== userId) || [],
        highscores: game.highscores?.filter(score => score.userId !== userId) || [],
        messages: game.messages?.filter(msg => msg.userId !== userId) || [],
        favorites: game.favorites?.filter(id => id !== userId) || []
    }))

    sessionStorage.setItem('retroGames', JSON.stringify(updatedGames))
}

export const updateUserMessages = (userId, updates) => {
    const games = JSON.parse(sessionStorage.getItem('retroGames') || '[]')

    const updatedGames = games.map(game => ({
        ...game,
        messages: game.messages?.map(msg => {
            if (msg.userId === userId) {
                const updatedMsg = { ...msg }
                if ('username' in updates) updatedMsg.username = updates.username
                if ('avatar' in updates) {
                    updatedMsg.avatar = updates.avatar ?? undefined
                }
                return updatedMsg
            }
            return msg
        }) || []
    }))

    sessionStorage.setItem('retroGames', JSON.stringify(updatedGames))
    window.dispatchEvent(new Event('retroGamesUpdated'))
}