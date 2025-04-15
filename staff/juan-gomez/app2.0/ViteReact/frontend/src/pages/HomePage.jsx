//Importa la librería React//
import React from 'react'
//Importa los hooks useState y useEffect de React//
import { useState, useEffect } from 'react'
//Importa el componente Link de react-router-dom para navegación//
import { Link } from 'react-router-dom'
//Importa funciones utilitarias desde el archivo utils//
import { createModal, validateTitle, validateTextarea, getUsers, getLoggedUserId } from '../utils/utils'
//Importa los estilos CSS para esta página//
import '../styles/pages/homePage.css'

//Define el componente HomePage que recibe la prop navigation//
const HomePage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú de usuario//
    const [showMenu, setShowMenu] = useState(false)
    //Estado para controlar la visibilidad del formulario de mensajes//
    const [showMsgForm, setShowMsgForm] = useState(false)
    //Estado para almacenar la lista de mensajes//
    const [messages, setMessages] = useState([])
    //Estado para almacenar la imagen seleccionada//
    const [selectedImage, setSelectedImage] = useState(null)
    //Estado para almacenar la previsualización de la imagen
    const [imagePreview, setImagePreview] = useState(null)
    
    //Obtiene todos los usuarios registrados//
    const users = getUsers()
    //Obtiene el ID del usuario logueado//
    const loggedUserId = getLoggedUserId()
    //Busca el usuario logueado en la lista de usuarios//
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Efecto que se ejecuta al montar el componente y cuando cambia showMenu//
    useEffect(() => {
        //Carga los mensajes al iniciar//
        loadMessages()
        
        //Función para cerrar el menú al hacer clic fuera de él//
        const handleClickOutside = (e) => {
            if (showMenu && !e.target.closest('.homeMenuButton') && !e.target.closest('.homeMenuDropContainer')) {
                setShowMenu(false)
            }
        }

        //Agrega el event listener para clicks//
        document.addEventListener('click', handleClickOutside);
        //Limpieza: remueve el event listener al desmontar el componente//
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showMenu])

    //Función para cargar mensajes desde el servidor//
    const loadMessages = () => {
        //Crea una nueva petición XMLHttpRequest//
        const xhr = new XMLHttpRequest();
        //Configura la petición GET al endpoint de mensajes//
        xhr.open('GET', 'http://localhost:3001/api/posts', true)
        
        //Define qué hacer cuando la petición se complete//
        xhr.onload = function() {
            //Si la respuesta es exitosa (código 200)//
            if (this.status === 200) {
                //Parsea la respuesta JSON//
                const response = JSON.parse(this.responseText)
                //Si la respuesta indica éxito, actualiza los mensajes//
                if (response.success) {
                    setMessages(response.messages)
                }
            }
        }
        
        //Envía la petición//
        xhr.send()
    }

    //Maneja el cambio de imagen seleccionada//
    const handleImageChange = (e) => {
        //Obtiene el archivo seleccionado//
        const file = e.target.files[0]
        if (file) {
            //Guarda el archivo seleccionado//
            setSelectedImage(file)
            //Crea un FileReader para previsualizar la imagen//
            const reader = new FileReader()
            //Cuando se cargue la imagen, actualiza la previsualización//
            reader.onload = () => {
                setImagePreview(reader.result)
            }
            //Lee el archivo como URL de datos//
            reader.readAsDataURL(file)
        }
    }

    //Remueve la imagen seleccionada//
    const removeImage = () => {
        setSelectedImage(null)
        setImagePreview(null)
        //Resetea el input de archivo//
        document.getElementById('image-upload').value = ''
    }

    //Maneja el like a un mensaje//
    const handleLike = (messageId) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:3001/api/posts/like', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        
        xhr.onload = function() {
            if (this.status === 200) {
                //Recarga los mensajes después de dar like//
                loadMessages()
            }
        }
        
        //Envía los datos del like//
        xhr.send(JSON.stringify({
            messageId,
            userId: loggedUserId
        }))
    }

    //Maneja el dislike a un mensaje//
    const handleDislike = (messageId) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:3001/api/posts/dislike', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        
        xhr.onload = function() {
            if (this.status === 200) {
                //Recarga los mensajes después de dar dislike//
                loadMessages()
            }
        }
        
        //Envía los datos del dislike//
        xhr.send(JSON.stringify({
            messageId,
            userId: loggedUserId
        }))
    }

    //Maneja el favorito de un mensaje//
    const handleFavorite = (messageId) => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', 'http://localhost:3001/api/posts/favorite', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        
        xhr.onload = function() {
            if (this.status === 200) {
                //Recarga los mensajes después de marcar como favorito//
                loadMessages()
            }
        };
        
        //Envía los datos del favorito//
        xhr.send(JSON.stringify({
            messageId,
            userId: loggedUserId
        }))
    }

    //Maneja el envío del formulario de mensaje//
    const handleSubmitMessage = (e) => {
        //Previene el comportamiento por defecto del formulario//
        e.preventDefault()
        //Obtiene los valores del formulario//
        const title = e.target.title.value
        const msg = e.target.msg.value

        //Valida el título//
        if (!validateTitle(title)) {
            createModal('Title cannot exceed 5 words')
            return
        }

        //Valida el mensaje//
        if (!validateTextarea(msg)) {
            createModal('Message cannot exceed 100 words')
            return
        }

        //Crea la petición para enviar el mensaje//
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3001/api/posts', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        
        xhr.onload = function() {
            //Si la respuesta es exitosa (código 2xx)//
            if (this.status >= 200 && this.status < 300) {
                const response = JSON.parse(this.responseText)
                if (response.success) {
                    //Muestra mensaje de éxito, resetea el formulario y recarga mensajes//
                    createModal(response.message)
                    resetForm()
                    loadMessages()
                } else {
                    createModal(response.message)
                }
            } else {
                createModal('Error creating post')
            }
        }
        
        //Prepara los datos del mensaje//
        const postData = {
            userId: loggedUserId,
            title,
            msg,
            image: imagePreview || null
        }
        
        //Envía la petición con los datos del mensaje//
        xhr.send(JSON.stringify(postData))
    }

    //Resetea el formulario de mensaje//
    const resetForm = () => {
        setSelectedImage(null)
        setImagePreview(null)
        document.getElementById('sendMsgForm').reset()
        setShowMsgForm(false)
    }

    // Maneja el logout del usuario
    const handleLogout = () => {
        //Remueve el ID de usuario de sessionStorage y localStorage//
        sessionStorage.removeItem('id')
        localStorage.removeItem('id')
        //Navega a la página de login//
        navigation.navigateToLogin()
    }

    //Si no hay usuario logueado, redirige a login//
    if (!loggedUserId) {
        navigation.navigateToLogin();
        return null;
    }

    //Renderiza el componente//
    return (
        <div className="homePageContainer">
            {/* Contenedor del encabezado */}
            <div className="homeHeaderContainer">
                <div className="homeImgContainer">
                    {/* Logo de la aplicación */}
                    <img src="/Logo.jpg" className="homeImg" alt="Logo" />
                    {/* Botón para mostrar/ocultar formulario de mensaje */}
                    <button
                        className="home-toggleSendMsgFormButton"
                        onClick={() => setShowMsgForm(!showMsgForm)}
                    >
                        {showMsgForm ? 'Hide Form' : 'New Post'}
                    </button>
                </div>
                {/* Mensaje de bienvenida con nombre de usuario */}
                <h1 className="homeMsg">Welcome, {(loggedUser && loggedUser.userName) || 'User'}</h1>

                {/* Botón del menú de usuario */}
                <button
                    className={`homeMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
                    onClick={() => setShowMenu(!showMenu)}
                    aria-expanded={showMenu}
                    aria-label="User menu"
                >
                    <div className="homeMenuButton-content">
                        {/* Muestra avatar o inicial del usuario */}
                        {loggedUser?.avatar ? (
                            <img src={loggedUser.avatar} className="homeMenuButton-avatar" alt="User avatar" />
                        ) : (
                            <span className="homeMenuButton-initial">
                                {(loggedUser && loggedUser.userName && loggedUser.userName[0].toUpperCase()) || 'U'}
                            </span>
                        )}
                    </div>
                </button>

                {/* Menú desplegable del usuario */}
                {showMenu && (
                    <div className="homeMenuDropContainer">
                        {/* Enlace al perfil */}
                        <Link
                            to="/profile"
                            className="homeProfileButton"
                            onClick={() => {
                                navigation.navigateToProfile();
                                setShowMenu(false);
                            }}
                        >
                            <i className="fas fa-user"></i> Profile
                        </Link>

                        {/* Enlace a mensajes del usuario */}
                        <Link
                            to="/messages"
                            className="homeMessagesButton"
                            onClick={() => {
                                navigation.navigateToMessages();
                                setShowMenu(false);
                            }}
                        >
                            <i className="fas fa-envelope"></i> My Msg
                        </Link>

                        {/* Enlace a favoritos del usuario */}
                        <Link
                            to="/favorites"
                            className="homeFavoritesButton"
                            onClick={() => {
                                navigation.navigateToFavorites();
                                setShowMenu(false);
                            }}
                        >
                            <i className="fas fa-star"></i> My Fav
                        </Link>

                        {/* Botón de logout */}
                        <button className="homeLogoutButton" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Contenedor principal de mensajes */}
            <div className="homeMsgContainer">
                {/* Formulario para crear mensajes (condicional) */}
                {showMsgForm && (
                    <form id="sendMsgForm" className="homeSendMsgForm" onSubmit={handleSubmitMessage}>
                        {/* Input para el título */}
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter your title"
                            required
                            name="title"
                        />

                        {/* Textarea para el mensaje */}
                        <textarea
                            id="msg"
                            className="textarea"
                            placeholder="Enter your message"
                            required
                            name="msg"
                        ></textarea>

                        {/* Sección para subir imagen */}
                        <div className="home-optimized-image-section">
                            <div className="home-image-controls-row">
                                {/* Botón para seleccionar imagen */}
                                <label htmlFor="image-upload" className="home-image-upload-label">
                                    <i className="fas fa-image"></i> {selectedImage ? 'Change Image' : 'Add Image'}
                                </label>
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                {/* Botón para remover imagen */}
                                {selectedImage && (
                                    <button
                                        type="button"
                                        className="home-remove-image-button"
                                        onClick={removeImage}
                                    >
                                        <i className="fas fa-times"></i> Remove
                                    </button>
                                )}
                            </div>

                            {/* Muestra nombre del archivo de imagen */}
                            {selectedImage && (
                                <div className="home-compact-image-info">
                                    <span className="home-image-filename">{selectedImage.name}</span>
                                </div>
                            )}

                            {/* Muestra previsualización de la imagen */}
                            {imagePreview && (
                                <div className="home-constrained-preview">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="home-compact-image-preview"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Botón para enviar el mensaje */}
                        <input type="submit" value="Post Message" />
                    </form>
                )}

                {/* Contenedor de mensajes de usuarios */}
                <div className={`homeUserMsgForm ${showMsgForm ? 'with-form' : 'centered'}`}>
                    <div className="homeUserMsgContainer">
                        {/* Mapea cada mensaje para renderizarlo */}
                        {messages.map((message) => {
                            //Determina si el usuario actual dio like//
                            const hasLiked = message.likes && message.likes.includes(loggedUserId)
                            //Determina si el usuario actual dio dislike//
                            const hasDisliked = message.dislikes && message.dislikes.includes(loggedUserId)
                            //Cuenta los likes//
                            const likesCount = (message.likes && message.likes.length) || 0
                            //Cuenta los dislikes//
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
                            //Determina si el usuario actual marcó como favorito//
                            const hasFavorited = message.favorite && message.favorite.includes(loggedUserId);

                            //Renderiza cada mensaje//
                            return (
                                <div key={message.date} className="homeMessage">
                                    {/* Información del usuario que publicó */}
                                    <div className="home-message-user">
                                        User: <span
                                            className="home-user-name-link"
                                            onClick={() => navigation.navigateToBio(message.userName)}
                                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            {message.userName || 'Unknown'}
                                        </span>
                                    </div>

                                    {/* Título del mensaje */}
                                    <div className="home-message-title">Title: {message.title}</div>
                                    {/* Contenido del mensaje */}
                                    <div className="home-message-text">Message: {message.msg}</div>

                                    {/* Imagen adjunta (si existe) */}
                                    {message.image && (
                                        <div className="home-message-image-container">
                                            <img
                                                src={message.image}
                                                alt="User uploaded content"
                                                className="home-message-image"
                                            />
                                        </div>
                                    )}

                                    {/* Fecha del mensaje */}
                                    <div className="home-message-date">Date: {message.date}</div>

                                    {/* Acciones del mensaje (like, dislike, favorito) */}
                                    <div className="home-message-actions">
                                        {/* Contenedor de like */}
                                        <div className="home-like-container">
                                            <button
                                                className="home-like-button"
                                                onClick={() => handleLike(message.date)}
                                                aria-label="Like"
                                            >
                                                {/* Icono de like (sólido si ya dio like, outline si no) */}
                                                <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
                                                {/* Contador de likes */}
                                                <span className="home-message-likes">({likesCount})</span>
                                            </button>
                                            {/* Tooltip con nombres de usuarios que dieron like */}
                                            {likedUsers.length > 0 && (
                                                <div className="home-users-tooltip likes-tooltip">
                                                    {likedUsers.slice(0, 3).join(', ')}
                                                    {likedUsers.length > 3 && (
                                                        <span className="home-users-count">
                                                            {` and ${likedUsers.length - 3} more`}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Contenedor de dislike */}
                                        <div className="home-dislike-container">
                                            <button
                                                className="home-dislike-button"
                                                onClick={() => handleDislike(message.date)}
                                                aria-label="Dislike"
                                            >
                                                {/* Icono de dislike */}
                                                <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>
                                                {/* Contador de dislikes */}
                                                <span className="home-message-dislikes">({dislikesCount})</span>
                                            </button>
                                            {/* Tooltip con nombres de usuarios que dieron dislike */}
                                            {dislikedUsers.length > 0 && (
                                                <div className="home-users-tooltip dislikes-tooltip">
                                                    {dislikedUsers.slice(0, 3).join(', ')}
                                                    {dislikedUsers.length > 3 && (
                                                        <span className="home-users-count">
                                                            {` and ${dislikedUsers.length - 3} more`}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {/* Contenedor de favorito */}
                                        <div className="home-favorite-container">
                                            <button
                                                className="home-favorite-button"
                                                onClick={() => handleFavorite(message.date)}
                                                aria-label="Favorite"
                                            >
                                                {/* Icono de corazón (sólido si es favorito, outline si no) */}
                                                <i className={hasFavorited ? "fas fa-heart" : "far fa-heart"}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

//Exporta el componente HomePage como exportación por defecto//
export default HomePage