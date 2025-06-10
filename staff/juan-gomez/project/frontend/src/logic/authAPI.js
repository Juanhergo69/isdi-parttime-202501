import api from '../api/axiosConfig'

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData)
        return response.data
    } catch (error) {
        let errorMessage = 'Registration failed'

        if (error.response) {
            switch (error.response.data.message) {
                case 'Email already registered':
                    errorMessage = 'This email is already registered'
                    break
                case 'Username already taken':
                    errorMessage = 'This username is already taken'
                    break
                case 'Passwords do not match':
                    errorMessage = 'The passwords do not match'
                    break
                case 'Password must contain at least one uppercase letter, one number, and one special character':
                    errorMessage = 'Password must contain: 1 uppercase, 1 number, 1 special character'
                    break
                default:
                    errorMessage = error.response.data.message || 'Registration failed'
            }
        }

        throw new Error(errorMessage)
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/login', credentials)
        return response.data
    } catch (error) {
        let errorMessage = 'Login failed'

        if (error.response) {
            switch (error.response.data.message) {
                case 'Account not found':
                    errorMessage = 'No account found with this email'
                    break
                case 'Incorrect password':
                    errorMessage = 'The password is incorrect'
                    break
                default:
                    errorMessage = error.response.data.message || 'Login failed'
            }
        }

        throw new Error(errorMessage)
    }
}

export const fetchCurrentUser = async () => {
    try {
        const response = await api.get('/me')
        return response.data
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('Unauthorized')
        }
        throw error
    }
}