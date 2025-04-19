//Importa el componente Link de react-router-dom para manejar la navegación entre páginas//
import { Link } from 'react-router-dom'

const FavoritesHeader = ({
    loggedUser,          //Objeto con información del usuario logueado//
    navigation,          //Objeto con funciones de navegación//
    onLogout,            //Función para manejar el cierre de sesión//
    setShowMenu,         //Función para controlar visibilidad del menú//
    showMenu             //Estado booleano que indica si el menú está visible//
}) => {
    //Retorna la estructura JSX del componente//
    return (
        //Contenedor principal del encabezado//
        <div className="favoriteHeaderContainer">
            {/* Contenedor para la imagen del logo */}
            <div className="favoriteImgContainer">
                {/* Imagen del logo con:
                    - src: ruta de la imagen
                    - className: clase CSS para estilos
                    - alt: texto alternativo para accesibilidad */}
                <img
                    src="/Logo.jpg"
                    className="favoriteImg"
                    alt="Logo"
                />
            </div>

            {/* Título de la página de favoritos */}
            <h1 className="favoriteMsg">Favorite Messages</h1>

            {/* Botón del menú de usuario con:
                - className dinámico que añade 'with-avatar' si el usuario tiene avatar
                - onClick que alterna la visibilidad del menú
                - atributos ARIA para accesibilidad */}
            <button
                className={`favoriteMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
                onClick={() => setShowMenu(!showMenu)}
                aria-expanded={showMenu}
                aria-label="User menu"
            >
                {/* Contenido del botón del menú */}
                <div className="favoriteMenuButton-content">
                    {/* Renderizado condicional: muestra avatar o inicial del usuario */}
                    {loggedUser?.avatar ? (
                        //Si hay avatar, muestra la imagen//
                        <img
                            src={loggedUser.avatar}
                            className="favoriteMenuButton-avatar"
                            alt="User avatar"
                        />
                    ) : (
                        //Si no hay avatar, muestra la inicial del nombre de usuario//
                        <span className="favoriteMenuButton-initial">
                            {/* Toma la primera letra del username o 'U' por defecto */}
                            {loggedUser?.userName?.[0]?.toUpperCase() || 'U'}
                        </span>
                    )}
                </div>
            </button>

            {/* Menú desplegable que se muestra cuando showMenu es true */}
            {showMenu && (
                //Contenedor del menú desplegable//
                <div className="favoriteMenuDropContainer">
                    {/* Enlace/botón para ir a Home */}
                    <Link
                        to="/home"                       //Ruta de destino//
                        className="favoriteHomeButton"   //Clase CSS//
                        onClick={() => {
                            navigation.navigateToHome()  //Ejecuta navegación a home//
                            setShowMenu(false)           //Cierra el menú//
                        }}
                    >
                        {/* Icono de casa y texto */}
                        <i className="fas fa-house"></i> Home
                    </Link>

                    {/* Enlace/botón para ir a Perfil */}
                    <Link
                        to="/profile"                       //Ruta de destino//
                        className="favoriteProfileButton"   //Clase CSS//
                        onClick={() => {
                            navigation.navigateToProfile()  //Ejecuta navegación a perfil//
                            setShowMenu(false)              //Cierra el menú//
                        }}
                    >
                        {/* Icono de usuario y texto */}
                        <i className="fas fa-user"></i> Profile
                    </Link>

                    {/* Enlace/botón para ir a Mensajes */}
                    <Link
                        to="/messages"                      //Ruta de destino//
                        className="favoriteMessagesButton"  //Clase CSS//
                        onClick={() => {
                            navigation.navigateToMessages() //Ejecuta navegación a mensajes//
                            setShowMenu(false)              //Cierra el menú//
                        }}
                    >
                        {/* Icono de sobre y texto abreviado */}
                        <i className="fas fa-envelope"></i> My Msg
                    </Link>

                    {/* Botón para cerrar sesión */}
                    <button
                        className="favoriteLogoutButton" //Clase CSS//
                        onClick={onLogout}               //Ejecuta función de logout//
                    >
                        {/* Icono de salida y texto */}
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            )}
        </div>
    )
}

//Exporta el componente para que pueda ser utilizado en otros archivos//
export default FavoritesHeader