//Importa la biblioteca React para crear componentes//
import React from 'react'

//Importa el componente Link de react-router-dom para la navegación entre páginas//
import { Link } from 'react-router-dom'

//Importa los estilos CSS asociados al componente//
import '../index.css'

//Define el componente funcional NotFoundPage que recibe el objeto navigation como prop//
const NotFoundPage = ({ navigation }) => {
    //Función para verificar si el usuario está logueado//
    const isLoggedIn = () => {
        //Verifica si existe un ID en sessionStorage o localStorage//
        //!! convierte el resultado a booleano (true si existe, false si no)//
        return !!(sessionStorage.getItem('id') || localStorage.getItem('id'))
    }

    //Retorna el JSX que representa el componente//
    return (
        //Contenedor principal de NotFoundPage//
        <div className="not-found-page">
            {/* Contenedor del contenido principal */}
            <div className="not-found-content">
                {/* Contenedor de la imagen/icono de error */}
                <div className="not-found-image">
                    {/* SVG que muestra un icono de error (círculo con signo de exclamación) */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {/* Círculo del icono */}
                        <circle cx="12" cy="12" r="10"></circle>
                        {/* Línea vertical superior (parte del signo de exclamación) */}
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        {/* Línea vertical inferior (punto del signo de exclamación) */}
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>

                {/* Título de NotFoundPage */}
                <h1 className="not-found-title">404-Page not found</h1>
                {/* Mensaje descriptivo del error */}
                <p className="not-found-message">
                    Oops! It seems the page doesn't exist.
                </p>

                {/* Contenedor de los botones de acción */}
                <div className="not-found-actions">
                    {/* Renderizado condicional del botón según el estado de autenticación */}
                    {isLoggedIn() ? ( //Si el usuario está logueado//
                        //Muestra botón que redirige a HomePage//
                        <Link
                            to="/home" //Ruta de destino//
                            className="not-found-button" //Clase CSS//
                            onClick={navigation.navigateToHome} //Función de navegación//
                        >
                            {/* Icono de Font Awesome */}
                            <i className="fas fa-home"></i> Go to Home
                        </Link>
                    ) : ( //Si el usuario NO está logueado//
                        //Muestra botón que redirige a LoginPage//
                        <Link
                            to="/login" //Ruta de destino//
                            className="not-found-button" //Clase CSS//
                            onClick={navigation.navigateToLogin} //Función de navegación//
                        >
                            {/* Icono de Font Awesome */}
                            <i className="fas fa-sign-in-alt"></i> Go to Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

//Exporta el componente como exportación por defecto//
export default NotFoundPage