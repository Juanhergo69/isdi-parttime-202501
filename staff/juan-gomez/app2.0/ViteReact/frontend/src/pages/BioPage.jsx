//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'
//Importa el componente Link y useParams de react-router-dom para navegación//
import { Link, useParams } from 'react-router-dom'
//Importa getUsers//
import { getUsers } from '../logic/getUsers.js'
//Importa getMessages//
import { getMessages } from '../logic/getMessages.js'
//Importa getLoggedUserId//   
import { getLoggedUserId } from '../logic/getLoggedUserId.js'
//Importa handleLike//
import { handleLike } from '../logic/handleLike.js'
//Importa handleDislike//
import { handleDislike } from  '../logic/handleDislike.js'
//Importa handleFavorite//
import { handleFavorite } from '../logic/handleFavorite.js'
//Importa handleLogout//
import { handleLogout } from '../logic/handleLogout.js'
//Importa estilos CSS//
import '../styles/pages/bioPage.css'

//Define el componente funcional Bio que recibe props de navegación//
const BioPage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú desplegable del usuario//
    const [showMenu, setShowMenu] = useState(false)

    //Obtiene el parámetro userName de la URL//
    const { userName } = useParams()

    //Obtiene la lista completa de usuarios registrados//
    const users = getUsers()

    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Busca y obtiene los datos del usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Busca el usuario cuyo perfil se está viendo//
    const viewedUser = users.find(user => user.userName === userName)

    //Estado para almacenar y actualizar la lista de mensajes//
    const [messages, setMessages] = useState(getMessages())

    //Filtra los mensajes para obtener solo los del usuario visto//
    const userMessages = messages.filter(message => {
        const messageAuthor = users.find(user => user.id === message.userId)
        return messageAuthor && messageAuthor.userName === userName
    })

      //Maneja el like a un mensaje//
      const onLike = (messageId) => {
          //Llama al handler de like pasando el ID del mensaje y el ID del usuario logueado//
          //El handler devuelve la lista actualizada de mensajes//
          const updatedMessages = handleLike(messageId, loggedUserId)
          //Actualiza el estado de mensajes con la lista actualizada//
          setMessages(updatedMessages)
      }
      
      //Maneja el dislike a un mensaje//
      const onDislike = (messageId) => {
          //Llama al handler de dislike pasando el ID del mensaje y el ID del usuario logueado//
          //El handler devuelve la lista actualizada de mensajes//
          const updatedMessages = handleDislike(messageId, loggedUserId)
          //Actualiza el estado de mensajes con la lista actualizada//
          setMessages(updatedMessages)
      }
      
      //Maneja el favorito de un mensaje//
      const onFavorite = (messageId) => {
          //Llama al handler de favorito pasando el ID del mensaje y el ID del usuario logueado//
          //El handler devuelve la lista actualizada de mensajes//
          const updatedMessages = handleFavorite(messageId, loggedUserId)
          //Actualiza el estado de mensajes con la lista actualizada//
          setMessages(updatedMessages)
      }
   
      //Maneja el logout del usuario//
      const onLogout = () => {
          //Ejecuta el handler de logout que limpia los datos de sesión//
          handleLogout()
          //Navega a la página de login usando la función de navegación proporcionada//
          navigation.navigateToLogin()
      }

    if (!viewedUser) {
        //Usamos useEffect para redirigir después del renderizado inicial//
        useEffect(() => {
            navigation.navigateToNotFound()
        }, [navigation]) //Dependencia: navigation//

        return null //No renderiza nada mientras redirige//
    }

    //Efecto secundario para cerrar el menú al hacer clic fuera de él//
    useEffect(() => {
        //Función que maneja el clic fuera del menú//
        const handleClickOutside = (e) => {
            //Verifica si el clic fue fuera del menú y sus botones//
            if (showMenu && !e.target.closest('.bioMenuButton') && !e.target.closest('.bioMenuDropContainer')) {
                setShowMenu(false) //Cierra el menú//
            }
        }

        //Agrega el event listener al documento//
        document.addEventListener('click', handleClickOutside)

        //Función de limpieza que remueve el event listener al desmontar el componente//
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showMenu]) //Dependencia: solo se ejecuta cuando showMenu cambia//

    //Renderizado del componente//
    return (
        <div className="bioPageContainer">
            {/* Encabezado de la página */}
            <div className="bioHeaderContainer">
                <div className="bioImgContainer">
                    {/* Imagen del logo con clases para estilos y texto alternativo */}
                    <img
                        src="/Logo.jpg"       //Ruta de la imagen del logo//
                        className="bioImg  " //Clase CSS para la imagen//
                        alt="Logo"            //Texto alternativo para accesibilidad//
                    />
                </div>
                {/* Título de la página */}
                <h1 className="bioMsg">Bio</h1>

                {/* Botón y menú desplegable del usuario */}
                <button
                    className={`bioMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
                    onClick={() => setShowMenu(!showMenu)}
                    aria-expanded={showMenu}
                    aria-label="User menu"
                >
                    <div className="bioMenuButton-content">
                        {/* Muestra avatar o inicial del usuario */}
                        {loggedUser?.avatar ? (
                            <img
                                src={loggedUser.avatar}
                                className="bioMenuButton-avatar"
                                alt="User avatar"
                            />
                        ) : (
                            <span className="bioMenuButton-initial">
                                {(loggedUser && loggedUser.userName && loggedUser.userName[0].toUpperCase()) || 'U'}
                            </span>
                        )}
                    </div>
                </button>

                {/* Menú desplegable cuando está visible */}
                {showMenu && (
                    <div className="bioMenuDropContainer">
                        {/* Botón para ir a home- ahora con Link */}
                        <Link
                            to="/home"
                            className="bioHomeButton"
                            onClick={() => {
                                navigation.navigateToHome()
                                setShowMenu(false)
                            }}
                        >
                            <i className="fas fa-house"></i> Home
                        </Link>

                        {/* Botón para ir a profile - ahora con Link */}
                        <Link
                            to="/profile"
                            className="bioProfileButton"
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
                            className="bioMessagesButton"
                            onClick={() => {
                                navigation.navigateToMessages()
                                setShowMenu(false)
                            }}
                        >
                            <i className="fas fa-envelope"></i> My Msg
                        </Link>

                        {/* Botón para ir a favoritos - ahora con Link */}
                        <Link
                            to="/favorites"
                            className="bioFavoritesButton"
                            onClick={() => {
                                navigation.navigateToFavorites()
                                setShowMenu(false)
                            }}
                        >
                            <i className="fas fa-star"></i> My Fav
                        </Link>

                        {/* Botón para cerrar sesión */}
                        <button className="homeLogoutButton" onClick={onLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Contenedor principal del perfil */}
            <div className="bioFormContainer">
                {/* Formulario estilo userMsgForm */}
                <div className="bioForm">
                    {/* Sección de información del usuario */}
                    <div className="bio-user-info-section">
                        {/* Avatar o inicial del usuario */}
                        <div className="bio-user-avatar">
                            {viewedUser.avatar ? (
                                <img
                                    src={viewedUser.avatar}
                                    alt={`${viewedUser.userName}'s avatar`}
                                    className="bio-avatar"
                                />
                            ) : (
                                <div className="bio-avatar-initial">
                                    {viewedUser.userName[0].toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Nombre del usuario */}
                        <h2 className="bio-username">{viewedUser.userName}</h2>

                        {/* Estado del usuario */}
                        {viewedUser.status && (
                            <div className="bio-user-status">
                                <p>{viewedUser.status}</p>
                            </div>
                        )}
                    </div>

                    {/* Lista de mensajes del usuario */}
                    <div className="bioMsgContainer">
                        {userMessages.length > 0 ? (
                            userMessages.map((message) => {
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

                                //Verifica si el usuario actual dio favorito a este mensajes//
                                const hasFavorited = message.favorite && message.favorite.includes(loggedUserId)

                                //Renderiza cada mensaje del usuario//
                                return (
                                    <div key={message.date} className="bio-message">
                                        {/* Muestra título del mensaje */}
                                        <div className="bio-message-title">Title: {message.title}</div>

                                        {/* Muestra contenido del mensaje */}
                                        <div className="bio-message-text">Message: {message.msg}</div>

                                        {/* Muestra imagen adjunta si existe */}
                                        {message.image && (
                                            <div className="bio-message-image-container">
                                                <img
                                                    src={message.image}
                                                    alt="User uploaded content"
                                                    className="bio-message-image"
                                                />
                                            </div>
                                        )}

                                        {/* Muestra fecha del mensaje */}
                                        <div className="bio-message-date">Date: {message.date}</div>

                                        {/* Contenedor de acciones (like/dislike) */}
                                        <div className="bio-message-actions">
                                            {/* Contenedor y botón de like */}
                                            <div className="bio-like-container">
                                                <button
                                                    className="bio-like-button"
                                                    onClick={() => onLike(message.date)}
                                                    aria-label="Like"
                                                >
                                                    {/* Icono de like (lleno o vacío según estado) */}
                                                    <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>

                                                    {/* Contador de likes */}
                                                    <span className="bio-message-likes">({likesCount})</span>
                                                </button>

                                                {/* Tooltip con nombres de usuarios que dieron like */}
                                                {likedUsers.length > 0 && (
                                                    <div className="bio-users-tooltip likes-tooltip">
                                                        {likedUsers.slice(0, 3).join(', ')}
                                                        {likedUsers.length > 3 && (
                                                            <span className="bio-users-count">
                                                                {` and ${likedUsers.length - 3} more`}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Contenedor y botón de dislike */}
                                            <div className="bio-dislike-container">
                                                <button
                                                    className="bio-dislike-button"
                                                    onClick={() => onDislike(message.date)}
                                                    aria-label="Dislike"
                                                >
                                                    {/* Icono de dislike (lleno o vacío según estado) */}
                                                    <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>

                                                    {/* Contador de dislikes */}
                                                    <span className="bio-message-dislikes">({dislikesCount})</span>
                                                </button>

                                                {/* Tooltip con nombres de usuarios que dieron dislike */}
                                                {dislikedUsers.length > 0 && (
                                                    <div className="bio-users-tooltip dislikes-tooltip">
                                                        {dislikedUsers.slice(0, 3).join(', ')}
                                                        {dislikedUsers.length > 3 && (
                                                            <span className="bio-users-count">
                                                                {` and ${dislikedUsers.length - 3} more`}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            {/* Contenedor y botón de favorito */}
                                            <div className="bio-favorite-container">
                                                <button
                                                    className="bio-favorite-button"
                                                    onClick={() => onFavorite(message.date)}
                                                    aria-label="Favorite"
                                                >
                                                    {/* Icono de dislike (lleno o vacío según estado) */}
                                                    <i className={hasFavorited ? "fas fa-heart" : "far fa-heart"}></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="bio-no-messages">This user hasn't posted any messages yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

//Exporta el componente como exportación por defecto//
export default BioPage