//Importa la librería React para crear componentes//
import React from 'react'

//Importa función useState para crear estados//
import { useState } from 'react'

//Importa el componente Link de react-router-dom para navegación//
import { Link } from 'react-router-dom'

//Importa funciones utilitarias para obtener usuarios y mostrar modales//
import { createModal } from '../utils/utils'

//Importa el componente Form para reutilizar el formulario//
import Form from '../components/Forms'

//Importa los estilos CSS//
import '../styles/pages/loginPage.css'
import '../styles/components/forms.css'

//Define el componente LoginPage que recibe la prop navigation//
const LoginPage = ({ navigation }) => {
    //Estado para controlar visibilidad de contraseña//
    const [showPassword, setShowPassword] = useState(false);

//Define una función llamada handleSubmit que recibe formData como parámetro//
const handleSubmit = (formData) => {
    //Crea una nueva instancia de XMLHttpRequest para hacer peticiones HTTP//
    const xhr = new XMLHttpRequest()
    
    //Inicializa la petición como POST a la URL del endpoint de login//
    //El tercer parámetro 'true' indica que será asíncrona//
    xhr.open('POST', 'http://localhost:3001/api/auth/login', true)
    
    //Establece el header Content-Type como application/json//
    //Indica que enviaremos datos en formato JSON//
    xhr.setRequestHeader('Content-Type', 'application/json')
    
    //Define la función que se ejecutará cuando la petición se complete//
    xhr.onload = function() {
        //Si el status de la respuesta es 200 (OK)//
        if (xhr.status === 200) {
            //Parsea la respuesta JSON a objeto JavaScript//
            const response = JSON.parse(xhr.responseText)
            
            //Si la respuesta indica éxito (success: true)//
            if (response.success) {
                //Guardar el ID del usuario según rememberme//
                if (formData.rememberme) {
                    //Si rememberme es true, guarda en localStorage (persistente)//
                    localStorage.setItem('id', response.userId)
                } else {
                    //Si rememberme es false, guarda en sessionStorage (solo para esta sesión)//
                    sessionStorage.setItem('id', response.userId)
                }
                
                //Redirigir a Home llamando al método navigateToHome del objeto navigation//
                navigation.navigateToHome()
            }
        } else {
            //Si el status no es 200, parsea el mensaje de error//
            const errorResponse = JSON.parse(xhr.responseText)
            
            //Crea un modal mostrando el mensaje de error//
            //El segundo parámetro es un callback que se ejecuta al cerrar el modal//
            createModal(errorResponse.message, () => {
                //Si es error 401 y el mensaje incluye "not registered"//
                if (xhr.status === 401 && errorResponse.message.includes('not registered')) {
                    //Redirige a la página de registro//
                    navigation.navigateToRegister()
                }
            })
        }
    }
    
    //Define la función que maneja errores de conexión//
    xhr.onerror = function() {
        //Muestra un modal con mensaje genérico de error de conexión//
        createModal('Error de conexión con el servidor')
    }
    
    //Envía la petición al servidor, convirtiendo formData a JSON//
    xhr.send(JSON.stringify(formData))
}

    //Renderizado del componente//
    return (
        //Contenedor principal del formulario de login//
        <div className="loginForm">
            {/* Botón con logo para volver a la página de inicio - ahora con Link */}
            <Link
                to="/"
                className="loginImgButton"
                onClick={navigation.navigateToLanding}
            >
                <img src="/Logo.jpg" alt="Home" />
            </Link>

            {/* Título del formulario */}
            <h1 className="loginTitle">LOGIN</h1>

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
                            <div className="login-password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="*******"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="login-password-toggle"
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
                className="loginButtonGoToRegister"
                onClick={navigation.navigateToRegister}
            >
                Register now!
            </Link>
        </div>
    )
}

//Exporta el componente LoginPage como exportación por defecto//
export default LoginPage
