//Importa la biblioteca React para crear componentes//
import React from 'react'

//Importa funciones utilitarias específicas desde el archivo utils//
import {
    getUsers,          //Obtiene lista de usuarios//
    getMessages,       //Obtiene todos los mensajes//
    createModal        //Crea modales de notificación//
} from '../utils/utils'

//Importa estilos CSS//
import '../index.css'


//Define el componente funcional Bio que recibe props de navegación y userName//
const Bio = ({ navigation, userName }) => {
    //Obtiene la lista completa de usuarios registrados//
    const users = getUsers()

    //Busca el usuario cuyo perfil se está viendo//
    const viewedUser = users.find(user => user.userName === userName)

    //Obtiene todos los mensajes almacenados//
    const allMessages = getMessages()

    //Filtra los mensajes para obtener solo los del usuario visto//
    const userMessages = allMessages.filter(message => {
        const messageAuthor = users.find(user => user.id === message.userId)
        return messageAuthor && messageAuthor.userName === userName
    })

    //Si no se encontró el usuario, muestra mensaje y redirige//
    if (!viewedUser) {
        createModal('User not found', () => navigation.navigateToHome())
        return null
    }

    //Renderizado del componente//
    return (
        <div className="bioPageContainer">
            {/* Encabezado de la página */}
            <div className="bioHeaderContainer">
                {/* Contenedor del logo */}
                <div className="homeImgContainer">
                    <img src="/Logo.jpg" className="homeImg" alt="Logo" />
                </div>

                {/* Título de la página */}
                <h1 className="homeMsg">User Profile</h1>

                {/* Botón para volver al home */}
                <button
                    className="menuButton back-button"
                    onClick={() => navigation.navigateToHome()}
                    aria-label="Back to home"
                >
                    <div className="menuButton-content">
                        <i className="fas fa-arrow-left"></i>
                    </div>
                </button>
            </div>

            {/* Contenedor principal del perfil */}
            <div className="bioFormContainer">
                {/* Formulario estilo userMsgForm */}
                <div className="bioForm">
                    {/* Sección de información del usuario */}
                    <div className="user-info-section">
                        {/* Avatar o inicial del usuario */}
                        <div className="user-avatar">
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
                                //Renderiza cada mensaje del usuario//
                                return (
                                    <div key={message.date} className="message">
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
                                    </div>
                                )
                            })
                        ) : (
                            <div className="no-messages">This user hasn't posted any messages yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

//Exporta el componente como exportación por defecto//
export default Bio