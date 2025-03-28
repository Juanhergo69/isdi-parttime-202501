//Importa React y utilidades necesarias//
import React from 'react'
//Importa funciones para manejar likes/dislikes y almacenar mensajes//
import { toggleLike, toggleDislike, storeMsg } from '../utils/data.js'
//Importa funciones utilitarias//
import { getMessages, getLoggedUserId, getUsers, createModal, validateTitle, validateTextarea } from '../utils/utils.js'
//Importa estilos CSS//
import '../index.css'

//Componente principal de la página de inicio//
const HomePage = ({ navigation }) => {
    //Estados del componente://
    const [showMenu, setShowMenu] = React.useState(false) //Controla visibilidad del menú usuario//
    const [showMsgForm, setShowMsgForm] = React.useState(false) //Controla visibilidad del formulario//
    const [messages, setMessages] = React.useState(getMessages()) //Almacena los mensajes//
    const [selectedImage, setSelectedImage] = React.useState(null) //Imagen seleccionada para nuevo mensaje//
    const [imagePreview, setImagePreview] = React.useState(null) //Vista previa de la imagen//

    //Obtiene datos de usuarios y usuario logueado//
    const users = getUsers()
    const loggedUserId = getLoggedUserId()
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Efecto para cerrar menú al hacer clic fuera//
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (showMenu && !e.target.closest('.menuButton') && !e.target.closest('.menuDropContainer')) {
                setShowMenu(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showMenu])

    //Maneja cambio de imagen seleccionada//
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            const reader = new FileReader()
            reader.onload = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    //Elimina la imagen seleccionada//
    const removeImage = () => {
        setSelectedImage(null)
        setImagePreview(null)
        document.getElementById('image-upload').value = ''
    }

    //Maneja like en un mensaje//
    const handleLike = (messageId) => {
        toggleLike(messageId, loggedUserId);
        setMessages(getMessages())
    }

    //Maneja dislike en un mensaje//
    const handleDislike = (messageId) => {
        toggleDislike(messageId, loggedUserId);
        setMessages(getMessages())
    }

    //Maneja envío de nuevo mensaje//
    const handleSubmitMessage = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const msg = e.target.msg.value

        //Validaciones//
        if (!validateTitle(title)) {
            createModal('Title cannot exceed 5 words')
            return
        }

        if (!validateTextarea(msg)) {
            createModal('Message cannot exceed 100 words');
            return
        }

        //Manejo de imagen si existe//
        if (selectedImage) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const imageBase64 = event.target.result;
                storeMsg(loggedUserId, title, msg, new Date(), imageBase64)
                resetForm()
                createModal('Message stored successfully!')
            }
            reader.readAsDataURL(selectedImage)
        } else {
            storeMsg(loggedUserId, title, msg, new Date())
            resetForm();
            createModal('Message stored successfully!')
        }
    }

    //Resetea el formulario//
    const resetForm = () => {
        setMessages(getMessages())
        setSelectedImage(null)
        setImagePreview(null)
        document.getElementById('sendMsgForm').reset()
        setShowMsgForm(false)
    }

    //Maneja logout del usuario//
    const handleLogout = () => {
        sessionStorage.removeItem('id')
        localStorage.removeItem('id')
        navigation.navigateToLogin()
    }

    //Redirige si no hay usuario logueado//
    if (!loggedUserId) {
        navigation.navigateToLogin()
        return null
    }

    //Renderizado del componente//
    return (
        <div className="homePageContainer">
            {/* Encabezado */}
            <div className="homeHeaderContainer">
                <div className="homeImgContainer">
                    <img src="/Logo.jpg" className="homeImg" alt="Logo" />
                    <button
                        className="toggleSendMsgFormButton"
                        onClick={() => setShowMsgForm(!showMsgForm)}
                    >
                        {showMsgForm ? 'Hide Form' : 'New Post'}
                    </button>
                </div>

                <h1 className="homeMsg">Welcome, {(loggedUser && loggedUser.userName) || 'User'}</h1>

                {/* Botón y menú de usuario */}
                <button
                    className="menuButton"
                    onClick={() => setShowMenu(!showMenu)}
                    aria-expanded={showMenu}
                    aria-label="User menu"
                >
                    {(loggedUser && loggedUser.userName && loggedUser.userName[0].toUpperCase()) || 'U'}
                </button>

                {showMenu && (
                    <div className="menuDropContainer">
                        <button className="profileButton" onClick={() => navigation.navigateToProfile()}>
                            <i className="fas fa-user"></i> Profile
                        </button>
                        <button className="settingsButton" onClick={() => createModal('Settings page not implemented')}>
                            <i className="fas fa-cog"></i> Settings
                        </button>
                        <button className="logoutButton" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Área de contenido */}
            <div className="msgContainer">
                {/* Formulario para nuevo mensaje */}
                {showMsgForm && (
                    <form id="sendMsgForm" className="sendMsgForm" onSubmit={handleSubmitMessage}>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter your title"
                            required
                            name="title"
                        />

                        <textarea
                            id="msg"
                            className="adjusted-textarea"
                            placeholder="Enter your message"
                            required
                            name="msg"
                        ></textarea>

                        {/* Sección de imagen */}
                        <div className="optimized-image-section">
                            <div className="image-controls-row">
                                <label htmlFor="image-upload" className="image-upload-label">
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

                                {selectedImage && (
                                    <button
                                        type="button"
                                        className="remove-image-button"
                                        onClick={removeImage}
                                    >
                                        <i className="fas fa-times"></i> Remove
                                    </button>
                                )}
                            </div>

                            {selectedImage && (
                                <div className="compact-image-info">
                                    <span className="image-filename">{selectedImage.name}</span>
                                </div>
                            )}

                            {imagePreview && (
                                <div className="constrained-preview">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="compact-image-preview"
                                    />
                                </div>
                            )}
                        </div>

                        <input type="submit" value="Post Message" />
                    </form>
                )}

                {/* Lista de mensajes */}
                <div className={`userMsgForm ${showMsgForm ? 'with-form' : 'centered'}`}>
                    <div className="userMsgContainer">
                        {messages.map((message) => {
                            //Encuentra el autor del mensaje//
                            const author = users.find(u => u.id === message.userId)
                            //Verifica si el usuario actual dio like/dislike//
                            const hasLiked = message.likes && message.likes.includes(loggedUserId)
                            const hasDisliked = message.dislikes && message.dislikes.includes(loggedUserId)
                            //Cuenta likes/dislikes//
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

                            return ( //Renderizados del mensaje//
                                <div key={message.date} className="message">
                                    <div className="message-user">User: {(author && author.userName) || 'Unknown'}</div>
                                    <div className="message-title">Title: {message.title}</div>
                                    <div className="message-text">Message: {message.msg}</div>
                                    {message.image && (
                                        <div className="message-image-container">
                                            <img
                                                src={message.image}
                                                alt="User uploaded content"
                                                className="message-image"
                                            />
                                        </div>
                                    )}
                                    <div className="message-date">Date: {message.date}</div>

                                    {/* Acciones de like/dislike */}
                                    <div className="message-actions">
                                        <div className="like-container">
                                            <button
                                                className="like-button"
                                                onClick={() => handleLike(message.date)}
                                                aria-label="Like"
                                            >
                                                <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
                                                <span className="message-likes">({likesCount})</span>
                                            </button>
                                            {likedUsers.length > 0 && (
                                                <div className="users-tooltip likes-tooltip">
                                                    {likedUsers.slice(0, 3).join(', ')}
                                                    {likedUsers.length > 3 && (
                                                        <span className="users-count">
                                                            {` and ${likedUsers.length - 3} more`}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="dislike-container">
                                            <button
                                                className="dislike-button"
                                                onClick={() => handleDislike(message.date)}
                                                aria-label="Dislike"
                                            >
                                                <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>
                                                <span className="message-dislikes">({dislikesCount})</span>
                                            </button>
                                            {dislikedUsers.length > 0 && (
                                                <div className="users-tooltip dislikes-tooltip">
                                                    {dislikedUsers.slice(0, 3).join(', ')}
                                                    {dislikedUsers.length > 3 && (
                                                        <span className="users-count">
                                                            {` and ${dislikedUsers.length - 3} more`}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

//Exporta el componente HomePage como exportación por defecto//
export default HomePage
