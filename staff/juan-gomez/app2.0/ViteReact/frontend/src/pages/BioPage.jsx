//Importa la biblioteca React para crear componentes//
import React from 'react'

//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'

//Importa el componente Link y useParams de react-router-dom para navegación//
import { Link, useParams } from 'react-router-dom'

//Importa funciones utilitarias específicas desde el archivo utils//
import {
    getUsers,          //Obtiene lista de usuarios//
    getMessages,       //Obtiene todos los mensajes//
    getLoggedUserId    //Obtiene ID del usuario logueado//
} from '../utils/utils'

//Importa funciones para manejar likes/dislikes//
import { toggleLike, toggleDislike } from '../utils/data.js'

//Importa estilos CSS//
import '../styles/pages/bioPage.css'


//Define el componente funcional Bio que recibe props de navegación//
const BioPage = ({ navigation }) => {
    //Obtiene el parámetro userName de la URL//
    const { userName } = useParams()

    //Obtiene la lista completa de usuarios registrados//
    const users = getUsers()

    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Busca el usuario cuyo perfil se está viendo//
    const viewedUser = users.find(user => user.userName === userName)

    //Estado para almacenar y actualizar la lista de mensajes//
    const [messages, setMessages] = useState(getMessages())

    //Filtra los mensajes para obtener solo los del usuario visto//
    const userMessages = messages.filter(message => {
        const messageAuthor = users.find(user => user.id === message.userId)
        return messageAuthor && messageAuthor.userName === userName
    })

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

    if (!viewedUser) {
        //Usamos useEffect para redirigir después del renderizado inicial//
        useEffect(() => {
            navigation.navigateToNotFound()
        }, [navigation]) //Dependencia: navigation//

        return null //No renderiza nada mientras redirige//
    }

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
                <h1 className="bioMsg">User Profile</h1>

                {/* Botón para volver a home - ahora con Link */}
                <Link
                    to="/home"
                    className="bioMenuButton-back-button"
                    onClick={() => navigation.navigateToHome()}
                    aria-label="Back to home"
                >
                    <div className="bioMenuButton-content">
                        <i className="fas fa-arrow-left"></i>
                    </div>
                </Link>
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
                                                    onClick={() => handleLike(message.date)}
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
                                                            <span className="users-count">
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
                                                    onClick={() => handleDislike(message.date)}
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
        </div>
    )
}

//Exporta el componente como exportación por defecto//
export default BioPage