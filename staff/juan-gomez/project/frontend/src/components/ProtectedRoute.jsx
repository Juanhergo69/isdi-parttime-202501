import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ children }) {
    const { user, loading, isAuthenticated } = useAuth()

    if (loading) {
        return <div className="loading-spinner">Cargando...</div>
    }

    if (!isAuthenticated() || !user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute