//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa función useState para crear estados//
import { useState, useEffect } from 'react'
//Importa getUsers//
import { getUsers } from '../logic/getUsers.js'
//Importa getLoggedUserId//
import { getLoggedUserId } from '../logic/getLoggedUserId.js' 
//Importa getMessages//
import { getMessages } from '../logic/getMessages.js'
//Importa deleteMessage//
import { deleteMessage } from '../logic/deleteMessage.js'
//Importa handleLogout//
import { handleLogout } from '../logic/handleLogout.js'
//Importa el componenete Header específico para messages//
import MessagesHeader from '../components/MessagesHeader'
//Importa el componenete MessageList específico para messages//
import MessagesMessageList from '../components/MessagesMessageList'
//Importa el componenete UserInfoSection específico para messages//
import MessagesUserInfoSection from '../components/MessagesUserInfoSection'
//Importa createModal//
import { createModal } from '../utils/createModal.js' 
//Importa los estilos CSS para este componente//
import '../styles/pages/messagesPage.css'

//Define el componente funcional MessagesPage que recibe props de navegación//
const MessagesPage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú desplegable del usuario//
    const [showMenu, setShowMenu] = useState(false)

    //Estado para almacenar y actualizar la lista de mensajes//
    const [messages, setMessages] = useState(getMessages())

    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Obtiene la lista completa de usuarios registrados//
    const users = getUsers()

    //Busca y obtiene los datos del usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Filtra los mensajes para obtener solo los del usuario logueado//
    const userMessages = messages.filter(message => message.userId === loggedUserId)

    //Efecto para cerrar el menú al hacer clic fuera de él//
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

    //Efecto para redirigir a login si no hay usuario logueado//
    useEffect(() => {
        if (!loggedUser) {
            navigation.navigateToLogin()
        }
    }, [loggedUser, navigation])

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

    //Maneja el logout del usuario//
    const onLogout = () => {
        //Ejecuta el handler de logout que limpia los datos de sesión//
        handleLogout()
        //Navega a la página de login usando la función de navegación proporcionada//
        navigation.navigateToLogin()
    }

    //Renderiza el componente principal de la página de mensajes//
    return (
        //Contenedor principal de la página de mensajes//
        <div className="messagesPageContainer">
            {/* Componente del encabezado de mensajes que recibe props:
                - loggedUser: usuario actualmente logueado
                - navigation: objeto para manejar navegación
                - onLogout: función para cerrar sesión
                - setShowMenu: función para controlar visibilidad del menú
                - showMenu: estado que indica si el menú está visible */}
            <MessagesHeader 
                loggedUser={loggedUser}
                navigation={navigation}
                onLogout={onLogout}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
            />

            {/* Contenedor del formulario/área de mensajes */}
            <div className="messagesFormContainer">
                {/* Formulario de mensajes propiamente dicho */}
                <div className="messagesForm">
                    {/* Sección de información del usuario logueado */}
                    <MessagesUserInfoSection loggedUser={loggedUser} />
                    
                    {/* Componente que muestra la lista de mensajes, recibe props:
                        - userMessages: array con los mensajes del usuario
                        - users: información de usuarios relacionados
                        - handleDelete: función para eliminar mensajes */}
                    <MessagesMessageList 
                        userMessages={userMessages} 
                        users={users}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

//Exporta el componente como exportación por defecto//
export default MessagesPage