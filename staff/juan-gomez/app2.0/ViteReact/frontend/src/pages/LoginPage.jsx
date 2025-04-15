//Importa la librería React para crear componentes//
import React from 'react'
//Importa función useState para crear estados//
import { useState } from 'react'
//Importa el componente Link de react-router-dom para navegación//
import { Link } from 'react-router-dom'
//Importa el componente Form que contiene la lógica de los formularios//
import Form from '../components/Forms'
//Importa handleLogin//
import { handleLogin } from '../logic/handleLogin'
//Importa los estilos CSS//
import '../styles/pages/loginPage.css'
import '../styles/components/forms.css'

//Define el componente LoginPage que recibe la prop navigation//
const LoginPage = ({ navigation }) => {
    //Estado para controlar visibilidad de contraseña//
    const [showPassword, setShowPassword] = useState(false);

//Define una función llamada handleSubmit que recibe formData como parámetro//
const handleSubmit = (formData) => {
    //Llama a la función handleLogin pasando los datos del formulario//
    //Y obtiene el resultado de la operación de login//
    const result = handleLogin(formData);
    
    //Verifica si el login fue exitoso (success === true)//
    if (result.success) {
        //Decide qué mecanismo de almacenamiento usar según rememberSession://
        //- localStorage si el usuario marcó "Remember me" (persistente)//
        //- sessionStorage si no lo marcó (solo para esta sesión)//
        const storage = result.rememberSession ? localStorage : sessionStorage;
        
        //Almacena el ID del usuario en el storage seleccionado//
        //Esto mantendrá la sesión iniciada//
        storage.setItem('id', result.user.id)
        
        //Redirige al usuario a la página de inicio (Home)//
        navigation.navigateToHome()
    } 
    //Si el login falló Y se debe redirigir al usuario a registro//
    else if (result.shouldRedirect) {
        //Usa setTimeout para programar la redirección después de que://
        //1. El modal se haya mostrado completamente//
        //2. El ciclo actual de eventos de JavaScript termine//
        //El delay de 0ms asegura que se ejecute en el próximo tick del event loop//
        setTimeout(() => navigation.navigateToRegister(), 0)
    }
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
