//Importa la librería React para poder crear componentes//
import React from 'react'
//Importa los estilos CSS para esta página//
import '../index.css'

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

            {/* Botón para unirse/registrarse */}
            <button
                className="buttonJoin"  //Clase CSS para estilos del botón//
                onClick={navigation.navigateToRegister} //Función que se ejecuta al hacer clic//
            >
                Join In!   {/*Texto del botón*/}
            </button>
        </div>
    )
}

//Exporta el componente LandingPage como exportación por defecto//
export default LandingPage


