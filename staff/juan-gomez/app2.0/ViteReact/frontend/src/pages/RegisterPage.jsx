//Importa la librería React para crear componentes//
import React from 'react'
//Importa funciones utilitarias desde utils.js//
import {
    getUsers,                //Obtiene lista de usuarios registrados//
    saveUsers,               //Guarda usuarios en almacenamiento//
    capitalizeFirstLetter,   //Capitaliza la primera letra de un string//
    validateEmail,           //Valida formato de email//
    validatePassword,        //Valida fortaleza de contraseña//  
    createModal              //Muestra ventanas modales//
} from '../utils/utils'
//Importa componente Form reutilizable//
import Form from '../components/Forms'
//Importa estilos CSS//
import '../index.css'

//Componente de página de registro que recibe prop de navegación//
const RegisterPage = ({ navigation }) => {
    //Estados para controlar visibilidad de contraseñas//
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    //Función que maneja el envío del formulario//
    const handleSubmit = (formData) => {
        //Valida formato de email//
        if (!validateEmail(formData.email)) {
            createModal('Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)');
            return
        }

        //Valida fortaleza de contraseña//
        if (!validatePassword(formData.password)) {
            createModal('Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character');
            return
        }

        //Verifica que las contraseñas coincidan//
        if (formData.password !== formData['confirmation-password']) {
            createModal('Passwords are not the same. Please, try again')
            return
        }

        //Obtiene usuarios existentes//
        const users = getUsers()
        //Verifica si el email ya está registrado//
        const doesUserExist = users.some(user => user.email === formData.email)

        if (doesUserExist) {
            createModal('This mail is already in use');
            return
        }

        //Crea nombre de usuario a partir del email (parte antes del @)//
        const userName = formData.email.split('@')[0]
        //Capitaliza la primera letra del nombre de usuario//
        const capitalizedUserName = capitalizeFirstLetter(userName)
        //Crea objeto con datos del nuevo usuario//
        const userCreated = {
            email: formData.email,
            password: formData.password,
            userName: capitalizedUserName,
            id: Date.now() //Usa timestamp como ID único//
        }

        //Agrega el nuevo usuario al array//
        users.push(userCreated)
        //Guarda los usuarios actualizados//
        saveUsers(users)
        //Establece sesión del usuario//
        sessionStorage.setItem('id', userCreated.id)
        //Redirige a la página de Home//
        navigation.navigateToHome()
    }

    //Renderizado del componente//
    return (
        <div className="registerForm">
            {/* Botón con logo para volver a landing */}
            <button
                className="imgButton"
                onClick={navigation.navigateToLanding}
            >
                <img src="/Logo.jpg" alt="Home" />
            </button>

            {/* Título del formulario */}
            <h1 className="title">REGISTER</h1>

            {/* Componente Form reutilizable con campos de contraseña personalizados */}
            <Form
                inputsArray={[
                    //Campo para email//
                    {
                        label: 'Email',
                        inputType: 'email',
                        inputPlaceholder: 'my@email.com',
                        inputId: 'email',
                        isRequired: true,
                        autoComplete: "email"
                    },
                    //Campo para contraseña con toggle de visibilidad//
                    {
                        label: 'Password',
                        inputType: showPassword ? 'text' : 'password',
                        inputPlaceholder: '*******',
                        inputId: 'password',
                        isRequired: true,
                        autoComplete: "new-password",
                        //Input personalizado con botón de toggle//
                        customInput: (
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="*******"
                                    required
                                    autoComplete="new-password"
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
                        )
                    },
                    //Campo para confirmar contraseña con toggle de visibilidad//
                    {
                        label: 'Confirm password',
                        inputType: showConfirmPassword ? 'text' : 'password',
                        inputPlaceholder: '*******',
                        inputId: 'confirmation-password',
                        isRequired: true,
                        autoComplete: "new-password",
                        //Input personalizado con botón de toggle//
                        customInput: (
                            <div className="password-input-container">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmation-password"
                                    placeholder="*******"
                                    required
                                    autoComplete="new-password"
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
                        )
                    }
                ]}
                submitButtonText="Register"  //Texto del botón de envío//
                onSubmit={handleSubmit}      //Función que maneja el envío//
            />

            {/* Mensaje para usuarios registrados */}
            <h4 className="registerMsg">Have you an account?</h4>

            {/* Botón para ir al login */}
            <button
                className="buttonGoToLogin"
                onClick={navigation.navigateToLogin}
            >
                Go to login
            </button>
        </div>
    )
}

//Exporta el componente RegisterPage como exportación por defecto//
export default RegisterPage