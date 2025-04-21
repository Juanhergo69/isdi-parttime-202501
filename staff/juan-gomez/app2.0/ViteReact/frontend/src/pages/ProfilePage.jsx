//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'
//Importa useModal//
import { useModal } from '../components/ModalContext'
//Importa getUsers//
import { getUsers } from '../logic/getUsers'
//Importa saveUsers//
import { saveUsers } from '../logic/saveUsers'
//Importa getLoggedUserId//
import { getLoggedUserId } from '../logic/getLoggedUserId'
//Importa saveUserStatus//
import { saveUserStatus } from '../logic/saveUserStatus'
//Importa handleImageChange//
import { handleImageChange } from '../logic/handleImageChange'
//Importa handleLogout//
import { handleLogout } from '../logic/handleLogout'
//Importa deleteUserAccount//
import { handleDeleteAccount } from '../logic/handleDeleteAccount'
//Importa el componente Header específico para perfil//
import ProfileHeader from '../components/ProfileHeader'
//Importa el componenete StatusForm específico para perfil//
import ProfileStatusForm from '../components/ProfileStatusForm'
//Importa el componenete Form específico para perfil//
import ProfileForm from '../components/ProfileForm'
//Importa validateForm//
import { validateForm } from '../utils/validators'
//Importa estilos CSS//
import '../styles/pages/profilePage.css'

