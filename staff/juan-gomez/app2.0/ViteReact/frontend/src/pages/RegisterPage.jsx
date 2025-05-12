//Importa la librería React para crear componentes//
import React from 'react'
//Importa el hook useState de React para manejar estado en componentes funcionales//
import { useState } from 'react'
//Importa useModal para manejar renderizados de modales según context provider de React//
import { useModal } from '../components/ModalContext'
//Importa el componente Form que contiene la lógica de los formularios//
import Form from '../components/Forms'
//Importa el componente personalizado para inputs de contraseña//
import RegisterPasswordInput from '../components/RegisterPasswordInput'
//Importa el componente Header específico para registro//
import RegisterHeader from '../components/RegisterHeader'
//Importa el componente Footer específico para registro//
import RegisterFooter from '../components/RegisterFooter'
//Importa la función handleRegister que contiene la lógica de registro//
import { handleRegister } from '../logic/handleRegister'
//Importa los estilos CSS específicos para la página de registro//
import '../styles/pages/registerPage.css'
//Importa los estilos CSS generales para formularios//
import '../styles/components/forms.css'

//Define el componente funcional RegisterPage que recibe navigation como prop//
const RegisterPage = ({ navigation }) => {
    //Estado para controlar visibilidad de contraseña (inicialmente false/oculta)//
    const [showPassword, setShowPassword] = useState(false);
    //Estado para controlar visibilidad de confirmación de contraseña//
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    //Obtenemos la función para mostrar modales//
    const { createModal } = useModal()

    //Función que maneja el envío del formulario (recibe formData como parámetro)//
    const handleSubmit = (formData) => {
        //Llama a la función handleRegister pasando los datos del formulario//
        //handleRegister devuelve una Promesa que resuelve con la respuesta del servidor//
        handleRegister(formData)
            //Maneja la respuesta exitosa del registro//
            .then(({ success, user }) => {
                //Verifica si el registro fue exitoso (success = true) y si se recibió el objeto user//
                if (success && user) {
                    //Almacena el ID del usuario en sessionStorage (persistencia solo para la sesión actual)//
                    sessionStorage.setItem('id', user.id)
                    //Redirige al usuario a la página de inicio usando el método de navegación//
                    navigation.navigateToHome()
                }
            })
            //Maneja cualquier error que ocurra durante el proceso de registro//
            .catch(error => {
                //Muestra un modal de error al usuario://
                //- Usa el mensaje de error del servidor (error.error) si está disponible//
                //- Usa un mensaje por defecto si no hay mensaje específico//
                createModal(error.error || 'Registration failed. Please try again.')
            })
    }

    //Retorna la estructura JSX del componente//
    return (
        //Contenedor principal con clase CSS registerForm//
        <div className="registerForm">
            {/* Componente Header con prop para navegación a Landing */}
            <RegisterHeader navigateToLanding={navigation.navigateToLanding} />

            {/* Componente Form con configuración de inputs */}
            <Form
                //Array que define los campos del formulario//
                inputsArray={[
                    {
                        label: 'Email', //Texto del label//
                        inputType: 'email', //Tipo de input HTML5//
                        inputPlaceholder: 'my@email.com', //Placeholder//
                        inputId: 'email', //ID único para el input//
                        isRequired: true, //Campo obligatorio//
                        autoComplete: "email" //Autocompletado del navegador//
                    },
                    {
                        label: 'Password',
                        inputId: 'password',
                        isRequired: true,
                        //Usa componente personalizado para contraseña//
                        customInput: (
                            <RegisterPasswordInput
                                id="password"
                                placeholder="*******"
                                showPassword={showPassword} //Estado de visibilidad//
                                setShowPassword={setShowPassword} //Setter del estado//
                            />
                        )
                    },
                    {
                        label: 'Confirm password',
                        inputId: 'confirmPassword',
                        isRequired: true,
                        //Segundo componente personalizado para confirmación//
                        customInput: (
                            <RegisterPasswordInput
                                id="confirmPassword"
                                placeholder="*******"
                                showPassword={showConfirmPassword}
                                setShowPassword={setShowConfirmPassword}
                            />
                        )
                    }
                ]}
                //Texto del botón de submit//
                submitButtonText="Register"
                //Función que maneja el envío del formulario//
                onSubmit={handleSubmit}
            />

            {/* Componente Footer con prop para navegación a Login */}
            <RegisterFooter navigateToLogin={navigation.navigateToLogin} />
        </div>
    )
}

//Exporta el componente para poder ser usado en otros archivos//
export default RegisterPage