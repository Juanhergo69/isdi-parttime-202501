//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'
//Importa el componente useParams de react-router-dom para navegación//
import { useParams } from 'react-router-dom'
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
//Importa el componenete Header específico para bio//
import BioHeader from '../components/BioHeader'
//Importa el componenete MessageList específico para bio//
import BioMessageList from '../components/BioMessageList'
//Importa el componenete UserInfoSection específico para bio//
import BioUserInfoSection from '../components/BioUserInfoSection'
//Importa estilos CSS//
import '../styles/pages/bioPage.css'

//Define el componente funcional Bio que recibe props de navegación//
const BioPage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú desplegable del usuario//
    const [showMenu, setShowMenu] = useState(false)

    //Estado para almacenar y actualizar la lista de mensajes//
    const [messages, setMessages] = useState(getMessages())

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

    //Redirigir inmediatamente a NotFoundPage si no existe el usuario//
    if (!viewedUser) {
        navigation.navigateToNotFound()
        return null 
    }    
   
    //Efecto para cerrar el menú al hacer clic fuera de él//
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

   // Inicio del return que renderiza el componente
    return (
        // Contenedor principal de la página de biografía con clase CSS para estilos
        <div className="bioPageContainer">
        
            {/* Componente BioHeader (encabezado de la página) que recibe:
            - loggedUser: Objeto con datos del usuario logueado
            - navigation: Funciones para manejar navegación entre páginas
            - onLogout: Función que ejecuta el cierre de sesión
            - setShowMenu: Función para mostrar/ocultar el menú desplegable
            - showMenu: Estado booleano que controla la visibilidad del menú */}
            <BioHeader 
                loggedUser={loggedUser}
                navigation={navigation}
                onLogout={onLogout}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
            />

            {/* Contenedor secundario para el área de contenido principal */}
            <div className="bioFormContainer">
                {/* Contenedor interno del formulario de biografía */}
                <div className="bioForm">
                
                    {/* Componente BioUserInfoSection que muestra:
                    - viewedUser: Información del usuario cuyo perfil se está viendo */}
                    <BioUserInfoSection viewedUser={viewedUser} />
                
                    {/* Componente BioMessageList que muestra la lista de mensajes y recibe:
                    - messages: Array con todos los mensajes disponibles
                    - users: Array con información de los usuarios
                    - userName: Nombre del usuario del perfil actual
                    - loggedUserId: ID del usuario logueado
                    - onLike: Función para manejar "me gusta" en mensajes
                    - onDislike: Función para manejar "no me gusta" en mensajes
                    - onFavorite: Función para manejar mensajes favoritos */}
                    <BioMessageList 
                    messages={messages}
                    users={users}
                    userName={userName}
                    loggedUserId={loggedUserId}
                    onLike={onLike}
                    onDislike={onDislike}
                    onFavorite={onFavorite}
                    />

                </div>
            </div>
        </div>
    )
}

//Exporta el componente como exportación por defecto//
export default BioPage