//Define el componente funcional ProfilePage que recibe props de navegación//
const ProfilePage = ({ navigation }) => {
    //Obtenemos la función para mostrar modales//
    const { createModal } = useModal()

    //Obtiene la lista completa de usuarios//
    const users = getUsers()

    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Busca y obtiene los datos del usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Estados para controlar visibilidad de contraseñas//
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //Estado para controlar la visibilidad del nuevo formulario de estado//
    const [showStatusForm, setShowStatusForm] = useState(false);

    //Estado para controlar la visibilidad del menú desplegable del usuario//
    const [showMenu, setShowMenu] = useState(false)

    //Estado para el texto del nuevo estado//
    const [statusText, setStatusText] = useState('');

    //Estado para manejar los datos del formulario con valores iniciales//
    const [formData, setFormData] = useState({
        userName: (loggedUser && loggedUser.userName) || '',       //Nombre de usuario o cadena vacía//
        email: (loggedUser && loggedUser.email) || '',             //Email o cadena vacía//
        password: '',                                              //Contraseña vacía por defecto//
        confirmPassword: ''                                        //Confirmación vacía por defecto//
    })

    //Estado para manejar errores de validación//
    const [errors, setErrors] = useState({})

    //Estado para la imagen seleccionada (nueva)//
    const [selectedImage, setSelectedImage] = useState(null)

    //Estado para la vista previa de imagen (avatar actual o nuevo)//
    const [imagePreview, setImagePreview] = useState(loggedUser?.avatar || null)

    //Estado para controlar redirección explícita//
    const [shouldRedirect, setShouldRedirect] = useState(false)


    //Efecto para manejar redirección//
    useEffect(() => {
        if (shouldRedirect) {
            navigation.navigateToHome() //Redirige a Home solo cuando shouldRedirect es true//
        }
    }, [shouldRedirect, navigation])

    //Efecto para redirigir a login si no hay usuario logueado//
    useEffect(() => {
        if (!loggedUser) {
            navigation.navigateToLogin()
        }
    }, [loggedUser, navigation])

    //Efecto secundario para cerrar el menú al hacer clic fuera de él//
    useEffect(() => {
        //Función que maneja el clic fuera del menú//
        const handleClickOutside = (e) => {
            //Verifica si el clic fue fuera del menú y sus botones//
            if (showMenu && !e.target.closest('.profileMenuButton') && !e.target.closest('.profileMenuDropContainer')) {
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

    //Elimina la imagen seleccionada//
    const removeImage = () => {
        setSelectedImage(null)                              //Limpia la imagen seleccionada//
        setImagePreview(null)                               //Limpia la vista previa//
        document.getElementById('avatar-upload').value = '' //Resetea el input de archivo//
    }

    //Maneja el envío del formulario de perfil//
    const handleSubmit = (e) => {
        e.preventDefault() //Previene el comportamiento por defecto del formulario//

        //Valida el formulario y sale si hay errores//
        if (!validateForm(formData, setErrors)) return

        //Prepara los datos actualizados del usuario sin la imagen (se manejará por separado)//
        const updatedUsers = users.map(user => {
            if (user.id === loggedUserId) {
                const updatedUser = {
                    ...user,                     //Copia todas las propiedades existentes//
                    userName: formData.userName, //Actualiza nombre de usuario//
                    email: formData.email        //Actualiza email//
                }

                //Actualiza contraseña solo si se proporcionó una nueva//
                if (formData.password) {
                    updatedUser.password = formData.password
                }

                return updatedUser
            }
            return user //Devuelve usuarios no modificados tal cual//
        })

        //Función para guardar el perfil y manejar la redirección//
        const saveProfile = (usersToSave) => {
            saveUsers(usersToSave)                                  //Guarda los usuarios actualizados//
            createModal('Profile updated successfully!', () => {
                setShouldRedirect(true)                             //Activa la redirección después de cerrar el modal//
            })
        }

        //Manejo de imagen seleccionada (nuevo avatar)//
        if (selectedImage) {
            const reader = new FileReader()

            //Cuando se completa la lectura de la imagen//
            reader.onload = (event) => {
                //Crea una nueva versión de los usuarios con el avatar actualizado//
                const updatedUsersWithAvatar = updatedUsers.map(user => {
                    if (user.id === loggedUserId) {
                        return {
                            ...user,
                            avatar: event.target.result //Añade el avatar en base64//
                        }
                    }
                    return user
                })
                saveProfile(updatedUsersWithAvatar) //Guarda con el nuevo avatar//
            }

            //Manejo de errores al leer la imagen//
            reader.onerror = () => {
                createModal('Error updating avatar') //Notifica el error//
            }

            //Inicia la lectura del archivo como URL de datos//
            reader.readAsDataURL(selectedImage)
        } else if (imagePreview === null) { //Manejo cuando se elimina la imagen existente//
            //Crea una versión de los usuarios sin el avatar//
            const updatedUsersWithoutAvatar = updatedUsers.map(user => {
                if (user.id === loggedUserId) {
                    const { avatar, ...rest } = user //Elimina la propiedad avatar//
                    return rest
                }
                return user
            })
            saveProfile(updatedUsersWithoutAvatar) //Guarda sin avatar//
        }
        //Cuando no hay cambios en la imagen//
        else {
            saveProfile(updatedUsers) //Guarda los otros cambios del perfil//
        }
    }

    //Maneja el envío del formulario de estado//
    const handleStatusSubmit = (e) => {
        e.preventDefault() //Prevenimos comportamiento predeterminado del formulario //
        saveUserStatus(loggedUserId, statusText) //Seteamos el estado del usuario en base a su id y al texto introducido//
        createModal('Status updated successfully!') //Creamos modal para indicar que se ha realizado con exito//
        setStatusText('') //Seteamos el estado del texto a vacío//
        setShowStatusForm(false) //Ocultamos el formaulario de estado//
    }

    //Maneja el logout del usuario//
    const onLogout = () => {
        //Ejecuta el handler de logout que limpia los datos de sesión//
        handleLogout()
        //Navega a la página de login usando la función de navegación proporcionada//
        navigation.navigateToLogin()
    }

    //Función para llamar a una Api externa//
    const RandomJoke = () => {
        //Crea una nueva instancia de XMLHttpRequest para hacer peticiones HTTP//
        const xhr = new XMLHttpRequest()

        //Inicializa la petición HTTP con el método GET hacia la API de chistes de programación//
        //El tercer parámetro 'true' indica que la petición será asíncrona//
        xhr.open('GET', 'https://v2.jokeapi.dev/joke/Programming?type=single', true)

        //Define la función que se ejecutará cuando la petición se complete exitosamente//
        xhr.onload = function () {
            //Verifica si el código de estado HTTP está en el rango 200-299 (éxito)//
            if (this.status >= 200 && this.status < 300) {
                try {
                    //Intenta parsear la respuesta JSON a un objeto JavaScript//
                    const data = JSON.parse(this.responseText)

                    //Verifica si existe la propiedad 'joke' en los datos recibidos//
                    if (data.joke) {
                        //Si existe, llama a setStatusText con el texto del chiste//
                        setStatusText(data.joke)
                    } else {
                        //Si no existe la propiedad joke, muestra un modal de error//
                        createModal('Failed to get a joke. Try again!')
                    }
                } catch (e) {
                    //Si hay un error al parsear el JSON, lo registra en consola y muestra modal//
                    console.error('Error parsing response:', e)
                    createModal('Error processing joke data')
                }
            } else {
                //Si el código de estado no es exitoso, muestra modal de error//
                createModal('Failed to fetch joke from API')
            }
        }

        //Define la función que se ejecutará si hay un error en la petición (ej: problemas de red)//
        xhr.onerror = function () {
            //Registra el error en consola//
            console.error('Request failed')
            //Muestra un modal informando del error de conexión//
            createModal('Error connecting to JokeAPI')
        }

        //Envía la petición HTTP al servidor//
        xhr.send()
    }

    //Función para borrar completamente la cuenta del usuario//
    const OnDeleteAccount = () => {
        //Usamos createModal para mostrar la confirmación//
        createModal(
            'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.',
            () => {
                try {
                    //Intenta eliminar la cuenta//
                    const success = handleDeleteAccount()
                    if (success) { //Si lo consigue//
                        createModal('Account deleted successfully', () => { //Muestra confirmación de éxito//
                            navigation.navigateTo('RegisterPage')           //Navega a register//
                        })
                    }
                } catch (error) {
                    //Muestra error si falla la eliminación//
                    createModal(`Error deleting account: ${error.message}`)
                }
            },
            'Confirm Deletion', //Título personalizado//
            true //Mostrar botón de cancelar//
        )
    }

    //Maneja cambios en los inputs del formulario//
    const handleChange = (e) => {
        const { name, value } = e.target //Extrae nombre y valor del input//

        //Actualiza el estado del formulario manteniendo los valores anteriores//
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        //Limpia el error correspondiente si existe//
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    //Retorna la estructura JSX del componente//
    return (
        //Contenedor principal de la página de perfil//
        <div className="profilePageContainer">
            {/* Componente ProfileHeader que muestra:
            - Logo 
            - Título de la página
            - Menú de usuario con avatar
            - Botón para mostrar formulario de estado */}
            <ProfileHeader
                loggedUser={loggedUser}               //Objeto con datos del usuario logueado//
                navigation={navigation}               //Objeto para manejar navegación entre páginas//
                onLogout={onLogout}                   //Función para cerrar sesión//
                setShowMenu={setShowMenu}             //Función para controlar visibilidad del menú//
                showMenu={showMenu}                   //Estado que indica si el menú está visible//
                setShowStatusForm={setShowStatusForm} //Función para mostrar/ocultar formulario de estado//
                showStatusForm={showStatusForm}       //Estado que controla visibilidad del formulario de estado//
            />

            {/* Contenedor del formulario de perfil */}
            <div className="profileFormContainer">
                {/* Renderizado condicional del formulario de estado (solo visible cuando showStatusForm es true) */}
                {showStatusForm && (
                    <ProfileStatusForm
                        statusText={statusText}                 //Texto actual del estado//
                        setStatusText={setStatusText}           //Función para actualizar el texto del estado//
                        handleStatusSubmit={handleStatusSubmit} //Función para enviar el nuevo estado//
                        RandomJoke={RandomJoke}                 //Función para generar chiste aleatorio//
                    />
                )}

                {/* Componente ProfileForm que contiene:
                - Formulario de edición de perfil
                - Campos para usuario, email, contraseñas
                - Gestión de imagen de perfil
                - Botones de acción */}
                <ProfileForm
                    formData={formData}                             //Objeto con datos del formulario//
                    errors={errors}                                 //Objeto con mensajes de error de validación//
                    handleChange={handleChange}                     //Función para manejar cambios en inputs//
                    handleSubmit={handleSubmit}                     //Función para enviar el formulario//
                    showPassword={showPassword}                     //Estado que controla visibilidad de contraseña//
                    setShowPassword={setShowPassword}               //Función para alternar visibilidad de contraseña//
                    showConfirmPassword={showConfirmPassword}       //Estado para visibilidad de confirmación//
                    setShowConfirmPassword={setShowConfirmPassword} //Función para alternar visibilidad//
                    imagePreview={imagePreview}                     //URL de previsualización de imagen//
                    selectedImage={selectedImage}                   //Archivo de imagen seleccionado//
                    onImageChange={onImageChange}                   //Función para manejar cambio de imagen//
                    removeImage={removeImage}                       //Función para eliminar imagen seleccionada//
                    navigation={navigation}                         //Objeto para navegación//
                    OnDeleteAccount={OnDeleteAccount}               //Función para borrar cuenta//
                    showStatusForm={showStatusForm}                 //Estado que indica si formulario de estado está visible//
                />
            </div>
        </div>
    )
}

//Exporta el componente para poder ser usado en otros archivos//
export default ProfilePage