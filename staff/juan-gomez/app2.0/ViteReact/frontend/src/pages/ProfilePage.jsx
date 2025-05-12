//Importa la biblioteca React para crear componentes//
import React from 'react'
//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'
//Importa useModal//
import { useModal } from '../components/ModalContext'
//Importa getLoggedUserId//
import { getLoggedUserId } from '../logic/getLoggedUserId'
//Importa handleImageChange//
import { handleImageChange } from '../logic/handleImageChange'
//Importa handleLogout//
import { handleLogout } from '../logic/handleLogout'
//Importa deleteUserAccount//
import { handleDeleteAccount } from '../logic/handleDeleteAccount'
//Importa handleRemoveImage//
import { handleRemoveImage } from '../logic/handleRemoveImage'
//Importa handleUserStatus//
import { handleUserStatus } from '../logic/handleUserStatus'
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
    //Estado para actualizar el usuario loggeado//
    const [loggedUser, setLoggedUser] = useState([])
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

    //Efecto para para cargar los datos del usuario//
    useEffect(() => {
        //Obtiene el ID del usuario logueado desde el almacenamiento//
        const loggedUserId = getLoggedUserId()

        //Verifica si no hay un usuario logueado (loggedUserId es null/undefined)//
        if (!loggedUserId) {
            //Redirige a la página de login si no hay usuario logueado//
            navigation.navigateToLogin()
            //Termina la ejecución del efecto//
            return
        }

        //Realiza una petición GET para obtener los datos del usuario desde la API//
        fetch(`http://localhost:3001/api/users/${loggedUserId}`)
            //Maneja la respuesta de la petición//
            .then(response => {
                //Verifica si la respuesta no fue exitosa (status code no es 200-299)//
                if (!response.ok) {
                    //Lanza un error si la respuesta no es válida//
                    throw new Error('Failed to fetch user data')
                }
                //Convierte la respuesta a formato JSON//
                return response.json()
            })
            //Maneja los datos obtenidos de la API//
            .then(data => {
                //Verifica si la respuesta indica éxito y contiene datos de usuario//
                if (data.success && data.user) {
                    //Extrae los datos del usuario de la respuesta//
                    const user = data.user
                    //Actualiza el estado con los datos del usuario logueado//
                    setLoggedUser(user)
                    //Actualiza el estado del formulario con los datos del usuario//
                    setFormData({
                        userName: user.userName || '',   //Usa el nombre o cadena vacía si es null/undefined//
                        email: user.email || '',         //Usa el email o cadena vacía si es null/undefined//
                        password: '',                    //No muestra la contraseña por seguridad//
                        confirmPassword: ''              //Campo vacío para confirmación//
                    })

                    //Maneja la imagen de avatar del usuario//
                    if (user.avatar) {
                        //Verifica si el avatar ya está en formato data URI//
                        if (user.avatar.startsWith('data:')) {
                            //Usa directamente el avatar si ya está en formato correcto//
                            setImagePreview(user.avatar)
                        } else {
                            //Convierte el avatar a formato data URI si es un base64 simple//
                            setImagePreview(`data:image/jpeg;base64,${user.avatar}`)
                        }
                    } else {
                        //Elimina la previsualización si no hay avatar//
                        setImagePreview(null)
                    }

                } else {
                    //Lanza error si la respuesta no contiene datos válidos de usuario//
                    throw new Error('User not found')
                }
            })
            //Maneja cualquier error que ocurra durante el proceso//
            .catch(error => {
                //Registra el error en la consola para depuración//
                console.error('Error loading user data:', error)
                //Muestra un modal de error al usuario//
                createModal('Error loading profile data')
                //Redirige a la página de login//
                navigation.navigateToLogin()
            })
        //Dependencias del efecto: se vuelve a ejecutar cuando estos valores cambian//
    }, [createModal, navigation])

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

    //Efecto para cerrar el menú al hacer clic fuera de él//
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
        //Obtiene el ID del usuario actualmente logueado//
        const userId = getLoggedUserId()
        //Verifica si no hay un usuario logueado (userId es null/undefined)//
        if (!userId) {
            //Muestra un modal de error indicando que no hay usuario logueado//
            createModal('No user logged in')
            //Termina la ejecución de la función//
            return
        }
        //Llama a la función que maneja la eliminación del avatar en el backend//
        handleRemoveImage(userId)
            //Si la eliminación es exitosa://
            .then(() => {
                //Limpia la imagen seleccionada en el estado//
                setSelectedImage(null)
                //Limpia la previsualización de imagen en el estado//
                setImagePreview(null)
                //Resetea el valor del input de tipo file (limpia la selección)//
                document.getElementById('avatar-upload').value = ''

                //Actualiza el estado del usuario logueado://
                //Mantiene todas las propiedades anteriores (...prev)//
                //pero establece avatar como null//
                setLoggedUser(prev => ({
                    ...prev,
                    avatar: null
                }))

                //Muestra un modal de éxito//
                createModal('Avatar removed successfully!')
            })
            //Si ocurre un error durante el proceso://
            .catch(error => {
                //Registra el error en la consola para depuración//
                console.error('Error removing avatar:', error)
                //Muestra un modal con el mensaje de error del backend o uno por defecto//
                createModal(error.message || 'Error removing avatar')
            })
    }

    //Maneja el envío del formulario de perfil//
    const handleSubmit = (e) => {
        //Previene el comportamiento por defecto del formulario (recarga de página)//
        e.preventDefault()

        //Valida el formulario y retorna false si hay errores//
        if (!validateForm(formData, setErrors)) return

        //Obtiene el ID del usuario logueado//
        const userId = getLoggedUserId()
        //Verifica si no hay usuario logueado//
        if (!userId) {
            //Muestra modal de error//
            createModal('No user logged in')
            //Termina la ejecución//
            return
        }

        //Prepara objeto con datos básicos a actualizar//
        const updateData = {
            userName: formData.userName,  //Nombre de usuario del formulario//
            email: formData.email         //Email del formulario//
        }

        //Si hay contraseña nueva, la agrega a los datos a actualizar//
        if (formData.password) {
            updateData.password = formData.password
        }

        //Crea un objeto FormData para enviar archivos//
        const formDataToSend = new FormData()

        //Si hay una imagen seleccionada, la agrega al FormData//
        if (selectedImage) {
            //Agrega la imagen con la clave 'avatar'//
            formDataToSend.append('avatar', selectedImage)
        }

        //Agrega los demás campos al FormData//
        Object.entries(updateData).forEach(([key, value]) => {
            formDataToSend.append(key, value)
        })

        //Primera petición para actualizar datos (incluyendo imagen si existe)//
        fetch(`http://localhost:3001/api/users/${userId}`, {
            method: 'PUT',              //Método HTTP PUT para actualización//
            body: formDataToSend        //Envía el FormData con los datos//
        })
            .then(response => {
                //Si la respuesta no es exitosa//
                if (!response.ok) {
                    //Convierte el error a JSON y lanza una excepción//
                    return response.json().then(error => { throw new Error(error.error || 'Failed to update profile') })
                }
                //Si es exitosa, convierte la respuesta a JSON//
                return response.json()
            })
            //Segunda petición para actualizar solo los datos básicos//
            .then(data => {
                return fetch(`http://localhost:3001/api/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',  //Indica que envía JSON//
                    },
                    body: JSON.stringify(updateData)         //Datos básicos como JSON//
                })
            })
            .then(response => {
                //Verifica nuevamente si la respuesta es exitosa//
                if (!response.ok) throw new Error('Failed to update profile')
                return response.json()
            })
            .then(data => {
                //Si la actualización fue exitosa//
                if (data.success) {
                    //Muestra modal de éxito y prepara redirección//
                    createModal('Profile updated successfully!', () => {
                        setShouldRedirect(true)
                    })

                    //Si hay imagen seleccionada, actualiza la previsualización//
                    if (selectedImage) {
                        const reader = new FileReader()
                        //Cuando termine de leer el archivo//
                        reader.onloadend = () => {
                            //Establece la previsualización con el resultado//
                            setImagePreview(reader.result)
                        }
                        //Lee la imagen como URL de datos//
                        reader.readAsDataURL(selectedImage)
                    }

                    //Actualiza los datos del usuario en el estado//
                    setLoggedUser(prev => ({
                        ...prev,                  //Mantiene los datos anteriores//
                        ...updateData,            //Agrega los datos actualizados//
                        avatar: data.user.avatar  //Actualiza el avatar//
                    }))
                } else {
                    //Si el servidor indica error, lanza excepción//
                    throw new Error(data.error || 'Update failed')
                }
            })
            .catch(error => {
                //Captura cualquier error en el proceso//
                console.error('Error updating profile:', error)
                //Muestra modal con el mensaje de error//
                createModal(error.message || 'Error updating profile')
            })
    }
    //Maneja el envío del formulario de estado//
    const handleStatusSubmit = (e) => {
        // Previene el comportamiento por defecto del formulario (recarga de página)
        e.preventDefault();

        // Obtiene el ID del usuario actualmente logueado
        const loggedUserId = getLoggedUserId();

        // Verifica si no hay un usuario logueado
        if (!loggedUserId) {
            // Muestra un modal de error indicando que no hay usuario logueado
            createModal('No user logged in');
            // Termina la ejecución de la función
            return;
        }

        //Llama a la función que maneja la actualización del estado en el backend//
        handleUserStatus(loggedUserId, statusText)
            //Si la actualización es exitosa://
            .then(() => {
                //Muestra un modal de éxito//
                createModal('Status updated successfully!')
                //Limpia el texto del estado en el estado local//
                setStatusText('')
                //Oculta el formulario de estado//
                setShowStatusForm(false)

                //Actualiza el estado del usuario logueado://
                setLoggedUser(prev => ({
                    ...prev,            //Mantiene todas las propiedades anteriores//
                    status: statusText  //Actualiza solo el estado con el nuevo texto//
                }))
            })
            //Si ocurre un error durante el proceso://
            .catch(error => {
                //Registra el error en la consola para depuración//
                console.error('Error updating status:', error)
                //Muestra un modal con el mensaje de error del backend o uno por defecto//
                createModal(error.message || 'Error updating status')
            })
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
        //Realiza la petición GET a la API de chistes usando fetch//
        fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
            //Primera etapa: procesar la respuesta HTTP//
            .then(response => {
                //Verifica si la respuesta es exitosa (status 200-299)//
                if (!response.ok) {
                    //Si la respuesta no es exitosa, lanza un error//
                    throw new Error('Failed to fetch joke from API')
                }
                //Convierte la respuesta a JSON y retorna otra promesa//
                return response.json()
            })
            //Segunda etapa: procesar los datos JSON//
            .then(data => {
                //Verifica si existe la propiedad 'joke' en los datos//
                if (data.joke) {
                    //Si existe, actualiza el estado con el chiste//
                    setStatusText(data.joke)
                } else {
                    //Si no existe, lanza un error//
                    throw new Error('Failed to get a joke. Try again!')
                }
            })
            //Manejo de errores//
            .catch(error => {
                //Registra el error en consola para depuración//
                console.error('Joke fetch error:', error)
                //Muestra un modal con el mensaje de error//
                createModal(error.message || 'Error connecting to JokeAPI')
            })
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
                        navigation.navigateTo('RegisterPage')
                    }
                } catch (error) {
                    //Muestra error si falla la eliminación//
                    createModal(`Error deleting account: ${error.message}`)
                }
            },
            'Confirm Deletion', //Título personalizado//
            true                //Mostrar botón de cancelar//
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