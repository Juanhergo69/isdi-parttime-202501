//Importa la librería React para crear componentes//
import React from 'react'
//Importa funciones utilitarias desde utils.js//
import {
    getUsers,         //Obtiene lista de usuarios registrados//
    saveUsers,        //Guarda cambios en los usuarios//
    validateEmail,    //Valida formato de email//
    validatePassword, //Valida fortaleza de contraseña//
    createModal,      //Muestra ventanas modales//
    getLoggedUserId   //Obtiene ID del usuario logueado//
} from '../utils/utils'
//Importa estilos CSS//
import '../index.css'

//Componente de página de perfil que recibe prop de navegación//
const ProfilePage = ({ navigation }) => {
    //Obtiene lista de usuarios y datos del usuario actual//
    const users = getUsers()
    const loggedUserId = getLoggedUserId()
    const loggedUser = users.find(user => user.id === loggedUserId)

    //Estado para los datos del formulario//
    const [formData, setFormData] = React.useState({
        userName: (loggedUser && loggedUser.userName) || '', //Nombre de usuario actual//
        email: (loggedUser && loggedUser.email) || '', //Email actual//
        password: '', //Nueva contraseña (vacío por defecto)//
        confirmPassword: '' //Confirmación de contraseña//
    })

    //Estado para almacenar errores de validación//
    const [errors, setErrors] = React.useState({})

    //Redirige al login si no hay usuario logueado//
    if (!loggedUserId) {
        navigation.navigateToLogin()
        return null
    }

    //Maneja cambios en los campos del formulario//
    const handleChange = (e) => {
        const { name, value } = e.target //Extrae nombre y valor del input//

        //Actualiza el estado del formulario manteniendo otros valores//
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        //Limpia el error de este campo si existía//
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    //Valida todos los campos del formulario//
    const validateForm = () => {
        const newErrors = {}

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

        //Validación de contraseñas (solo si se ingresaron)//
        if (formData.password || formData.confirmPassword) {
            //Longitud mínima//
            if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters'
            }
            //Requisitos de complejidad//
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
        e.preventDefault() //Evita recarga de página//

        if (!validateForm()) return //Valida y detiene si hay errores//

        //Actualiza la lista de usuarios//
        const updatedUsers = users.map(user => {
            if (user.id === loggedUserId) { //Solo modifica el usuario actual//
                const updatedUser = {
                    ...user, //Copia todos los datos existentes//
                    userName: formData.userName, //Actualiza nombre//
                    email: formData.email        //Actualiza email//
                }

                //Actualiza contraseña solo si se proporcionó una nueva//
                if (formData.password) {
                    updatedUser.password = formData.password
                }

                return updatedUser
            }
            return user //Retorna otros usuarios sin cambios//
        })

        saveUsers(updatedUsers) //Guarda los cambios//

        //Muestra modal de éxito y redirige al home//
        createModal('Profile updated successfully!', () => {
            navigation.navigateToHome()
        })
    }

    //Renderizado del componente//
    return (
        <div className="profilePageContainer">
            {/* Encabezado de la página */}
            <div className="homeHeaderContainer">
                <div className="homeImgContainer">
                    <img src="/Logo.jpg" className="homeImg" alt="Logo" />
                </div>

                <h1 className="homeMsg">Edit Profile</h1>

                {/* Botón para volver al inicio */}
                <button
                    className="menuButton"
                    onClick={() => navigation.navigateToHome()}
                    aria-label="Back to home"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>

            {/* Contenedor del formulario */}
            <div className="profileFormContainer">
                <form onSubmit={handleSubmit} className="form">
                    {/* Grupo para nombre de usuario */}
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

                    {/* Grupo para email */}
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

                    {/* Grupo para nueva contraseña */}
                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    {/* Grupo para confirmar contraseña */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    {/* Botones de acción */}
                    <div className="form-actions">
                        <button type="submit" className="buttonJoin">Save Changes</button>
                        <button type="button" className="buttonGoToLogin" onClick={() => navigation.navigateToHome()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

//Exporta el componente ProfilePage como exportación por defecto//
export default ProfilePage
