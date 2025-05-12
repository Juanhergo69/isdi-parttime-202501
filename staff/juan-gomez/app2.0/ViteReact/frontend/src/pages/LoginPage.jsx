
//Importa la librería React para crear componentes//
import React from 'react'
//Importa función useState para crear estados//
import { useState } from 'react'
//Importa useModal para manejar renderizados de modales según context provider de React//
import { useModal } from '../components/ModalContext'
//Importa el componente Form que contiene la lógica de los formularios//
import Form from '../components/Forms'
//Importa el componente personalizado para inputs de contraseña//
import LoginPasswordInput from '../components/LoginPasswordInput'
//Importa el componente Header específico para login//
import LoginHeader from '../components/LoginHeader'
//Importa el componente Footer específico para login//
import LoginFooter from '../components/LoginFooter'
//Importa handleLogin//
import { handleLogin } from '../logic/handleLogin'
//Importa los estilos CSS específicos para la página de login//
import '../styles/pages/loginPage.css'
//Importa los estilos CSS generales para formularios//
import '../styles/components/forms.css'

//Define el componente LoginPage que recibe la prop navigation//
const LoginPage = ({ navigation }) => {
  //Estado para controlar visibilidad de contraseña//
  const [showPassword, setShowPassword] = useState(false)
  //Obtenemos la función para mostrar modales//
  const { createModal } = useModal()

  //Define una función llamada handleSubmit que recibe formData como parámetro//
  const handleSubmit = (formData) => {
    //Ejecuta la función `handleLogin` pasando los datos del formulario (retorna una Promesa)//
    handleLogin(formData)
      //Si el login es exitoso, recibe un objeto con: {success, user, rememberSession}//
      .then(({ success, user, rememberSession }) => {
        //Verifica si el login fue exitoso (success=true) y si existe el objeto `user`//
        if (success && user) {
          //Decide dónde guardar el ID del usuario://
          //- Si rememberSession=true usa localStorage (persistente)//
          //- Si rememberSession=false usa sessionStorage (solo para esta sesión)//
          const storage = rememberSession ? localStorage : sessionStorage
          //Almacena el ID del usuario en el storage seleccionado//
          storage.setItem('id', user.id)
          //Redirige al usuario a la página de inicio usando el método de navegación//
          navigation.navigateToHome()
        }
      })
      //Si ocurre un error en el login, recibe un objeto con: {error, shouldRedirect}//
      .catch(({ error, shouldRedirect }) => {
        //Muestra un modal de error con el mensaje recibido o uno por defecto//
        createModal(error || 'Login failed')
        //Si shouldRedirect=true, redirige a la página de registro//
        if (shouldRedirect) {
          //Usa setTimeout para asegurar que el modal se muestre antes de la redirección//
          setTimeout(() => navigation.navigateToRegister(), 0)
        }
      })
  }

  //Retorna la estructura JSX del componenete//
  return (
    //Contenedor principal con clase CSS loginForm//
    <div className="loginForm">
      {/* Componente Header con prop para navegación a Landing */}
      <LoginHeader navigateToLanding={navigation.navigateToLanding} />

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
            autoComplete: "current-password",
            //Usa componenete personalizado para contraseña//
            customInput: (
              <LoginPasswordInput
                id="password"
                placeholder="*******"
                showPassword={showPassword} //Estado de visibilidad//
                setShowPassword={setShowPassword} //Setter del estado//
                autoComplete="current-password" //Autocompletado del navegador//
              />
            )
          },
          {
            label: 'Remember me', //Texto del label//
            inputType: 'checkbox', //Tipo de input HTML5//
            inputId: 'rememberme', //ID único para el input//
            isRequired: false //Campo no obligatorio//
          }
        ]}
        //Texto del botón de submit//
        submitButtonText="Login"
        //Función que maneja el envío del formulario//
        onSubmit={handleSubmit}
      />
      {/* Componenete Footer con prop de navegación a Register */}
      <LoginFooter navigateToRegister={navigation.navigateToRegister} />
    </div>
  )
}

//Exporta el componenete para poder ser usado en otros archivos//
export default LoginPage