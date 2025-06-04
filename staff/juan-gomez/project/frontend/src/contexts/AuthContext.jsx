import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser, logoutUser } from '../logic/auth/index'
import { findUserById } from '../logic/user/repositories/userRepository'
import { getAllGames, saveAllGames } from '../logic/games/repositories/gameRepository'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const isAuthenticated = () => {
        const storedUser = localStorage.getItem('retroUser') || sessionStorage.getItem('retroUser')
        return !!storedUser
    }

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = localStorage.getItem('retroUser') || sessionStorage.getItem('retroUser')

            if (storedUser) {
                try {
                    const { id } = JSON.parse(storedUser)
                    const fullUserData = await findUserById(id)
                    if (fullUserData) {
                        setUser(fullUserData)
                    } else {
                        logoutUser()
                    }
                } catch (error) {
                    console.error('Error loading user:', error)
                    logoutUser()
                }
            }
            setLoading(false)
        }
        loadUser()
    }, [])

    const register = async (userData) => {
        try {
            const newUser = await registerUser(userData)
            setUser(newUser)
            sessionStorage.setItem('retroUser', JSON.stringify({ id: newUser.id }))
            navigate('/home')
        } catch (error) {
            throw error
        }
    }

    const login = async (credentials, rememberMe) => {
        try {
            const loggedInUser = await loginUser(credentials, rememberMe)
            setUser(loggedInUser)
            const storage = rememberMe ? localStorage : sessionStorage
            storage.setItem('retroUser', JSON.stringify({ id: loggedInUser.id }))
            navigate('/home')
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        logoutUser()
        setUser(null)
        navigate('/login')
    }

    const updateUser = (updatedUserData) => {
        setUser(prev => {
            const updatedUser = { ...prev, ...updatedUserData }

            // Actualizar highscores con el nuevo nombre
            const games = getAllGames()
            const updatedGames = games.map(game => {
                if (game.highscores?.some(hs => hs.userId === updatedUser.id)) {
                    return {
                        ...game,
                        highscores: game.highscores.map(hs =>
                            hs.userId === updatedUser.id
                                ? { ...hs, username: updatedUser.username, avatar: updatedUser.avatar }
                                : hs
                        )
                    }
                }
                return game
            })

            saveAllGames(updatedGames)

            return updatedUser
        })
    }

    const value = {
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
        updateUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}