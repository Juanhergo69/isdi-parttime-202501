import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
    getUserFavorites,
    addUserFavorite,
    removeUserFavorite
} from '../logic/user/repositories/userRepository'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
    const { user } = useAuth()
    const [favoriteGames, setFavoriteGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const refreshFavorites = async () => {
        if (user) {
            try {
                const favorites = await getUserFavorites(user.id)
                setFavoriteGames(favorites || [])
            } catch (error) {
                console.error("Error loading favorites:", error)
                setFavoriteGames([])
            }
        } else {
            setFavoriteGames([])
        }
    }

    const addFavorite = async (gameId) => {
        if (!user) return false

        try {
            await addUserFavorite(user.id, gameId)
            await refreshFavorites()
            return true
        } catch (error) {
            console.error("Error adding favorite:", error)
            return false
        }
    }

    const removeFavorite = async (gameId) => {
        if (!user) return false

        try {
            await removeUserFavorite(user.id, gameId)
            await refreshFavorites()
            return true
        } catch (error) {
            console.error("Error removing favorite:", error)
            return false
        }
    }

    const toggleFavorite = async (gameId) => {
        if (isFavorite(gameId)) {
            return await removeFavorite(gameId)
        } else {
            return await addFavorite(gameId)
        }
    }

    const isFavorite = (gameId) => {
        return favoriteGames.includes(gameId)
    }

    useEffect(() => {
        refreshFavorites()
        setIsLoading(false)
    }, [user])

    return (
        <FavoritesContext.Provider value={{
            favoriteGames,
            refreshFavorites,
            addFavorite,
            removeFavorite,
            toggleFavorite,
            isFavorite,
            isLoading
        }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}