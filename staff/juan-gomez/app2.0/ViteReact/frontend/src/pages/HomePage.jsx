//Importa la librería React//
import React from 'react'
//Importa los hooks useState y useEffect de React//
import { useState, useEffect } from 'react'
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

    //Efecto para redirigir a login si no hay usuario logueado//
    useEffect(() => {
    if (!loggedUser) {
        navigation.navigateToLogin()
        }
    }, [loggedUser, navigation])

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
                        {messages.map((message) => {
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