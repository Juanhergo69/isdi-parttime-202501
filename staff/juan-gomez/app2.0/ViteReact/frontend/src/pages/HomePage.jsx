//Importa la librería React//
import React from 'react'
//Importa los hooks useState y useEffect de React//
import { useState, useEffect } from 'react'
//Importa useModal para manejar renderizados de modales según context provider de React//
import { useModal } from '../components/ModalContext'
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
//Importa el componente Header específico para home//
import HomeHeader from '../components/HomeHeader'
//Importa el componente MessageForm específico para home//
import HomeMessageForm from '../components/HomeMessageForm'
//Importa el componenete MessageItem específico para home//
import HomeMessageItem from '../components/HomeMessageItem'
//Importa los estilos CSS para esta página//
import '../styles/pages/homePage.css'

//Define el componente HomePage que recibe la prop navigation//
const HomePage = ({ navigation }) => {
    //Estado para controlar la visibilidad del menú de usuario//
    const [showMenu, setShowMenu] = useState(false)
    //Estado para controlar la visibilidad del formulario de mensajes//
    const [showMsgForm, setShowMsgForm] = useState(false)
    //Estado para almacenar la lista de mensajes//
    const [messages, setMessages] = useState([])
    //Estado para almacenar la imagen seleccionada//
    const [selectedImage, setSelectedImage] = useState(null)
    //Estado para almacenar la previsualización de la imagen
    const [imagePreview, setImagePreview] = useState(null)
    //Estado para almacenar los usuarios//
    const [users, setUsers] = useState([])
    //Obtenemos la función para mostrar modales//
    const { createModal } = useModal()
    //Obtiene el ID del usuario logueado//
    const loggedUserId = getLoggedUserId()


    //Efecto para cargar datos inciciales//
    useEffect(() => {
        //Ejecuta dos promesas en paralelo: `getMessages()` (obtiene mensajes) y `getUsers()` (obtiene usuarios)//
        Promise.all([getMessages(), getUsers()])
            // Cuando ambas promesas se completan, recibe sus resultados como un array destructurado
            .then(([messagesData, usersData]) => {
                //Actualiza el estado `messages` con los datos de mensajes obtenidos (`messagesData`)//
                setMessages(messagesData)
                //Actualiza el estado `users` con los datos de usuarios obtenidos (`usersData`)//
                setUsers(usersData)

                //Busca al usuario actual en el array `usersData` comparando su ID (convertido a string para compatibilidad con el backend)//
                const loggedUser = usersData.find(user => user.id === loggedUserId.toString())
                //Si no se encuentra al usuario logueado//
                if (!loggedUser) {
                    //Redirige al usuario a la pantalla de login usando el método `navigateToLogin` del objeto `navigation`//
                    navigation.navigateToLogin()
                }
            })
            //Si alguna de las promesas falla (error de red, servidor caído, etc.)//
            .catch(error => {
                //Muestra un modal de error al usuario con un mensaje genérico//
                createModal('Failed to load data. Please try again later.')
                //Registra el error en la consola para debugging (detalla el problema real)//
                console.error('Error loading data:', error)
            })
    }, [loggedUserId, navigation, createModal]) //Dependencias//

    //Efecto secundario para cerrar el menú al hacer clic fuera de él//
    useEffect(() => {
        //Función que maneja el clic fuera del menú//
        const handleClickOutside = (e) => {
            //Verifica si el clic fue fuera del menú y sus botones//
            if (showMenu && !e.target.closest('.homeMenuButton') && !e.target.closest('.homeMenuDropContainer')) {
                setShowMenu(false) //Cierra el menú//
            }
        }

        //Agrega el event listener al documento//
        document.addEventListener('click', handleClickOutside)

        //Función de limpieza que remueve el event listener al desmontar el componente//
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
        //Llama a la función `handleLike` pasándole el `messageId` y el `loggedUserId` (convertido a string por compatibilidad)//
        handleLike(messageId, loggedUserId.toString())
            //Si la promesa se resuelve correctamente, recibe los `updatedMessages` (mensajes actualizados)//
            .then(updatedMessages => {
                //Actualiza el estado de `messages` con los nuevos mensajes (incluyendo el like recién hecho)//
                setMessages(updatedMessages)
            })
            //Si ocurre un error al dar like, entra en el bloque `catch`//
            .catch(error => {
                //Muestra un modal de error indicando que falló la acción de dar like//
                createModal('Failed to like message')
                //Imprime el error en consola para depuración//
                console.error('Like error:', error)
            })
    }

    //Maneja el dislike a un mensaje//
    const onDislike = (messageId) => {
        //Llama a la función `handleDislike` pasándole el `messageId` y el `loggedUserId` (convertido a string por compatibilidad)//
        handleDislike(messageId, loggedUserId.toString())
            //Si la promesa se resuelve correctamente, recibe los `updatedMessages` (mensajes actualizados)//
            .then(updatedMessages => {
                //Actualiza el estado de `messages` con los nuevos mensajes (incluyendo el dislike recién hecho)//
                setMessages(updatedMessages)
            })
            //Si ocurre un error al dar dislike, entra en el bloque `catch`//
            .catch(error => {
                //Muestra un modal de error indicando que falló la acción de dar dislike//
                createModal('Failed to dislike message')
                //Imprime el error en consola para depuración//
                console.error('Dislike error:', error)
            })
    }

    //Maneja el favorito de un mensaje//
    const onFavorite = (messageId) => {
        //Llama a la función `handleFavorite` pasándole el `messageId` y el `loggedUserId` (convertido a string por compatibilidad)//
        handleFavorite(messageId, loggedUserId.toString())
            //Si la promesa se resuelve correctamente, recibe los `updatedMessages` (mensajes actualizados)//
            .then(updatedMessages => {
                //Actualiza el estado de `messages` con los nuevos mensajes (incluyendo el favorito recién hecho)//
                setMessages(updatedMessages)
            })
            //Si ocurre un error al dar favorito, entra en el bloque `catch`//
            .catch(error => {
                //Muestra un modal de error indicando que falló la acción de dar favorito//
                createModal('Failed to favorite message')
                //Imprime el error en consola para depuración//
                console.error('Favorite error:', error)
            })
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

        //Ejecuta la función `handleSubmitMessage` para enviar un nuevo mensaje, pasándole los siguientes parámetros://
        //- formData: Los datos del formulario (texto del mensaje)//
        //- loggedUserId: El ID del usuario que envía el mensaje (convertido a string si es necesario)//
        //- selectedImage: La imagen adjunta (si existe)//
        //- Una función callback que se ejecutará cuando el servidor responda//
        handleSubmitMessage(formData, loggedUserId, selectedImage, (result) => {
            //Verifica si el resultado del envío fue exitoso (result.success === true)//
            if (result.success) {
                //Muestra un modal de éxito con el mensaje de confirmación (result.message)//
                createModal(result.message)
                //Resetea el formulario a sus valores iniciales (limpia los campos)//
                resetForm()
                //------ Recarga los mensajes después de enviar uno nuevo------//
                //Vuelve a llamar a getMessages() para obtener la lista actualizada//
                getMessages()
                    //Si la carga es exitosa, actualiza el estado con los nuevos mensajes//
                    .then(newMessages => setMessages(newMessages))
                    //Si falla, muestra el error en consola (pero no interrumpe el flujo)//
                    .catch(error => console.error('Error reloading messages:', error))
            } else {
                //Si el envío falló (result.success === false), muestra un modal con el error//
                createModal(result.error)
            }
        })
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

    //Obtenemos al usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId.toString());

    //Retorna la estructura JSX del componenete//
    return (
        //Contenedor principal de la página con clase CSS//
        <div className="homePageContainer">
            {/* Componente HomeHeader que muestra:
                - Logo 
                - Botón de nuevo post
                - Menú de usuario
                - Información del usuario logueado */}
            <HomeHeader
                loggedUser={loggedUser}       //Objeto con datos del usuario logueado//
                navigation={navigation}       //Objeto de navegación entre páginas//
                onLogout={onLogout}           //Función para cerrar sesión//
                setShowMsgForm={setShowMsgForm} //Función para mostrar/ocultar formulario//
                showMsgForm={showMsgForm}     //Estado que controla visibilidad del formulario//
                setShowMenu={setShowMenu}     //Función para mostrar/ocultar menú usuario//
                showMenu={showMenu}           //Estado que controla visibilidad del menú//
            />

            {/* Contenedor principal de los mensajes */}
            <div className="homeMsgContainer">
                {/* Render condicional del formulario para crear mensajes */}
                {showMsgForm && (
                    <HomeMessageForm
                        onSubmitMessage={onSubmitMessage} //Función para enviar mensaje//
                        selectedImage={selectedImage}     //Imagen seleccionada para adjuntar//
                        onImageChange={onImageChange}     //Función para manejar cambio de imagen//
                        removeImage={removeImage}         //Función para eliminar imagen seleccionada//
                        imagePreview={imagePreview}       //URL de previsualización de la imagen//
                    />
                )}

                {/* Contenedor de los mensajes de los usuarios con clase condicional:
                    - 'with-form' cuando el formulario está visible
                    - 'centered' cuando el formulario está oculto */}
                <div className={`homeUserMsgForm ${showMsgForm ? 'with-form' : 'centered'}`}>
                    {/* Contenedor interno de mensajes */}
                    <div className="homeUserMsgContainer">
                        {/* Mapeo de todos los mensajes para renderizarlos */}
                        {Array.isArray(messages) && messages.map((message) => {
                            //Busca el autor del mensaje actual en el array de usuarios//
                            const author = users.find(u => u.id === message.userId)

                            //Para cada mensaje, renderiza el componente HomeMessageItem//
                            return (
                                <HomeMessageItem
                                    key={message.date}       //Key única basada en la fecha//
                                    message={message}        //Objeto con datos del mensaje//
                                    author={author}          //Objeto con datos del autor//
                                    navigation={navigation}  //Objeto de navegación//
                                    loggedUserId={loggedUserId} //ID del usuario logueado//
                                    onLike={onLike}          //Función para manejar likes//
                                    onDislike={onDislike}    //Función para manejar dislikes//
                                    onFavorite={onFavorite}  //Función para manejar favoritos//
                                    users={users}            //Array con todos los usuarios//
                                />
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