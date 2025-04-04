//Importa la librería React para poder crear componentes//
import React from 'react'

//Importa el componente Link de react-router-dom para navegación//
import { Link } from 'react-router-dom'

//Importa los estilos CSS para esta página//
import '../styles/pages/landingPage.css'

//Define el componente LandingPage que recibe la prop 'navigation'//
const LandingPage = ({ navigation }) => {
    //Retorna el JSX que compone la página de inicio//
    return (
        //Contenedor principal con clase CSS para estilos//
        <div className="landingContainer">
            {/* Imagen del logo con clases para estilos y texto alternativo */}
            <img
                src="/Logo.jpg"       //Ruta de la imagen del logo//
                className="landingImg" //Clase CSS para la imagen//
                alt="Logo"            //Texto alternativo para accesibilidad//
            />

            {/* Mensaje de bienvenida con clase para estilos */}
            <h3 className="landingMsg">
                Welcome to your social developer network
            </h3>

            {/* Botón para unirse/registrarse - ahora usando Link */}
            <Link
                to="/register"         //Ruta a la página de registro//
                className="buttonJoin" //Clase CSS para estilos del botón//
                onClick={navigation.navigateToRegister} //Función que se ejecuta al hacer clic//
            >
                Join In!   {/*Texto del botón*/}
            </Link>
        </div>
    )
}

//Exporta el componente LandingPage como exportación por defecto//
export default LandingPage


