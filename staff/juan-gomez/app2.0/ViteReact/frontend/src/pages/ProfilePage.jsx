//Importa la biblioteca React para crear componentes//
import React from 'react'

//Importa funciones useState y useEffect para crear estados y efectos//
import { useState, useEffect } from 'react'

//Importa el componente Link de react-router-dom para navegación//
import { Link } from 'react-router-dom'

//Importa funciones utilitarias específicas desde el archivo utils//
import {
    getUsers,          //Obtiene lista de usuarios//
    saveUsers,         //Guarda usuarios en almacenamiento//
    validateEmail,     //Valida formato de email//
    validatePassword,  //Valida fortaleza de contraseña//
    createModal,       //Crea modales de notificación//
    getLoggedUserId,   //Obtiene ID del usuario logueado//
    getMessages,       //Obtiene lista de mensajes//
    saveMessages,      //Guarda mensajes en almacenamiento//
} from '../utils/utils'

//Importa estilos CSS//
import '../styles/pages/profilePage.css'

//Define el componente funcional ProfilePage que recibe props de navegación//
const ProfilePage = ({ navigation }) => {
    //Estados para controlar visibilidad de contraseñas//
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //Obtiene la lista completa de usuarios//
    const users = getUsers()

    //Obtiene el ID del usuario actualmente logueado//
    const loggedUserId = getLoggedUserId()

    //Busca y obtiene los datos del usuario logueado//
    const loggedUser = users.find(user => user.id === loggedUserId)

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

    //Redirige a login si no hay usuario logueado//
    if (!loggedUserId) {
        navigation.navigateToLogin() //Navega a la página de login//
        return null //No renderiza nada//
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

    //Maneja cambio de imagen de avatar//
    const handleImageChange = (e) => {
        const file = e.target.files[0] //Obtiene el archivo seleccionado//
        if (file) {
            setSelectedImage(file) //Guarda el archivo en el estado//

            //Crea un FileReader para leer la imagen//
            const reader = new FileReader()

            //Cuando se complete la lectura//
            reader.onload = () => {
                setImagePreview(reader.result) //Guarda la vista previa como URL de datos//
            }

            //Lee el archivo como URL de datos//
            reader.readAsDataURL(file)
        }
    }

    //Elimina la imagen seleccionada//
    const removeImage = () => {
        setSelectedImage(null)                              //Limpia la imagen seleccionada//
        setImagePreview(null)                               //Limpia la vista previa//
        document.getElementById('avatar-upload').value = '' //Resetea el input de archivo//
    }

    //Valida todos los campos del formulario//
    const validateForm = () => {
        const newErrors = {} //Objeto para acumular errores//

        //Validación de nombre de usuario//
        if (!formData.userName.trim()) {
            newErrors.userName = 'Username is required'
        }

        //Validación de email//
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format'
        }

        //Validaciones de contraseña (solo si se está cambiando)//
        if (formData.password || formData.confirmPassword) {
            //Longitud mínima//
            if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters'
            }
            //Complejidad (mayúscula, minúscula, número, caracter especial)//
            else if (!validatePassword(formData.password)) {
                newErrors.password = 'Password must contain at least one uppercase, one lowercase, one number and one special character'
            }

            //Coincidencia de contraseñas//
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match'
            }
        }

        setErrors(newErrors) //Actualiza los errores//
        return Object.keys(newErrors).length === 0 //Retorna true si no hay errores//
    }

    //Maneja el envío del formulario//
    const handleSubmit = (e) => {
        e.preventDefault() //Previene el comportamiento por defecto del formulario//

        //Valida el formulario y sale si hay errores//
        if (!validateForm()) return

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
        }
        //Manejo cuando se elimina la imagen existente//
        else if (imagePreview === null) {
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

    //Función para borrar completamente la cuenta del usuario//
    const handleDeleteAccount = () => {

        //Confirmación antes de borrar la cuenta//
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.')

        if (confirmDelete) {
            //1.Obtener datos actuales//
            const users = getUsers()
            const messages = getMessages()
            const loggedUserId = getLoggedUserId()

            //2.Eliminar al usuario de la lista de usuarios//
            const updatedUsers = users.filter(user => user.id !== loggedUserId)
            saveUsers(updatedUsers)

            //3.Eliminar todos los mensajes del usuario//
            const updatedMessages = messages.filter(message => message.userId !== loggedUserId)
            saveMessages(updatedMessages)

            //4.Eliminar likes/dislikes del usuario en los mensajes restantes//
            const finalMessages = updatedMessages.map(message => {
                return {
                    ...message,
                    likes: message.likes.filter(like => like !== loggedUserId),
                    dislikes: message.dislikes.filter(dislike => dislike !== loggedUserId)
                }
            })
            saveMessages(finalMessages)

            //5.Limpiar el almacenamiento local/sesión//
            localStorage.removeItem('id')
            sessionStorage.removeItem('id')

            //6.Redirigir a la página de inicio//
            createModal('Account deleted successfully', () => {
                navigation.navigateTo('RegisterPage')
            })
        }
    }

    //Renderizado del componente//
    return (
        <div className="profilePageContainer">
            {/* Encabezado de la página */}
            <div className="homeHeaderContainer">
                {/* Contenedor del logo - ahora con Link */}
                <div className="homeImgContainer">
                    {/* Imagen del logo con clases para estilos y texto alternativo */}
                    <img
                        src="/Logo.jpg"       //Ruta de la imagen del logo//
                        className="homeImg  " //Clase CSS para la imagen//
                        alt="Logo"            //Texto alternativo para accesibilidad//
                    />
                </div>

                {/* Título de la página */}
                <h1 className="homeMsg">Edit Profile</h1>

                {/* Botón para volver a home - ahora con Link */}
                <Link
                    to="/home"
                    className="menuButton back-button"
                    onClick={() => navigation.navigateToHome()}
                    aria-label="Back to home"
                >
                    <div className="menuButton-content">
                        <i className="fas fa-arrow-left"></i>
                    </div>
                </Link>
            </div>
            {/* Contenedor principal del formulario */}
            <div className="profileFormContainer">
                <form onSubmit={handleSubmit} className="form">
                    {/* Sección de imagen de perfil */}
                    <div className="form-group">
                        <label>Profile Image:</label>
                        <div className="optimized-image-section">
                            {/* Controles para subir/remover imagen */}
                            <div className="image-controls-row">
                                {/* Label estilizado para input de archivo */}
                                <label htmlFor="avatar-upload" className="image-upload-label">
                                    <i className="fas fa-image"></i> {imagePreview ? 'Change Image' : 'Add Image'}
                                </label>

                                {/* Input real para subir archivo (oculto) */}
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />

                                {/* Botón para remover imagen (visible solo cuando hay imagen) */}
                                {imagePreview && (
                                    <button
                                        type="button"
                                        className="remove-image-button"
                                        onClick={removeImage}
                                    >
                                        <i className="fas fa-times"></i> Remove
                                    </button>
                                )}
                            </div>

                            {/* Muestra nombre del archivo seleccionado */}
                            {selectedImage && (
                                <div className="compact-image-info">
                                    <span className="image-filename">{selectedImage.name}</span>
                                </div>
                            )}

                            {/* Muestra vista previa de la imagen */}
                            {imagePreview && (
                                <div className="constrained-preview">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="compact-image-preview"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Campo para nombre de usuario */}
                    <div className="form-group">
                        <label htmlFor="userName">Username:</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className={errors.userName ? 'error' : ''} //Clase error si hay problema//
                        />
                        {/* Muestra mensaje de error si existe */}
                        {errors.userName && <span className="error-message">{errors.userName}</span>}
                    </div>

                    {/* Campo para email */}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    {/* Campo para nueva contraseña con toggle de visibilidad */}
                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                            </button>
                        </div>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    {/* Campo para confirmar nueva contraseña con toggle de visibilidad */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <div className="password-input-container">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'error' : ''}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                                {showConfirmPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    {/* Botones de acción */}
                    <div className="form-actions">
                        <button type="submit" className="buttonSaveChanges">Save Changes</button>
                        <button
                            type="button"
                            className="buttonCancel"
                            onClick={() => navigation.navigateToHome()}
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Botón para eliminar cuenta */}
                    <div className="delete-account-section">
                        <button
                            type="button"
                            className="buttonDeleteAccount"
                            onClick={handleDeleteAccount}
                        >
                            <i className="fas fa-trash-alt"></i> Delete Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

//Exporta el componente como exportación por defecto//
export default ProfilePage
