//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'
//Importa el componente Link de react-router-dom para navegación//
import { Link } from 'react-router-dom'
//Importa funciones utilitarias específicas desde el archivo utils//
import {
    getUsers,          //Obtiene lista de usuarios//
    getMessages,       //Obtiene todos los mensajes//
    getLoggedUserId    //Obtiene ID del usuario logueado//
} from '../utils/utils'
//Importa funciones para manejar likes/dislikes y favoritos//
import { toggleLike, toggleDislike, toggleFavorite } from '../utils/data.js'
//Importa estilos CSS//
import '../styles/pages/favoritesPage.css'


//Define el componente funcional FavoritesPage que recibe props de navegación//
const FavoritesPage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú desplegable del usuario//
    const [showMenu, setShowMenu] = useState(false)

    //Obtiene la lista completa de usuarios registrados//
    const users = getUsers()

    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Busca el usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Estado para almacenar y actualizar la lista de mensajes//
    const [messages, setMessages] = useState(getMessages())

    //Filtra los mensajes para obtener solo los favoritos del usuario logueado//
    const favoriteMessages = messages.filter(message =>
        message.favorite && message.favorite.includes(loggedUserId)
    )

    //Maneja el evento de like en un mensaje//
    const handleLike = (messageId) => {
        toggleLike(messageId, loggedUserId) //Llama a la función para alternar el like//
        setMessages(getMessages()) //Actualiza la lista de mensajes//
    }

    //Maneja el evento de dislike en un mensaje//
    const handleDislike = (messageId) => {
        toggleDislike(messageId, loggedUserId) //Llama a la función para alternar el dislike//
        setMessages(getMessages()) //Actualiza la lista de mensajes//
    }

    //Maneja el evento de favorito en un mensaje//
    const handleFavorite = (messageId) => {
        toggleFavorite(messageId, loggedUserId) //Llama a la funcion para alternar el favorito//
        setMessages(getMessages()) //Actualiza la lista de mensajes//
    }

    //Maneja el cierre de sesión del usuario//
    const handleLogout = () => {
        sessionStorage.removeItem('id') //Elimina el ID de sessionStorage//
        localStorage.removeItem('id') //Elimina el ID de localStorage//
        navigation.navigateToLogin() //Redirige a la página de login//
    }

    //Efecto para redirigir a login si no hay usuario loguead//
    useEffect(() => {
        if (!loggedUser) {
            navigation.navigateToLogin()
        }
    }, [loggedUser, navigation])


    //Efecto secundario para cerrar el menú al hacer clic fuera de él//
    useEffect(() => {
        //Función que maneja el clic fuera del menú//
        const handleClickOutside = (e) => {
            //Verifica si el clic fue fuera del menú y sus botones//
            if (showMenu && !e.target.closest('.favoriteMenuButton') && !e.target.closest('.favoriteMenuDropContainer')) {
                setShowMenu(false) //Cierra el menú//
            }
        }

        //Agrega el event listener al documento//
        document.addEventListener('click', handleClickOutside)

        //Función de limpieza que remueve el event listener al desmontar el componente//
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showMenu]) //Dependencia: solo se ejecuta cuando showMenu cambia//


    if (!loggedUser) { //Si no hay usuario logueado, no se renderiza nada//
        return null
    }

    //Renderizado del componente//
    return (
        <div className="favoritePageContainer">
            {/* Encabezado de la página */}
            <div className="favoriteHeaderContainer">
                <div className="favoriteImgContainer">
                    {/* Imagen del logo con clases para estilos y texto alternativo */}
                    <img
                        src="/Logo.jpg"       //Ruta de la imagen del logo//
                        className="favoriteImg"    //Clase CSS para la imagen//
                        alt="Logo"            //Texto alternativo para accesibilidad//
                    />
                </div>
                {/* Título de la página */}
                <h1 className="favoriteMsg">Favorite Messages</h1>

                {/* Botón y menú desplegable del usuario */}
                <button
                    className={`favoriteMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
                    onClick={() => setShowMenu(!showMenu)}
                    aria-expanded={showMenu}
                    aria-label="User menu"
                >
                    <div className="favoriteMenuButton-content">
                        {/* Muestra avatar o inicial del usuario */}
                        {loggedUser?.avatar ? (
                            <img
                                src={loggedUser.avatar}
                                className="favoriteMenuButton-avatar"
                                alt="User avatar"
                            />
                        ) : (
                            <span className="favoriteMenuButton-initial">
                                {(loggedUser && loggedUser.userName && loggedUser.userName[0].toUpperCase()) || 'U'}
                            </span>
                        )}
                    </div>
                </button>

                {/* Menú desplegable cuando está visible */}
                {showMenu && (
                    <div className="favoriteMenuDropContainer">
                        {/* Botón para ir a home - ahora con Link */}
                        <Link
                            to="/home"
                            className="favoriteHomeButton"
                            onClick={() => {
                                navigation.navigateToHome();
                                setShowMenu(false);
                            }}
                        >
                            <i className="fas fa-house"></i> Home
                        </Link>

                        {/* Botón para ir a profile - ahora con Link */}
                        <Link
                            to="/profile"
                            className="favoriteProfileButton"
                            onClick={() => {
                                navigation.navigateToProfile()
                                setShowMenu(false);
                            }}
                        >
                            <i className="fas fa-user"></i> Profile
                        </Link>

                        {/* Botón para ir a messages - ahora con Link */}
                        <Link
                            to="/messages"
                            className="favoriteMessagesButton"
                            onClick={() => {
                                navigation.navigateToMessages()
                                setShowMenu(false)
                            }}
                        >
                            <i className="fas fa-envelope"></i> My Msg
                        </Link>

                        {/* Botón para cerrar sesión */}
                        <button className="favoriteLogoutButton" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Contenedor principal */}
            <div className="favoriteFormContainer">
                {/* Formulario estilo userMsgForm */}
                <div className="favoriteForm">
                    {/* Sección de información del usuario */}
                    <div className="favorite-user-info-section">
                        {/* Avatar o inicial del usuario */}
                        <div className="favorite-user-avatar">
                            {loggedUser.avatar ? (
                                <img
                                    src={loggedUser.avatar}
                                    alt={`${loggedUser.userName}'s avatar`}
                                    className="favorite-avatar"
                                />
                            ) : (
                                <div className="favorite-avatar-initial">
                                    {loggedUser.userName[0].toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Nombre del usuario */}
                        <h2 className="favorite-username">{loggedUser.userName}</h2>
                    </div>

                    {/* Lista de mensajes favoritos */}
                    <div className="favoriteMsgContainer">
                        {favoriteMessages.length > 0 ? (
                            favoriteMessages.map((message) => {
                                //Verifica si el usuario actual dio like/dislike a este mensaje//
                                const hasLiked = message.likes && message.likes.includes(loggedUserId)
                                const hasDisliked = message.dislikes && message.dislikes.includes(loggedUserId)

                                //Cuenta los likes/dislikes//
                                const likesCount = (message.likes && message.likes.length) || 0
                                const dislikesCount = (message.dislikes && message.dislikes.length) || 0

                                //Obtiene nombres de usuarios que dieron like//
                                const likedUsers = message.likes
                                    ? message.likes.map(likeUserId => {
                                        const user = users.find(u => u.id === likeUserId)
                                        return user ? user.userName : 'Unknown'
                                    })
                                    : []

                                //Obtiene nombres de usuarios que dieron dislike//
                                const dislikedUsers = message.dislikes
                                    ? message.dislikes.map(dislikeUserId => {
                                        const user = users.find(u => u.id === dislikeUserId)
                                        return user ? user.userName : 'Unknown'
                                    })
                                    : []

                                //Verifica si el usuario actual dio favorito a este mensaje//
                                const hasFavorited = message.favorite && message.favorite.includes(loggedUserId)

                                //Obtiene el autor del mensaje//
                                const messageAuthor = users.find(user => user.id === message.userId)

                                //Renderiza cada mensaje favorito//
                                return (
                                    <div key={message.date} className="favorite-message">
                                        {/* Muestra autor del mensaje con enlace a su bio */}
                                        {messageAuthor && (
                                            <div className="favorite-message-user">
                                                From: <span
                                                    className="favorite-user-name-link"
                                                    onClick={() => navigation.navigateToBio(messageAuthor.userName)}
                                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    {messageAuthor.userName}
                                                </span>
                                            </div>
                                        )}

                                        {/* Muestra título del mensaje */}
                                        <div className="favorite-message-title">Title: {message.title}</div>

                                        {/* Muestra contenido del mensaje */}
                                        <div className="favorite-message-text">Message: {message.msg}</div>

                                        {/* Muestra imagen adjunta si existe */}
                                        {message.image && (
                                            <div className="favorite-message-image-container">
                                                <img
                                                    src={message.image}
                                                    alt="User uploaded content"
                                                    className="favorite-message-image"
                                                />
                                            </div>
                                        )}

                                        {/* Muestra fecha del mensaje */}
                                        <div className="favorite-message-date">Date: {message.date}</div>

                                        {/* Contenedor de acciones (like/dislike/favorite) */}
                                        <div className="favorite-message-actions">
                                            {/* Contenedor y botón de like */}
                                            <div className="favorite-like-container">
                                                <button
                                                    className="favorite-like-button"
                                                    onClick={() => handleLike(message.date)}
                                                    aria-label="Like"
                                                >
                                                    {/* Icono de like (lleno o vacío según estado) */}
                                                    <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>

                                                    {/* Contador de likes */}
                                                    <span className="favorite-message-likes">({likesCount})</span>
                                                </button>

                                                {/* Tooltip con nombres de usuarios que dieron like */}
                                                {likedUsers.length > 0 && (
                                                    <div className="favorite-users-tooltip likes-tooltip">
                                                        {likedUsers.slice(0, 3).join(', ')}
                                                        {likedUsers.length > 3 && (
                                                            <span className="favorites-users-count">
                                                                {` and ${likedUsers.length - 3} more`}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Contenedor y botón de dislike */}
                                            <div className="favorite-dislike-container">
                                                <button
                                                    className="favorite-dislike-button"
                                                    onClick={() => handleDislike(message.date)}
                                                    aria-label="Dislike"
                                                >
                                                    {/* Icono de dislike (lleno o vacío según estado) */}
                                                    <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>

                                                    {/* Contador de dislikes */}
                                                    <span className="favorite-message-dislikes">({dislikesCount})</span>
                                                </button>

                                                {/* Tooltip con nombres de usuarios que dieron dislike */}
                                                {dislikedUsers.length > 0 && (
                                                    <div className="favorite-users-tooltip dislikes-tooltip">
                                                        {dislikedUsers.slice(0, 3).join(', ')}
                                                        {dislikedUsers.length > 3 && (
                                                            <span className="favorites-users-count">
                                                                {` and ${dislikedUsers.length - 3} more`}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            {/* Contenedor y botón de favorito */}
                                            <div className="favorite-favorite-container">
                                                <button
                                                    className="favorite-favorite-button"
                                                    onClick={() => handleFavorite(message.date)}
                                                    aria-label="Favorite"
                                                >
                                                    {/* Icono de favorito (lleno o vacío según estado) */}
                                                    <i className={hasFavorited ? "fas fa-heart" : "far fa-heart"}></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="favorite-no-messages">You haven't favorited any messages yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

//Exporta el componente como exportación por defecto//
export default FavoritesPage