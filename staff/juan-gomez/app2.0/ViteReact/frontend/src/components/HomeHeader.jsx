//Importa el componente Link de react-router-dom para la navegación entre páginas//
import { Link } from 'react-router-dom'

//Componente funcional HomeHeader que recibe varias props como parámetros//
const HomeHeader = ({
  loggedUser,         //Objeto con información del usuario logueado//
  navigation,         //Objeto con métodos de navegación//
  onLogout,           //Función para manejar el logout//
  setShowMenu,        //Función para mostrar/ocultar el menú desplegable//
  showMenu,           //Estado booleano que indica si el menú está visible//
  setShowMsgForm,     //Función para mostrar/ocultar el formulario de mensajes//
  showMsgForm         //Estado booleano que indica si el formulario de mensajes está visible//
}) => {
  //Retorna la estructura JSX del encabezado//
  return (
    //Contenedor principal del header de home//
    <div className="homeHeaderContainer">
      {/* Contenedor de la imagen de home */}
      <div className="homeImgContainer">
        {/* Imagen del logo */}
        <img src="/Logo.jpg" className="homeImg" alt="Logo" />
        {/* Botón para alternar la visibilidad del formulario de mensajes */}
        <button
          className="home-toggleSendMsgFormButton"
          onClick={() => setShowMsgForm(!showMsgForm)}
        >
          {/* Texto del botón cambia según el estado del formulario */}
          {showMsgForm ? 'Hide Form' : 'New Post'}
        </button>
      </div>

      {/* Título de bienvenida */}
      <h1 className="homeMsg">Welcome, {(loggedUser && loggedUser.userName) || 'User'}</h1>

      {/* Botón del menú de usuario */}
      <button
        //Clases condicionales basadas en si el usuario tiene avatar//
        className={`homeMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
        onClick={() => setShowMenu(!showMenu)} //Alterna la visibilidad del menú//
        aria-expanded={showMenu}  //Atributo de accesibilidad//
        aria-label="User menu"    //Etiqueta para accesibilidad//
      >
        {/* Contenido del botón del menú */}
        <div className="homeMenuButton-content">
          {/* Si el usuario tiene avatar, lo muestra */}
          {loggedUser?.avatar ? (
            <img src={loggedUser.avatar} className="homeMenuButton-avatar" alt="User avatar" />
          ) : (
            //Si no tiene avatar, muestra la inicial del nombre de usuario//
            <span className="homeMenuButton-initial">
              {(loggedUser && loggedUser.userName && loggedUser.userName[0].toUpperCase()) || 'U'}
            </span>
          )}
        </div>
      </button>

      {/* Menú desplegable que se muestra solo cuando showMenu es true */}
      {showMenu && (
        <div className="homeMenuDropContainer">
          {/* Enlace/botón para ir a Perfil */}
          <Link
            to="/profile"
            className="homeProfileButton"
            onClick={() => {
              navigation.navigateToProfile() //Navega a perfil//
              setShowMenu(false)             //Cierra el menú//
            }}
          >
            <i className="fas fa-user"></i> Profile
          </Link>

          {/* Enlace/botón para ir a Mensajes */}
          <Link
            to="/messages"
            className="homeMessagesButton"
            onClick={() => {
              navigation.navigateToMessages() //Navega a mensajes//
              setShowMenu(false)              //Cierra el menú//
            }}
          >
            <i className="fas fa-envelope"></i> My Msg
          </Link>

          {/* Enlace/botón para ir a Favoritos */}
          <Link
            to="/favorites"
            className="homeFavoritesButton"
            onClick={() => {
              navigation.navigateToFavorites() //Navega a favoritos//
              setShowMenu(false)               //Cierra el menú//
            }}
          >
            <i className="fas fa-star"></i> My Fav
          </Link>

          {/* Botón para cerrar sesión */}
          <button className="homeLogoutButton" onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      )}
    </div>
  )
}

//Exporta el componente para poder usarlo en otros archivos//
export default HomeHeader