//Importa la biblioteca React para crear componentes//
import React from 'react'

//Importa funciones específicas para manejar likes/dislikes y almacenar mensajes desde un archivo de datos//
import { toggleLike, toggleDislike, storeMsg } from '../utils/data.js'

//Importa funciones utilitarias generales desde un archivo de utilidades//
import { getMessages, getLoggedUserId, getUsers, createModal, validateTitle, validateTextarea } from '../utils/utils.js'

//Importa los estilos CSS para este componente//
import '../index.css'

//Define el componente funcional HomePage que recibe props de navegación//
const HomePage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú desplegable del usuario//
    const [showMenu, setShowMenu] = React.useState(false)

    //Estado para controlar la visibilidad del formulario de mensaje//
    const [showMsgForm, setShowMsgForm] = React.useState(false)

    //Estado para almacenar y actualizar la lista de mensajes//
    const [messages, setMessages] = React.useState(getMessages())

    //Estado para guardar la imagen seleccionada para un nuevo mensaje//
    const [selectedImage, setSelectedImage] = React.useState(null)

    //Estado para mostrar una vista previa de la imagen seleccionada//
    const [imagePreview, setImagePreview] = React.useState(null)

    //Obtiene la lista completa de usuarios registrados//
    const users = getUsers()

    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Busca y obtiene los datos del usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Efecto secundario para cerrar el menú al hacer clic fuera de él//
    React.useEffect(() => {
        //Función que maneja el clic fuera del menú//
        const handleClickOutside = (e) => {
            //Verifica si el clic fue fuera del menú y sus botones//
            if (showMenu && !e.target.closest('.menuButton') && !e.target.closest('.menuDropContainer')) {
                setShowMenu(false) //Cierra el menú//
            }
        }

        //Agrega el event listener al documento//
        document.addEventListener('click', handleClickOutside)

        //Función de limpieza que remueve el event listener al desmontar el componente//
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showMenu]) //Dependencia: solo se ejecuta cuando showMenu cambia//

    //Maneja el cambio de imagen seleccionada en el formulario//
    const handleImageChange = (e) => {
        const file = e.target.files[0] //Obtiene el archivo seleccionado//
        if (file) {
            setSelectedImage(file) //Guarda el archivo en el estado//

            //Crea un FileReader para leer la imagen//
            const reader = new FileReader()

            //Define qué hacer cuando se complete la lectura//
            reader.onload = () => {
                setImagePreview(reader.result) //Guarda la vista previa como URL de datos//
            }

            //Lee el archivo como URL de datos//
            reader.readAsDataURL(file)
        }
    }

    //Elimina la imagen seleccionada del formulario//
    const removeImage = () => {
        setSelectedImage(null) //Limpia la imagen seleccionada//
        setImagePreview(null) //Limpia la vista previa//
        document.getElementById('image-upload').value = '' //Resetea el input de archivo//
    }

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

    //Maneja el envío del formulario de nuevo mensaje//
    const handleSubmitMessage = (e) => {
        e.preventDefault() //Previene el comportamiento por defecto del formulario//

        //Obtiene los valores del formulario//
        const title = e.target.title.value
        const msg = e.target.msg.value

        //Valida el título del mensaje//
        if (!validateTitle(title)) {
            createModal('Title cannot exceed 5 words') //Muestra error//
            return //Detiene la ejecución//
        }

        //Valida el contenido del mensaje//
        if (!validateTextarea(msg)) {
            createModal('Message cannot exceed 100 words') //Muestra error//
            return //Detiene la ejecución//
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
                createModal('Message stored successfully!') //Muestra confirmación//
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

    //Resetea el formulario a su estado inicial//
    const resetForm = () => {
        setMessages(getMessages()) //Actualiza los mensajes//
        setSelectedImage(null) //Limpia la imagen seleccionada//
        setImagePreview(null) //Limpia la vista previa//
        document.getElementById('sendMsgForm').reset() //Resetea el formulario//
        setShowMsgForm(false) //Oculta el formulario//
    }

    //Maneja el cierre de sesión del usuario//
    const handleLogout = () => {
        sessionStorage.removeItem('id') //Elimina el ID de sessionStorage//
        localStorage.removeItem('id') //Elimina el ID de localStorage//
        navigation.navigateToLogin() //Redirige a la página de login//
    }

    //Redirige a login si no hay usuario logueado//
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

                    {/* Botón para mostrar/ocultar el formulario de mensaje */}
                    <button
                        className="toggleSendMsgFormButton"
                        onClick={() => setShowMsgForm(!showMsgForm)}
                    >
                        {showMsgForm ? 'Hide Form' : 'New Post'}
                    </button>
                </div>

                {/* Mensaje de bienvenida con nombre de usuario */}
                <h1 className="homeMsg">Welcome, {(loggedUser && loggedUser.userName) || 'User'}</h1>

                {/* Botón y menú desplegable del usuario */}
                <button
                    className={`menuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
                    onClick={() => setShowMenu(!showMenu)}
                    aria-expanded={showMenu}
                    aria-label="User menu"
                >
                    <div className="menuButton-content">
                        {/* Muestra avatar o inicial del usuario */}
                        {loggedUser?.avatar ? (
                            <img
                                src={loggedUser.avatar}
                                className="menuButton-avatar"
                                alt="User avatar"
                            />
                        ) : (
                            <span className="menuButton-initial">
                                {(loggedUser && loggedUser.userName && loggedUser.userName[0].toUpperCase()) || 'U'}
                            </span>
                        )}
                    </div>
                </button>

                {/* Menú desplegable cuando está visible */}
                {showMenu && (
                    <div className="menuDropContainer">
                        {/* Botón para ir al perfil */}
                        <button className="profileButton" onClick={() => navigation.navigateToProfile()}>
                            <i className="fas fa-user"></i> Profile
                        </button>

                        {/* Botón de configuración (no implementado) */}
                        <button className="settingsButton" onClick={() => createModal('Settings page not implemented')}>
                            <i className="fas fa-cog"></i> Settings
                        </button>

                        {/* Botón para cerrar sesión */}
                        <button className="logoutButton" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Contenedor principal de contenido */}
            <div className="msgContainer">
                {/* Formulario para nuevo mensaje (solo visible cuando showMsgForm es true) */}
                {showMsgForm && (
                    <form id="sendMsgForm" className="sendMsgForm" onSubmit={handleSubmitMessage}>
                        {/* Input para el título del mensaje */}
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter your title"
                            required
                            name="title"
                        />

                        {/* Textarea para el contenido del mensaje */}
                        <textarea
                            id="msg"
                            className="textarea"
                            placeholder="Enter your message"
                            required
                            name="msg"
                        ></textarea>

                        {/* Sección para manejar imágenes */}
                        <div className="optimized-image-section">
                            <div className="image-controls-row">
                                {/* Label estilizado para el input de archivo */}
                                <label htmlFor="image-upload" className="image-upload-label">
                                    <i className="fas fa-image"></i> {selectedImage ? 'Change Image' : 'Add Image'}
                                </label>

                                {/* Input real para subir archivos (oculto) */}
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />

                                {/* Botón para remover imagen (solo visible cuando hay imagen) */}
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

                            {/* Muestra el nombre del archivo seleccionado */}
                            {selectedImage && (
                                <div className="compact-image-info">
                                    <span className="image-filename">{selectedImage.name}</span>
                                </div>
                            )}

                            {/* Muestra la vista previa de la imagen seleccionada */}
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

                        {/* Botón para enviar el mensaje */}
                        <input type="submit" value="Post Message" />
                    </form>
                )}

                {/* Contenedor de mensajes existentes */}
                <div className={`userMsgForm ${showMsgForm ? 'with-form' : 'centered'}`}>
                    <div className="userMsgContainer">
                        {/* Mapea todos los mensajes para mostrarlos */}
                        {messages.map((message) => {
                            //Encuentra el autor del mensaje actual//
                            const author = users.find(u => u.id === message.userId)

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

                            //Renderiza cada mensaje//
                            return (
                                <div key={message.date} className="message">
                                    {/* Muestra información del autor */}
                                    <div className="message-user">User: {(author && author.userName) || 'Unknown'}</div>

                                    {/* Muestra título del mensaje */}
                                    <div className="message-title">Title: {message.title}</div>

                                    {/* Muestra contenido del mensaje */}
                                    <div className="message-text">Message: {message.msg}</div>

                                    {/* Muestra imagen adjunta si existe */}
                                    {message.image && (
                                        <div className="message-image-container">
                                            <img
                                                src={message.image}
                                                alt="User uploaded content"
                                                className="message-image"
                                            />
                                        </div>
                                    )}

                                    {/* Muestra fecha del mensaje */}
                                    <div className="message-date">Date: {message.date}</div>

                                    {/* Contenedor de acciones (like/dislike) */}
                                    <div className="message-actions">
                                        {/* Contenedor y botón de like */}
                                        <div className="like-container">
                                            <button
                                                className="like-button"
                                                onClick={() => handleLike(message.date)}
                                                aria-label="Like"
                                            >
                                                {/* Icono de like (lleno o vacío según estado) */}
                                                <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>

                                                {/* Contador de likes */}
                                                <span className="message-likes">({likesCount})</span>
                                            </button>

                                            {/* Tooltip con nombres de usuarios que dieron like */}
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

                                        {/* Contenedor y botón de dislike */}
                                        <div className="dislike-container">
                                            <button
                                                className="dislike-button"
                                                onClick={() => handleDislike(message.date)}
                                                aria-label="Dislike"
                                            >
                                                {/* Icono de dislike (lleno o vacío según estado) */}
                                                <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>

                                                {/* Contador de dislikes */}
                                                <span className="message-dislikes">({dislikesCount})</span>
                                            </button>

                                            {/* Tooltip con nombres de usuarios que dieron dislike */}
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

//Exporta el componente como exportación por defecto//
export default HomePage