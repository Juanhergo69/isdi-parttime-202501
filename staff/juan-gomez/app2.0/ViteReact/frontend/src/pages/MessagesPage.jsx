//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa función useState para crear estados//
import { useState, useEffect } from 'react'
//Importa el componente Link de react-router-dom para navegación entre páginas//
import { Link } from 'react-router-dom'
//Importa getUsers//
import { getUsers } from '../logic/getUsers.js'
//Importa getLoggedUserId//
import { getLoggedUserId } from '../logic/getLoggedUserId.js' 
//Importa getMessages//
import { getMessages } from '../logic/getMessages.js'
//Importa deleteMessage//
import { deleteMessage } from '../logic/deleteMessage.js'
//Importa createModal//
import { createModal } from '../utils/createModal.js' 
//Importa los estilos CSS para este componente//
import '../styles/pages/messagesPage.css'

//Define el componente funcional MessagesPage que recibe props de navegación//
const MessagesPage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú desplegable del usuario//
    const [showMenu, setShowMenu] = useState(false)

    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Obtiene la lista completa de usuarios registrados//
    const users = getUsers()

    //Busca y obtiene los datos del usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Estado para almacenar y actualizar la lista de mensajes//
    const [messages, setMessages] = useState(getMessages())

    //Filtra los mensajes para obtener solo los del usuario logueado//
    const userMessages = messages.filter(message => message.userId === loggedUserId)

    //Función para manejar la eliminación de un mensaje//
    const handleDelete = (messageId) => {
        //Muestra un cuadro de confirmación antes de eliminar//
        if (window.confirm('Are you sure you want to delete this message?')) {
            //Elimina el mensaje llamando a la función deleteMessage//
            deleteMessage(messageId)
            //Actualiza el estado con los mensajes actualizados//
            setMessages(getMessages())
            //Muestra un modal de confirmación//
            createModal('Message deleted successfully!')
        }
    }

    //Redirige a login si no hay usuario logueado//
    if (!loggedUserId) {
        navigation.navigateToLogin()
        return null //No renderiza nada mientras redirige//
    }

    //Efecto secundario para cerrar el menú al hacer clic fuera de él//
    useEffect(() => {
        //Función que maneja el clic fuera del menú//
        const handleClickOutside = (e) => {
            //Verifica si el clic fue fuera del menú y sus botones//
            if (showMenu && !e.target.closest('.messagesMenuButton') && !e.target.closest('.messagesMenuDropContainer')) {
                setShowMenu(false) //Cierra el menú//
            }
        }

        //Agrega el event listener al documento//
        document.addEventListener('click', handleClickOutside)

        //Función de limpieza que remueve el event listener al desmontar el componente//
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showMenu]) //Dependencia: solo se ejecuta cuando showMenu cambia//

    //Maneja el cierre de sesión del usuario//
    const handleLogout = () => {
        sessionStorage.removeItem('id') //Elimina el ID de sessionStorage//
        localStorage.removeItem('id') //Elimina el ID de localStorage//
        navigation.navigateToLogin() //Redirige a la página de login//
    }

    //Renderiza el componente//
    return (
        //Contenedor principal de la página//
        <div className="messagesPageContainer">
            {/* Encabezado de la página */}
            <div className="messagesHeaderContainer">
                {/* Contenedor del logo */}
                <div className="messagesImgContainer">
                    {/* Enlace a la página de inicio */}
                    {/* Imagen del logo con clases para estilos y texto alternativo */}
                    <img
                        src="/Logo.jpg"       //Ruta de la imagen del logo//
                        className="messagesImg" //Clase CSS para la imagen//
                        alt="Logo"            //Texto alternativo para accesibilidad//
                    />
                </div>
                {/* Título de la página */}
                <h1 className="messagesMsg">My Messages</h1>
                {/* Botón y menú desplegable del usuario */}
                <button
                    className={`messagesMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
                    onClick={() => setShowMenu(!showMenu)}
                    aria-expanded={showMenu}
                    aria-label="User menu"
                >
                    <div className="messagesMenuButton-content">
                        {/* Muestra avatar o inicial del usuario */}
                        {loggedUser?.avatar ? (
                            <img
                                src={loggedUser.avatar}
                                className="messagesMenuButton-avatar"
                                alt="User avatar"
                            />
                        ) : (
                            <span className="messagesMenuButton-initial">
                                {(loggedUser && loggedUser.userName && loggedUser.userName[0].toUpperCase()) || 'U'}
                            </span>
                        )}
                    </div>
                </button>

                {/* Menú desplegable cuando está visible */}
                {showMenu && (
                    <div className="messagesMenuDropContainer">
                        {/* Botón para ir a home - ahora con Link */}
                        <Link
                            to="/home"
                            className="messagesHomeButton"
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
                            className="messagesProfileButton"
                            onClick={() => {
                                navigation.navigateToProfile()
                                setShowMenu(false);
                            }}
                        >
                            <i className="fas fa-user"></i> Profile
                        </Link>

                        {/* Botón para ir a favoritos - ahora con Link */}
                        <Link
                            to="/favorites"
                            className="messagesFavoritesButton"
                            onClick={() => {
                                navigation.navigateToFavorites()
                                setShowMenu(false)
                            }}
                        >
                            <i className="fas fa-star"></i> My Fav
                        </Link>

                        {/* Botón para cerrar sesión */}
                        <button className="messagesLogoutButton" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Contenedor principal del contenido */}
            <div className="messagesFormContainer">
                {/* Formulario principal */}
                <div className="messagesForm">
                    {/* Sección de información del usuario */}
                    <div className="messages-user-info-section">
                        {/* Contenedor del avatar */}
                        <div className="user-avatar">
                            {/* Renderizado condicional del avatar */}
                            {loggedUser?.avatar ? (
                                //Si tiene avatar, muestra la imagen//
                                <img
                                    src={loggedUser.avatar}
                                    alt={`${loggedUser.userName}'s avatar`}
                                    className="messages-avatar"
                                />
                            ) : (
                                //Si no tiene avatar, muestra la inicial//
                                <div className="messages-avatar-initial">
                                    {loggedUser?.userName?.[0]?.toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>
                        {/* Nombre de usuario */}
                        <h2 className="messages-username">{loggedUser?.userName || 'User'}</h2>
                    </div>

                    {/* Contenedor de mensajes */}
                    <div className="messagesMsgContainer">
                        {/* Renderizado condicional si hay mensajes */}
                        {userMessages.length > 0 ? (
                            //Mapea todos los mensajes del usuario//
                            userMessages.map((message) => {
                                //Cuenta los likes (si existen) o devuelve 0//
                                const likesCount = (message.likes && message.likes.length) || 0
                                //Cuenta los dislikes (si existen) o devuelve 0//
                                const dislikesCount = (message.dislikes && message.dislikes.length) || 0

                                //Obtiene nombres de usuarios que dieron like//
                                const likedUsers = message.likes
                                    ? message.likes.map(likeUserId => {
                                        //Busca cada usuario que dio like//
                                        const user = users.find(u => u.id === likeUserId)
                                        //Devuelve el nombre de usuario o 'Unknown' si no se encuentra//
                                        return user ? user.userName : 'Unknown'
                                    })
                                    : [] //Array vacío si no hay likes//

                                //Obtiene nombres de usuarios que dieron dislike//
                                const dislikedUsers = message.dislikes
                                    ? message.dislikes.map(dislikeUserId => {
                                        //Busca cada usuario que dio dislike//
                                        const user = users.find(u => u.id === dislikeUserId)
                                        //Devuelve el nombre de usuario o 'Unknown' si no se encuentra//
                                        return user ? user.userName : 'Unknown'
                                    })
                                    : [] //Array vacío si no hay dislikes//

                                //Renderiza cada mensaje//
                                return (
                                    <div key={message.date} className="message">
                                        {/* Título del mensaje */}
                                        <div className="message-title">Title: {message.title}</div>
                                        {/* Contenido del mensaje */}
                                        <div className="message-text">Message: {message.msg}</div>

                                        {/* Renderizado condicional de imagen adjunta */}
                                        {message.image && (
                                            <div className="message-image-container">
                                                <img
                                                    src={message.image}
                                                    alt="User uploaded content"
                                                    className="message-image"
                                                />
                                            </div>
                                        )}

                                        {/* Fecha del mensaje */}
                                        <div className="message-date">Date: {message.date}</div>

                                        {/* Contenedor de estadísticas (likes/dislikes) */}
                                        <div className="message-stats">
                                            {/* Contenedor de likes */}
                                            <div className="messages-like-container">
                                                {/* Contador de likes */}
                                                <div className="messages-like-stats">
                                                    {/* Icono de like */}
                                                    <i className="fas fa-thumbs-up"></i>
                                                    {/* Número de likes */}
                                                    <span className="message-likes">({likesCount})</span>
                                                </div>
                                                {/* Tooltip de usuarios que dieron like */}
                                                {likedUsers.length > 0 && (
                                                    <div className="messages-users-tooltip likes-tooltip">
                                                        {/* Muestra los primeros 3 nombres */}
                                                        {likedUsers.slice(0, 3).join(', ')}
                                                        {/* Si hay más de 3, muestra "and X more" */}
                                                        {likedUsers.length > 3 && (
                                                            <span className="messages-users-count">
                                                                {` and ${likedUsers.length - 3} more`}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Contenedor de dislikes */}
                                            <div className="messages-dislike-container">
                                                {/* Contador de dislikes */}
                                                <div className="messages-dislike-stats">
                                                    {/* Icono de dislike */}
                                                    <i className="fas fa-thumbs-down"></i>
                                                    {/* Número de dislikes */}
                                                    <span className="message-dislikes">({dislikesCount})</span>
                                                </div>
                                                {/* Tooltip de usuarios que dieron dislike */}
                                                {dislikedUsers.length > 0 && (
                                                    <div className="messages-users-tooltip dislikes-tooltip">
                                                        {/* Muestra los primeros 3 nombres */}
                                                        {dislikedUsers.slice(0, 3).join(', ')}
                                                        {/* Si hay más de 3, muestra "and X more" */}
                                                        {dislikedUsers.length > 3 && (
                                                            <span className="messages-users-count">
                                                                {` and ${dislikedUsers.length - 3} more`}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Botón para eliminar mensaje */}
                                        <button
                                            className="messages-delete-message-button"
                                            onClick={() => handleDelete(message.date)}
                                        >
                                            {/* Icono de basura */}
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </div>
                                )
                            })
                        ) : (
                            //Mensaje cuando no hay mensajes//
                            <div className="no-messages">You haven't posted any messages yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

//Exporta el componente como exportación por defecto//
export default MessagesPage