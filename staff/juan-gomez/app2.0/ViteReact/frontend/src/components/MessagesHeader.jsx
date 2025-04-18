//Importa el componente Link de react-router-dom para la navegación//
import { Link } from 'react-router-dom'

//Define el componente funcional MessagesHeader que recibe props://
//- loggedUser: objeto con datos del usuario logueado//
//- navigation: objeto con funciones de navegación//
//- onLogout: función para cerrar sesión//
//- setShowMenu: función para controlar visibilidad del menú//
//- showMenu: estado booleano que indica si el menú está visible//
const MessagesHeader = ({ loggedUser, navigation, onLogout, setShowMenu, showMenu }) => {
    //Retorna la estructura JSX del encabezado//
    return (
        //Contenedor principal del encabezado//
        <div className="messagesHeaderContainer">
            {/* Contenedor del logo */}
            <div className="messagesImgContainer">
                {/* Imagen del logo */}
                <img
                    src="/Logo.jpg"         //Ruta de la imagen//
                    className="messagesImg" //Clase CSS//
                    alt="Logo"              //Texto alternativo//
                />
            </div>
            
            {/* Título de la página */}
            <h1 className="messagesMsg">My Messages</h1>
            
            {/* Botón del menú de usuario */}
            <button
                className={`messagesMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`} //Clases CSS condicionales (añade 'with-avatar' si hay avatar)//
                onClick={() => setShowMenu(!showMenu)}                                      //Alterna visibilidad del menú//
                aria-expanded={showMenu}                                                    //Accesibilidad: indica estado expandido//
                aria-label="User menu"                                                      //Accesibilidad: etiqueta descriptiva//
            >
                {/* Contenido del botón */}
                <div className="messagesMenuButton-content">
                    {/* Renderizado condicional: muestra avatar o inicial */}
                    {loggedUser?.avatar ? (
                        //Si hay avatar, muestra la imagen//
                        <img
                            src={loggedUser.avatar}                //URL del avatar//
                            className="messagesMenuButton-avatar"  //Clase CSS//
                            alt="User avatar"                      //Texto alternativo//
                        />
                    ) : (
                        //Si no hay avatar, muestra la inicial del nombre de usuario//
                        <span className="messagesMenuButton-initial">
                            {/* Toma la primera letra del username o 'U' por defecto */}
                            {loggedUser?.userName?.[0]?.toUpperCase() || 'U'}
                        </span>
                    )}
                </div>
            </button>

            {/* Menú desplegable (se muestra solo cuando showMenu es true) */}
            {showMenu && (
                <div className="messagesMenuDropContainer">
                    {/* Enlace/button para ir a Home */}
                    <Link
                        to="/home" //Ruta de destino//
                        className="messagesHomeButton" //Clase CSS//
                        onClick={() => {
                            navigation.navigateToHome() //Navega a home//
                            setShowMenu(false) //Cierra el menú//
                        }}
                    >
                        <i className="fas fa-house"></i> Home {/* Icono + texto */}
                    </Link>

                    {/* Enlace/button para ir a Perfil */}
                    <Link
                        to="/profile"                      //Ruta de destino//
                        className="messagesProfileButton"  //Clase CSS//
                        onClick={() => {
                            navigation.navigateToProfile() //Navega a perfil//
                            setShowMenu(false) //Cierra el menú//
                        }}
                    >
                        <i className="fas fa-user"></i> Profile {/* Icono + texto */}
                    </Link>

                    {/* Enlace/button para ir a Favoritos */}
                    <Link
                        to="/favorites"                      //Ruta de destino//
                        className="messagesFavoritesButton"  //Clase CSS//
                        onClick={() => {
                            navigation.navigateToFavorites() //Navega a favoritos//
                            setShowMenu(false)               //Cierra el menú//
                        }}
                    >
                        <i className="fas fa-star"></i> My Fav {/* Icono + texto */}
                    </Link>

                    {/* Botón para cerrar sesión */}
                    <button 
                        className="messagesLogoutButton" //Clase CSS//
                        onClick={onLogout}               //Ejecuta función de logout//
                    >
                        <i className="fas fa-sign-out-alt"></i> Logout {/* Icono + texto */}
                    </button>
                </div>
            )}
        </div>
    )
}

//Exporta el componente para poder usarlo en otros archivos//
export default MessagesHeader