//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'
//Importa useModal//
import { useModal } from '../components/ModalContext.jsx'
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
import { handleDislike } from '../logic/handleDislike.js'
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
    const [messages, setMessages] = useState([])
    //Estado para almacenar los usuarios//
    const [users, setUsers] = useState([])
    //Estado para almacenar el usuario concreto de bio//
    const [retrievedUser, setRetrievedUser] = useState()
    //Estado para cargar los mensajes del usuario concreto de bio//
    const [userMessages, setUserMessages] = useState()
    //Obtenemos la función para mostrar modales//
    const { createModal } = useModal()
    //Obtiene el parámetro userName de la URL//
    const { userName } = useParams()
    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Efecto para cargar datos iniciales//
    useEffect(() => {
        //Realiza ambas peticiones (mensajes y usuarios) en paralelo//
        Promise.all([getMessages(), getUsers()])
            .then(([messagesData, usersData]) => {
                setMessages(messagesData)       //Actualiza el estado de los mensajes recibidos//
                setUsers(usersData)             //Actualiza el estado de los usuarios recibidos//
                const viewedUser = usersData.find(user => user.userName === userName) //Busca el usuario específico que coincide con el userName de la URL//
                setRetrievedUser(viewedUser)    //Guarda el usuario encontrado (o undefined) en el estado//   

                //Si se encontró el usuario, filtra sus mensajes//
                if (viewedUser) {
                    const _userMessages = messagesData.filter(message =>
                        message.userId === viewedUser.id
                    )
                    setUserMessages(_userMessages) //Actualiza el estado de los mensajes de usuario//
                }

                //Busca el usuario logueado actual (convertido a string por compatibilidad)//
                const loggedUser = usersData.find(user => user.id === loggedUserId.toString())
                if (!loggedUser) {                 //Si no hay usuario logueado//
                    navigation.navigateToLogin()   //Redirige a login//
                }
                if (!viewedUser) {                  //Si no se encontró el usuario de la bio//
                    navigation.navigateToNotFound() //Redirige a notfound//
                }
            })
            .catch(error => {  //Muestra un modal de error si falla la carga de datos//
                createModal('Failed to load data. Please try again later.')
                console.error('Error loading data:', error)
            })
    }, [loggedUserId, navigation, createModal, userName]) //Dependencias del efecto//

    //Busca y obtiene los datos del usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId.toString())

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
        handleLike(messageId, loggedUserId.toString())                  //Ejecuta handleLike con el ID del mensaje y del usuario//
            .then(updatedMessages => {
                setMessages(updatedMessages)                            //Actualiza todos los mensajes con la nueva información//
                const _userMessages = updatedMessages.filter(message => //Filtra solo los mensajes del usuario actual y actualiza el estado//
                    message.userId === retrievedUser.id
                )
                setUserMessages(_userMessages)                          //Actualiza los mensajes del usuario//
            })
            .catch(error => {
                createModal('Failed to like message')
                console.error('Like error:', error)
            })
    }

    //Maneja el dislike a un mensaje//
    const onDislike = (messageId) => {
        handleDislike(messageId, loggedUserId.toString())               //Ejecuta handleDislike con el ID del mensaje y del usuario//
            .then(updatedMessages => {
                setMessages(updatedMessages)                            //Actualiza todos los mensajes con la nueva información//
                const _userMessages = updatedMessages.filter(message => //Filtra solo los mensajes del usuario actual y actualiza el estado//
                    message.userId === retrievedUser.id
                )
                setUserMessages(_userMessages)                          //Actualiza los mensajes del usuario//
            })
            .catch(error => {
                createModal('Failed to dislike message')
                console.error('Dislike error:', error)
            })
    }

    //Maneja el favorito de un mensaje//
    const onFavorite = (messageId) => {
        handleFavorite(messageId, loggedUserId.toString())              //Ejecuta handleFavorite con el ID del mensaje y del usuario//
            .then(updatedMessages => {
                setMessages(updatedMessages)                            //Actualiza todos los mensajes con la nueva información//
                const _userMessages = updatedMessages.filter(message => //Filtra solo los mensajes del usuario actual y actualiza el estado//
                    message.userId === retrievedUser.id
                )
                setUserMessages(_userMessages)                          //Actualiza los mensajes del usuario//
            })
            .catch(error => {
                createModal('Failed to favorite message')
                console.error('Favorite error:', error)
            })
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

                    {/* Muestra la sección de info del usuario solo si retrievedUser existe */}
                    {retrievedUser && <BioUserInfoSection viewedUser={retrievedUser} />}

                    {/* Componente BioMessageList que muestra la lista de mensajes solo si userMessage existe y recibe:
                    - messages: Array con todos los mensajes disponibles
                    - users: Array con información de los usuarios
                    - userName: Nombre del usuario del perfil actual
                    - loggedUserId: ID del usuario logueado
                    - onLike: Función para manejar "me gusta" en mensajes
                    - onDislike: Función para manejar "no me gusta" en mensajes
                    - onFavorite: Función para manejar mensajes favoritos */}
                    {userMessages && <BioMessageList
                        messages={userMessages}
                        users={users}
                        userName={userName}
                        loggedUserId={loggedUserId}
                        onLike={onLike}
                        onDislike={onDislike}
                        onFavorite={onFavorite}
                    />}

                </div>
            </div>
        </div>
    )
}

//Exporta el componente como exportación por defecto//
export default BioPage