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
//Importa handleLike//
import { handleLike } from '../logic/handleLike'
//Importa handleDislike//
import { handleDislike } from '../logic/handleDislike'
//Importa handleFavorite//
import { handleFavorite } from '../logic/handleFavorite'
//Importa handleImageChange//
import { handleImageChange } from '../logic/handleImageChange'
//Importa handleLogout//
import { handleLogout } from '../logic/handleLogout'
//Importa handleSumbitMessage//
import { handleSubmitMessage } from '../logic/handleSubmitMessage'
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
        document.addEventListener('click', handleClickOutside)
        //Limpieza: remueve el event listener al desmontar el componente//
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showMenu]) //Dependencia: solo se ejecuta cuando showMenu cambia//

//Maneja el cambio de imagen seleccionada//
const onImageChange = (e) => {
    // Obtiene el primer archivo seleccionado del input file//
    const file = e.target.files[0]
    //Verifica si se seleccionó un archivo válido//
    if (file) {
        //Guarda el archivo seleccionado en el estado//
        setSelectedImage(file)
        //Llama al handler de cambio de imagen pasando el archivo y un callback//
        handleImageChange(file, (result) => {
            //Cuando el handler completa la conversión, guarda el resultado (base64) en el estado para previsualización//
            setImagePreview(result)
        })
    }
}

//Remueve la imagen seleccionada//
const removeImage = () => {
    //Limpia la imagen seleccionada del estado//
    setSelectedImage(null)
    //Limpia la previsualización de imagen del estado//
    setImagePreview(null)
    //Resetea el valor del input file para permitir volver a seleccionar la misma imagen//
    document.getElementById('image-upload').value = ''
}

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

//Maneja el envío del formulario de mensaje//
const onSubmitMessage = (e) => {
    //Previene el comportamiento por defecto del formulario (recarga de página)//
    e.preventDefault()
    //Crea un objeto con los datos del formulario//
    const formData = {
        title: e.target.title.value,  //Obtiene el valor del campo título//
        msg: e.target.msg.value      //Obtiene el valor del campo mensaje//
    }

    //Llama al handler de envío de mensaje pasando://
    //- Los datos del formulario//
    //- El ID del usuario logueado//
    //- La imagen seleccionada (puede ser null)//
    //- Un callback que se ejecutará cuando el mensaje se guarde exitosamente//
    const success = handleSubmitMessage(formData, loggedUserId, selectedImage, () => {
        //Callback: resetea el formulario cuando el mensaje se guarda correctamente//
        resetForm()
    })

    //Si el handler devuelve éxito (true), actualiza la lista de mensajes//
    if (success) {
        setMessages(getMessages())
    }
}

//Resetea el formulario de mensaje//
const resetForm = () => {
    //Actualiza la lista de mensajes obteniendo la versión más reciente//
    setMessages(getMessages())
    //Limpia la imagen seleccionada//
    setSelectedImage(null)
    //Limpia la previsualización de imagen//
    setImagePreview(null)
    //Resetea los campos del formulario a sus valores iniciales//
    document.getElementById('sendMsgForm').reset()
    //Oculta el formulario de mensaje//
    setShowMsgForm(false)
}

//Maneja el logout del usuario//
const onLogout = () => {
    //Ejecuta el handler de logout que limpia los datos de sesión//
    handleLogout()
    //Navega a la página de login usando la función de navegación proporcionada//
    navigation.navigateToLogin()
}

    //Si no hay usuario logueado, redirige a login//
    if (!loggedUserId) {
        navigation.navigateToLogin()
        return null
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
                        <button className="homeLogoutButton" onClick={onLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Contenedor principal de mensajes */}
            <div className="homeMsgContainer">
                {/* Formulario para crear mensajes (condicional) */}
                {showMsgForm && (
                    <form id="sendMsgForm" className="homeSendMsgForm" onSubmit={onSubmitMessage}>
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
                                    onChange={onImageChange}
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
                                                onClick={() => onLike(message.date)}
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
                                                onClick={() => onDislike(message.date)}
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
                                                onClick={() => onFavorite(message.date)}
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