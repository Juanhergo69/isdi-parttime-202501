//Importa la librería React//
import React from 'react'
//Importa los hooks useState y useEffect de React//
import { useState, useEffect } from 'react'
//Importa el componente Link de react-router-dom para navegación//
import { Link } from 'react-router-dom'
//Importa getMessages//
import { getMessages } from '../logic/getMessages'
//Importa getLoggedUserId//
import { getLoggedUserId } from '../logic/getLoggedUserId'
//Importa getUsers//
import { getUsers } from '../logic/getUsers'
//Importa toggleLike//
import { toggleLike } from '../logic/toggleLike'
//Importa toggleDislike//
import { toggleDislike } from '../logic/toggleDislike'
//Importa toggleFavorite//
import { toggleFavorite } from '../logic/toggleFavorite'
//Importa storeMsg//
import { storeMsg } from '../logic/storeMsg'
import { validateTitle, validateTextarea} from '../utils/validators'
//Importa createModal//
import { createModal } from '../utils/modal'
//Importa los estilos CSS para esta página//
import '../styles/pages/homePage.css'

//Define el componente HomePage que recibe la prop navigation//
const HomePage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú de usuario//
    const [showMenu, setShowMenu] = useState(false)
    //Estado para controlar la visibilidad del formulario de mensajes//
    const [showMsgForm, setShowMsgForm] = useState(false)
    //Estado para almacenar la lista de mensajes//
    const [messages, setMessages] = useState(getMessages())
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
        //Función para cerrar el menú al hacer clic fuera de él//
        const handleClickOutside = (e) => {
            if (showMenu && !e.target.closest('.homeMenuButton') && !e.target.closest('.homeMenuDropContainer')) {
                setShowMenu(false) //Cierra el menu//
            }
        }

        //Agrega el event listener para clicks//
        document.addEventListener('click', handleClickOutside);
        //Limpieza: remueve el event listener al desmontar el componente//
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showMenu]) //Dependencia: solo se ejecuta cuando showMenu cambia//

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
                setImagePreview(reader.result) //Guarda la vista previa como URL de datos//
            }
            //Lee el archivo como URL de datos//
            reader.readAsDataURL(file)
        }
    }

    //Remueve la imagen seleccionada//
    const removeImage = () => {
        setSelectedImage(null) //Limpia la imagen seleccionada//
         setImagePreview(null) //Limpia la vista previa//
         document.getElementById('image-upload').value = '' //Resetea el input de archivo//
    }

    //Maneja el like a un mensaje//
    const handleLike = (messageId) => {
        toggleLike(messageId, loggedUserId) //Llama a la función para alternar el like//
        setMessages(getMessages()) //Actualiza la lista de mensajes//
    }

    //Maneja el dislike a un mensaje//
    const handleDislike = (messageId) => {
        toggleDislike(messageId, loggedUserId) //Llama a la función para alternar el dislike//
        setMessages(getMessages()) //Actualiza la lista de mensajes//
    }

    //Maneja el favorito de un mensaje//
    const handleFavorite = (messageId) => {
        toggleFavorite(messageId, loggedUserId) //Llama a la función para alternar el favorito//
        setMessages(getMessages()) //Actualiza la lista de mensajes//
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

        //Manejo de imagen si fue seleccionada//
        if (selectedImage) {
            const reader = new FileReader()

            //Cuando se complete la lectura de la imagen//
            reader.onload = (event) => {
                const imageBase64 = event.target.result //Obtiene la imagen como base64//

                //Almacena el mensaje con imagen//
                storeMsg(loggedUserId, title, msg, new Date(), imageBase64)

                resetForm() //Resetea el formulario//
                createModal('Message stored successfully!') //Muestra confirmación

            }
             //Lee la imagen como URL de datos//
             reader.readAsDataURL(selectedImage)
         } else {
             //Almacena el mensaje sin imagen//
             storeMsg(loggedUserId, title, msg, new Date())
 
             resetForm() //Resetea el formulario//
             createModal('Message stored successfully!') //Muestra confirmación//

            }
        
        }

    //Resetea el formulario de mensaje//
    const resetForm = () => {
        setMessages(getMessages()) //Actualiza los mensajes//
        setSelectedImage(null) //Limpia la imagen seleccionada//
        setImagePreview(null) //Limpia la vista previa//
        document.getElementById('sendMsgForm').reset() //Resetea el formulario//
        setShowMsgForm(false) //Oculta el formulario//
    }

    //Maneja el logout del usuario//
    const handleLogout = () => {
        sessionStorage.removeItem('id') //Elimina el ID de sessionStorage//
        localStorage.removeItem('id') //Elimina el ID de localStorage//
        navigation.navigateToLogin() //Redirige a la página de login//
    }

    //Si no hay usuario logueado, redirige a login//
    if (!loggedUserId) {
        navigation.navigateToLogin() //Navega a login//
        return null //No renderiza nada//
    }

    //Renderiza el componente//
    return (
        <div className="homePageContainer">
            {/* Contenedor del encabezado */}
            <div className="homeHeaderContainer">
                {/* Contenedor de logo y botón de nuevo post */}
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
                                navigation.navigateToMessages()
                                setShowMenu(false)
                            }}
                        >
                            <i className="fas fa-envelope"></i> My Msg
                        </Link>

                        {/* Enlace a favoritos del usuario */}
                        <Link
                            to="/favorites"
                            className="homeFavoritesButton"
                            onClick={() => {
                                navigation.navigateToFavorites()
                                setShowMenu(false)
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
                            //Encuentra el autor del mensaje actual//
                            const author = users.find(u => u.id === message.userId)
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
                                            onClick={() => navigation.navigateToBio(author.userName)}
                                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            {(author && author.userName) || 'Unknown'}
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