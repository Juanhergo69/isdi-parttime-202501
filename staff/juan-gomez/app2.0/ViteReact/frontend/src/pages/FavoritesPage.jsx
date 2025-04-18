//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'
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
//Importa el componenete Header específico para favorites//
import FavoritesHeader from '../components/FavoritesHeader'
//Importa el componenete MessageList específico para favorites//
import FavoritesMessageList from '../components/FavoritesMessageList'
//Importa el componenete UserInfoSection específico para favorites//
import FavoritesUserInfoSection from '../components/FavoritesUserInfoSection';
//Importa estilos CSS//
import '../styles/pages/favoritesPage.css'

//Define el componente funcional FavoritesPage que recibe props de navegación//
const FavoritesPage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú desplegable del usuario//
    const [showMenu, setShowMenu] = useState(false)

    //Estado para almacenar y actualizar la lista de mensajes//
    const [messages, setMessages] = useState(getMessages())

    //Obtiene la lista completa de usuarios registrados//
    const users = getUsers()

    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Busca el usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Filtra los mensajes para obtener solo los favoritos del usuario logueado//
    const favoriteMessages = messages.filter(message =>
        message.favorite && message.favorite.includes(loggedUserId)
    )

     //Efecto para redirigir a login si no hay usuario logueado//
     useEffect(() => {
        if (!loggedUser) {
            navigation.navigateToLogin()
        }
    }, [loggedUser, navigation])

    //Efecto para cerrar el menú al hacer clic fuera de él//
    useEffect(() => {
        //Función que maneja el clic fuera del menú//
        const handleClickOutside = (e) => {
            //Verifica si el clic fue fuera del menú y sus botones//
            if (showMenu && !e.target.closest('.favoriteMenuButton') && !e.target.closest('.favoriteMenuDropContainer')) {
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

    //Renderiza el componente principal de la página de favoritos//
    return (
        //Contenedor principal de la página de favoritos//
        <div className="favoritePageContainer">
            {/* Componente del encabezado que recibe props:
                - loggedUser: datos del usuario logueado
                - navigation: funciones de navegación
                - onLogout: función para cerrar sesión
                - setShowMenu: controla visibilidad del menú desplegable
                - showMenu: estado actual del menú (visible/oculto) */}
            <FavoritesHeader 
                loggedUser={loggedUser}
                navigation={navigation}
                onLogout={onLogout}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
            />

            {/* Contenedor del formulario/área de favoritos */}
            <div className="favoriteFormContainer">
                {/* Formulario interno de favoritos */}
                <div className="favoriteForm">
                    {/* Componente de información del usuario que recibe:
                        - loggedUser: datos del usuario
                        - classNamePrefix: prefijo para clases CSS personalizadas */}
                    <FavoritesUserInfoSection 
                        loggedUser={loggedUser} 
                        classNamePrefix="favorite"
                    />
                    
                    {/* Componente de lista de mensajes favoritos que recibe props:
                        - favoriteMessages: array de mensajes marcados como favoritos
                        - users: lista de usuarios para mostrar información relacionada
                        - loggedUserId: ID del usuario actual para controles personalizados
                        - onLike: función para manejar likes
                        - onDislike: función para manejar dislikes
                        - onFavorite: función para gestionar favoritos
                        - navigation: objeto para manejar navegación */}
                    <FavoritesMessageList 
                        favoriteMessages={favoriteMessages}
                        users={users}
                        loggedUserId={loggedUserId}
                        onLike={onLike}
                        onDislike={onDislike}
                        onFavorite={onFavorite}
                        navigation={navigation}
                    />
                </div>
            </div>
        </div>
    )
}

//Exporta el componente como exportación por defecto//
export default FavoritesPage