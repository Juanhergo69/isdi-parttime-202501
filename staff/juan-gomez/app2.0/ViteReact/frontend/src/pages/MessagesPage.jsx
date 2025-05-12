//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa función useState para crear estados//
import { useState, useEffect } from 'react'
//Importa useModal//
import { useModal } from '../components/ModalContext.jsx'
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
//Importa los estilos CSS para este componente//
import '../styles/pages/messagesPage.css'

//Define el componente funcional MessagesPage que recibe props de navegación//
const MessagesPage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú desplegable del usuario//
    const [showMenu, setShowMenu] = useState(false)
    //Estado para almacenar y actualizar la lista de mensajes//
    const [messages, setMessages] = useState([])
    //Estado para almacenar los usuarios//
    const [users, setUsers] = useState([])
    //Obtenemos la función para crear modales//
    const { createModal } = useModal()
    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Efecto para cargar datos inciciales//
    //Efecto para cargar datos iniciales//
    useEffect(() => {
        //Promise.all permite ejecutar múltiples promesas en paralelo y esperar a que todas se resuelvan//
        Promise.all([getMessages(), getUsers()])
            //Cuando ambas promesas se resuelven, se reciben los datos en un array
            .then(([messagesData, usersData]) => {
                //Actualiza el estado de messages con los datos obtenidos de getMessages()//
                setMessages(messagesData)
                //Actualiza el estado de users con los datos obtenidos de getUsers()//
                setUsers(usersData)

                //Busca el usuario logueado en el array de usuarios//
                //Nota: Se convierte loggedUserId a string porque el backend almacena IDs como strings//
                const loggedUser = usersData.find(user => user.id === loggedUserId.toString())
                //Si no se encuentra el usuario logueado, redirige a la pantalla de login//
                if (!loggedUser) {
                    navigation.navigateToLogin()
                }
            })
            //Manejo de errores si alguna de las promesas falla//
            .catch(error => {
                //Muestra un modal de error al usuario//
                createModal('Failed to load data. Please try again later.')
                //Registra el error en la consola para debugging//
                console.error('Error loading data:', error)
            })
        //Dependencias del efecto: se volverá a ejecutar cuando cualquiera de estas cambie//
    }, [loggedUserId, navigation, createModal])

    //Filtra los mensajes para obtener solo los del usuario logueado//
    const userMessages = messages.filter(message => message.userId === loggedUserId.toString())

    //Efecto para cerrar el menú al hacer clic fuera de él//
    useEffect(() => {
        //Función que maneja el clic fuera del menú//
        const handleClickOutside = (e) => {
            //Verifica si el clic fue fuera del menú y sus botones//
            if (showMenu && !e.target.closest('.messagesMenuButton') && !e.target.closest('.messagesMenuDropContainer')) {
                //Cierra el menú//
                setShowMenu(false)
            }
        }
        //Agrega el event listener al documento//
        document.addEventListener('click', handleClickOutside)
        //Función de limpieza que remueve el event listener al desmontar el componente//
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showMenu]) //Dependencia: solo se ejecuta cuando showMenu cambia//

    //Función para manejar la eliminación de un mensaje (recibe date como parámetro)//
    const handleDelete = (date) => {
        //Muestra un modal de confirmación con los siguientes parámetros://
        createModal(
            //1. Mensaje de confirmación que se mostrará al usuario//
            'Are you sure you want to delete this message?',
            //2. Función callback que se ejecutará si el usuario confirma//
            () => {
                //Llama a la función deleteMessage pasando la fecha del mensaje a eliminar//
                deleteMessage(date)
                    //Si la eliminación es exitosa, obtiene la lista actualizada de mensajes//
                    .then(() => {
                        return getMessages()
                    })
                    //Con la lista actualizada de mensajes://
                    .then(updatedMessages => {
                        //Actualiza el estado de los mensajes con la nueva lista//
                        setMessages(updatedMessages)
                        //Muestra un modal de éxito//
                        createModal('Message deleted successfully!')
                    })
                    //Manejo de errores//
                    .catch(error => {
                        //Registra el error en la consola para depuración//
                        console.error('Delete error:', error);
                        //Muestra un modal con el mensaje de error específico//
                        createModal(`Error deleting message: ${error.message}`)
                    })
            },

            //3. Título del modal de confirmación//
            'Confirm Deletion',

            //4. Flag que indica si el modal debe mostrar botones de confirmación/cancelar//
            true
        )
    }

    //Obtenemos al usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId.toString());


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