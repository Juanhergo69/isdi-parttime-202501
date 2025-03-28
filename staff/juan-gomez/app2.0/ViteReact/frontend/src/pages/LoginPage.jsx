//Importa la librería React para crear componentes//
import React from 'react'
//Importa funciones utilitarias para obtener usuarios y mostrar modales//
import { getUsers, createModal } from '../utils/utils'
//Importa el componente Form para reutilizar el formulario//
import Form from '../components/Forms'
//Importa los estilos CSS//
import '../index.css'

//Define el componente LoginPage que recibe la prop navigation//
const LoginPage = ({ navigation }) => {
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
            {/* Botón con logo para volver a la página de inicio */}
            <button
                className="imgButton"
                onClick={navigation.navigateToLanding}
            >
                <img src="/Logo.jpg" alt="Home" />
            </button>

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
                    //Campo de contraseña//
                    {
                        label: 'Password',
                        inputType: 'password',
                        inputPlaceholder: '*******',
                        inputId: 'password',
                        isRequired: true,
                        autoComplete: "current-password"
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

            {/* Botón para redirigir al registro */}
            <button
                className="buttonGoToRegister"
                onClick={navigation.navigateToRegister}
            >
                Register now!
            </button>
        </div>
    )
}

//Exporta el componente LoginPage como exportación por defecto//
export default LoginPage
