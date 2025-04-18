//Importa el componente Link de react-router-dom para manejar navegación entre páginas//
import { Link } from 'react-router-dom'

//Define el componente funcional BioHeader que recibe las siguientes props://
//- loggedUser: objeto con datos del usuario logueado (puede ser undefined/null)//
//- navigation: objeto con métodos de navegación//
//- onLogout: función para manejar cierre de sesión//
//- setShowMenu: función para controlar visibilidad del menú desplegable//  
//- showMenu: estado booleano que indica si el menú está visible//
const BioHeader = ({ loggedUser, navigation, onLogout, setShowMenu, showMenu }) => {
    //Retorna la estructura JSX del componente//
    return (
        //Contenedor principal del header con clase CSS//
        <div className="bioHeaderContainer">
            
            {/* Contenedor del logo con clase CSS 'bioImgContainer' */}
            <div className="bioImgContainer">
                {/* Imagen del logo con:
                    - src: ruta de la imagen
                    - className: clase CSS para estilos
                    - alt: texto alternativo para accesibilidad */}
                <img
                    src="/Logo.jpg"
                    className="bioImg"
                    alt="Logo"
                />
            </div>
            
            {/* Título de la página con clase CSS 'bioMsg' */}
            <h1 className="bioMsg">Bio</h1>
            
            {/* Botón del menú de usuario con:
                - className dinámico (añade 'with-avatar' si existe avatar)
                - onClick que alterna la visibilidad del menú
                - atributos ARIA para accesibilidad */}
            <button
                className={`bioMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
                onClick={() => setShowMenu(!showMenu)}
                aria-expanded={showMenu}
                aria-label="User menu"
            >
                {/* Contenido interno del botón */}
                <div className="bioMenuButton-content">
                    {/* Renderizado condicional del avatar/inicial */}
                    {loggedUser?.avatar ? (
                        //Si existe avatar, muestra la imagen//
                        <img
                            src={loggedUser.avatar}
                            className="bioMenuButton-avatar"
                            alt="User avatar"
                        />
                    ) : (
                        //Si no existe avatar, muestra la inicial del username//
                        <span className="bioMenuButton-initial">
                            {/* Primera letra del username en mayúscula o 'U' por defecto */}
                            {loggedUser?.userName?.[0]?.toUpperCase() || 'U'}
                        </span>
                    )}
                </div>
            </button>

            {/* Menú desplegable (solo visible cuando showMenu es true) */}
            {showMenu && (
                //Contenedor del menú con clase CSS//
                <div className="bioMenuDropContainer">
                    {/* Enlace a Home con:
                        - to: ruta de destino
                        - className: clase CSS
                        - onClick: navegación + cierre del menú */}
                    <Link
                        to="/home"
                        className="bioHomeButton"
                        onClick={() => {
                            navigation.navigateToHome()
                            setShowMenu(false)
                        }}
                    >
                        {/* Icono de casa + texto */}
                        <i className="fas fa-house"></i> Home
                    </Link>

                    {/* Enlace a Perfil */}
                    <Link
                        to="/profile"
                        className="bioProfileButton"
                        onClick={() => {
                            navigation.navigateToProfile()
                            setShowMenu(false)
                        }}
                    >
                        <i className="fas fa-user"></i> Profile
                    </Link>

                    {/* Enlace a Mensajes */}
                    <Link
                        to="/messages"
                        className="bioMessagesButton"
                        onClick={() => {
                            navigation.navigateToMessages();
                            setShowMenu(false);
                        }}
                    >
                        <i className="fas fa-envelope"></i> My Msg
                    </Link>

                    {/* Enlace a Favoritos */}
                    <Link
                        to="/favorites"
                        className="bioFavoritesButton"
                        onClick={() => {
                            navigation.navigateToFavorites()
                            setShowMenu(false)
                        }}
                    >
                        <i className="fas fa-star"></i> My Fav
                    </Link>

                    {/* Botón de Logout */}
                    <button 
                        className="homeLogoutButton" 
                        onClick={onLogout}
                    >
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            )}
        </div>
    )
}

//Exporta el componente como default para poder importarlo desde otros archivos//
export default BioHeader