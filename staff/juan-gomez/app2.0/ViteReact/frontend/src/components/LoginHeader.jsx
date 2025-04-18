//Importa el componente Link de react-router-dom para crear enlaces de navegación sin recargar la página//
import { Link } from 'react-router-dom'

//Define el componente funcional LoginHeader que recibe la prop navigateToLanding//
const LoginHeader = ({ navigateToLanding }) => {
  //Retorna la estructura JSX del componente//  
  return (
    //Fragmento React para agrupar múltiples elementos sin añadir un nodo extra al DOM//
    <>
      {/* Componente Link que envuelve el logo y funciona como botón de navegación */} 
      <Link
        to="/" //Ruta de destino (página principal)//
        className="loginImgButton" //Clase CSS para estilizar el contenedor del logo//
        onClick={navigateToLanding} //Función que se ejecuta al hacer click (además de la navegación)//
      >
        {/* Imagen del logo que sirve como elemento visual clickeable */}
        <img src="/Logo.jpg" //Ruta de la imagen del logo (debería estar en la carpeta public)//
        alt="Home" //Texto alternativo para accesibilidad (describe la función del botón)//
        />
      </Link>

      {/* Título principal de la página de registro */}
      <h1 className="loginTitle">LOGIN</h1> {/*Texto del título con clase para estilizado*/}
    </>
  )
}

//Exporta el componente como default para poder importarlo desde otros archivos//
export default LoginHeader