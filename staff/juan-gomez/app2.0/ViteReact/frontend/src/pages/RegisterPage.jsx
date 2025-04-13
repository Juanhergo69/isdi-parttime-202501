//Importa la librería React para crear componentes//
import React from 'react'

//Importa el hook useState de React para manejar estado en componentes funcionales//
import { useState } from 'react'

//Importa el componente Link de react-router-dom para navegación entre páginas//
import { Link } from 'react-router-dom'

//Importa la función createModal desde el archivo de utilidades//
import { createModal } from '../utils/utils'

//Importa los estilos CSS específicos para la página de registro//
import '../styles/pages/registerPage.css'

//Importa los estilos CSS para los formularios//
import '../styles/components/forms.css'

//Importa el componente Form que contiene la lógica de los formularios//
import Form from '../components/Forms'

//Define el componente funcional RegisterPage que recibe navigation como prop//
const RegisterPage = ({ navigation }) => {
    //Estado para controlar si se muestra la contraseña (inicialmente oculta)//
    const [showPassword, setShowPassword] = useState(false);
    
    //Estado para controlar si se muestra la confirmación de contraseña (inicialmente oculta)//
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //Función que maneja el envío del formulario de registro//
    const handleSubmit = (formData) => {
        //Crea una nueva instancia de XMLHttpRequest para hacer peticiones HTTP//
        const xhr = new XMLHttpRequest();
        
        //Configura la petición POST asíncrona al endpoint de registro//
        xhr.open('POST', 'http://localhost:3001/api/auth/register', true);
        
        //Establece el header para indicar que enviamos datos JSON//
        xhr.setRequestHeader('Content-Type', 'application/json')
        
        //Define qué hacer cuando la petición se complete//
        xhr.onload = function() {
            //Si el status está entre 200 y 299 (éxito)//
            if (this.status >= 200 && this.status < 300) {
                //Parsea la respuesta JSON//
                const response = JSON.parse(this.responseText);
                
                //Si el registro fue exitoso//
                if (response.success) {
                    //Guarda el ID del usuario en sessionStorage (solo para esta sesión)//
                    sessionStorage.setItem('id', response.userId)
                    
                    //Redirige a la página de inicio//
                    navigation.navigateToHome()
                } else {
                    //Muestra mensaje de error si el registro falló//
                    createModal(response.message)
                }
            } else {
                try {
                    //Intenta parsear el mensaje de error del servidor//
                    const errorResponse = JSON.parse(this.responseText);
                    
                    //Muestra el mensaje de error o uno por defecto//
                    createModal(errorResponse.message || 'Registration failed');
                } catch (e) {
                    //Si hay error al parsear, muestra mensaje genérico//
                    createModal('Registration failed - server error')
                }
            }
        }
        
        //Maneja errores de red/conección//
        xhr.onerror = function() {
            createModal('Network error - please try again later')
        }
        
        //Envía los datos del formulario convertidos a JSON//
        xhr.send(JSON.stringify({
            email: formData.email,
            password: formData.password,
            confirmationPassword: formData['confirmation-password']
        }))
    }

    //Retorna el JSX que representa el componente//
    return (
        //Contenedor principal del formulario de registro//
        <div className="registerForm">
            {/* Enlace/logo que lleva a la página principal */}
            <Link
                to="/"
                className="registerImgButton"
                onClick={navigation.navigateToLanding}
            >
                {/* Imagen del logo */}
                <img src="/Logo.jpg" alt="Home" />
            </Link>

            {/* Título de la página de registro */}
            <h1 className="registerTitle">REGISTER</h1>

            {/* Componente Form que renderiza los campos del formulario */}
            <Form
                //Array que define los campos del formulario//
                inputsArray={[
                    //Campo para el email//
                    {
                        label: 'Email', //Etiqueta del campo//
                        inputType: 'email', //Tipo de input//
                        inputPlaceholder: 'my@email.com', //Placeholder//
                        inputId: 'email', //ID del campo//
                        isRequired: true, //Campo obligatorio//
                        autoComplete: "email" //Autocompletado del navegador//
                    },
                    // Campo para la contraseña
                    {
                        label: 'Password',
                        inputType: showPassword ? 'text' : 'password', //Alterna entre tipo text/password//
                        inputPlaceholder: '*******',
                        inputId: 'password',
                        isRequired: true,
                        autoComplete: "new-password",
                        //Input personalizado con botón para mostrar/ocultar contraseña//
                        customInput: (
                            <div className="register-password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="*******"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="register-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)} //Alterna estado al hacer click//
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {/* Icono que cambia según el estado */}
                                    {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                </button>
                            </div>
                        )
                    },
                    //Campo para confirmar contraseña//
                    {
                        label: 'Confirm password',
                        inputType: showConfirmPassword ? 'text' : 'password',
                        inputPlaceholder: '*******',
                        inputId: 'confirmation-password',
                        isRequired: true,
                        autoComplete: "new-password",
                        customInput: (
                            <div className="register-password-input-container">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmation-password"
                                    placeholder="*******"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="register-password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showConfirmPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                </button>
                            </div>
                        )
                    }
                ]}
                // Texto del botón de submit
                submitButtonText="Register"
                // Función que maneja el envío del formulario
                onSubmit={handleSubmit}
            />

            {/* Mensaje para usuarios que ya tienen cuenta */}
            <h4 className="registerMsg">Have you an account?</h4>

            {/* Enlace para ir a la página de login */}
            <Link
                to="/login"
                className="registerButtonGoToLogin"
                onClick={navigation.navigateToLogin}
            >
                Go to login
            </Link>
        </div>
    )
}

//Exporta el componente para poder usarlo en otros archivos//
export default RegisterPage