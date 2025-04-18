//Importa el componente Link de react-router-dom para navegación entre páginas//
import { Link } from 'react-router-dom'

//Define el componente funcional LoginFooter que recibe la prop navigateToRegister//
const LoginFooter = ({ navigateToRegister }) => {
  //Retorna la estructura JSX del componente//  
  return (
    //Fragmento React (<>...</>) para agrupar múltiples elementos sin añadir nodos extra al DOM//
    <>
      {/* Encabezado nivel 4 con mensaje para usuarios registrados */}  
      <h4 className="loginMsg">You don't have an account?</h4>
      
      {/* Componente Link de react-router para navegación */}
      <Link
        to="/register" //Ruta de destino al hacer click//
        className="loginButtonGoToRegister" //Clase CSS para estilizado//
        onClick={navigateToRegister} //Función ejecutada al hacer click (manejo adicional de navegación)//
      >
        Register now! {/*Texto visible del enlace*/}
      </Link>
    </>
  )
}

//Exporta el componente como default para poder importarlo en otros archivos//
export default LoginFooter