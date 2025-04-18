//Importa el componente Link de react-router-dom para navegación entre páginas//
import { Link } from 'react-router-dom'

//Define el componente funcional RegisterFooter que recibe la prop navigateToLogin//
const RegisterFooter = ({ navigateToLogin }) => {
  //Retorna la estructura JSX del componente//
  return (
    //Fragmento React (<>...</>) para agrupar múltiples elementos sin añadir nodos extra al DOM//
    <>
      {/* Encabezado nivel 4 con mensaje para usuarios registrados */}
      <h4 className="registerMsg">Have you an account?</h4>
      
      {/* Componente Link de react-router para navegación */}
      <Link
        to="/login"  //Ruta de destino al hacer click//
        className="registerButtonGoToLogin"  //Clase CSS para estilizado//
        onClick={navigateToLogin}  //Función ejecutada al hacer click (manejo adicional de navegación)//
      >
        Go to login  {/*Texto visible del enlace*/}
      </Link>
    </>
  )
}

//Exporta el componente como default para poder importarlo en otros archivos//
export default RegisterFooter