//Importa la librería React para crear componentes//
import React from 'react'
//Importa el hook useState de React para manejar estado en componentes funcionales//
import { useState } from 'react'
//Importa el componente Link de react-router-dom para navegación entre páginas//
import { Link } from 'react-router-dom'
//Importa el componente Form que contiene la lógica de los formularios//
import Form from '../components/Forms'
//Importa handleRegister//
import { handleRegister } from '../logic/handleRegister'
//Importa los estilos CSS específicos para la página de registro//
import '../styles/pages/registerPage.css'
//Importa los estilos CSS para los formularios//
import '../styles/components/forms.css'

//Define el componente funcional RegisterPage que recibe navigation como prop//
const RegisterPage = ({ navigation }) => {
    //Estado para controlar si se muestra la contraseña (inicialmente oculta)//
    const [showPassword, setShowPassword] = useState(false);
    
    //Estado para controlar si se muestra la confirmación de contraseña (inicialmente oculta)//
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    //Función que maneja el envío del formulario de registro//
    const handleSubmit = (formData) => {
    const { success, user } = handleRegister(formData)
    
    if (success && user) {
      //Establece sesión del usuario//
      sessionStorage.setItem('id', user.id)
      //Redirige a la página de Home (navegación manejada en el componente)//
      navigation.navigateToHome()
    }
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