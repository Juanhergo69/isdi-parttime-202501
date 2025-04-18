//Importa la librería React para crear componentes//
import React from 'react'
//Importa función useState para crear estados//
import { useState } from 'react'
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
