//Importa la librería React para crear componentes//
import React from 'react'

//Importa función useState para crear estados//
import { useState } from 'react'

//Importa el componente Link de react-router-dom para navegación//
import { Link } from 'react-router-dom'

//Importa funciones utilitarias para obtener usuarios y mostrar modales//
import { getUsers, createModal } from '../utils/utils'

//Importa el componente Form para reutilizar el formulario//
import Form from '../components/Forms'

//Importa los estilos CSS//
import '../index.css'

//Define el componente LoginPage que recibe la prop navigation//
const LoginPage = ({ navigation }) => {
    //Estado para controlar visibilidad de contraseña//
    const [showPassword, setShowPassword] = useState(false);

    //Función que maneja el envío del formulario de login//
    const handleSubmit = (formData) => {
        //Obtiene todos los usuarios registrados//
        const users = getUsers()
        //Busca el usuario por email//
        const userLoginCheckout = users.find(user => user.email === formData.email)

        //Si no encuentra el usuario//
        if (!userLoginCheckout) {
            //Muestra modal de error y redirige a registro//
            createModal('The email is not registered yet. Please, create an account first', () => {
                navigation.navigateToRegister()
            })
            return
        }

        //Si la contraseña no coincide//
        if (userLoginCheckout.password !== formData.password) {
            createModal('Incorrect password, Please, try again')
            return
        }

        //Guarda el ID del usuario según la opción "Remember me"//
        if (formData.rememberme) {
            localStorage.setItem('id', userLoginCheckout.id) //Persistente//
        } else {
            sessionStorage.setItem('id', userLoginCheckout.id) //Solo para la sesión//
        }

        //Redirige a la página de Home//
        navigation.navigateToHome()
    }

    //Renderizado del componente//
    return (
        //Contenedor principal del formulario de login//
        <div className="loginForm">
            {/* Botón con logo para volver a la página de inicio - ahora con Link */}
            <Link
                to="/"
                className="imgButton"
                onClick={navigation.navigateToLanding}
            >
                <img src="/Logo.jpg" alt="Home" />
            </Link>

            {/* Título del formulario */}
            <h1 className="title">LOGIN</h1>

            {/* Componente Form reutilizable con configuración específica para login */}
            <Form
                inputsArray={[
                    //Campo de email//
                    {
                        label: 'Email',
                        inputType: 'email',
                        inputPlaceholder: 'my@email.com',
                        inputId: 'email',
                        isRequired: true,
                        autoComplete: "email"
                    },
                    //Campo de contraseña con toggle de visibilidad//
                    {
                        label: 'Password',
                        inputType: showPassword ? 'text' : 'password',
                        inputPlaceholder: '*******',
                        inputId: 'password',
                        isRequired: true,
                        autoComplete: "current-password",
                        //Input personalizado con botón de toggle//
                        customInput: (
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="*******"
                                    required
                                    autoComplete="current-password"
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
                    //Checkbox para recordar sesión//
                    {
                        label: 'Remember me',
                        inputType: 'checkbox',
                        inputId: 'rememberme',
                        isRequired: false
                    }
                ]}
                submitButtonText="Login"  //Texto del botón de submit//
                onSubmit={handleSubmit}  //Función que maneja el envío//
            />

            {/* Mensaje para usuarios sin cuenta */}
            <h4 className="loginMsg">You don't have an account?</h4>

            {/* Botón para redirigir al registro - ahora con Link */}
            <Link
                to="/register"
                className="buttonGoToRegister"
                onClick={navigation.navigateToRegister}
            >
                Register now!
            </Link>
        </div>
    )
}

//Exporta el componente LoginPage como exportación por defecto//
export default LoginPage
