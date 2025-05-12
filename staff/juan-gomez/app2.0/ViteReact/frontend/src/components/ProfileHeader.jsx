//Importa el componente Link de react-router-dom para la navegación entre páginas//
import { Link } from 'react-router-dom'

//Componente funcional ProfileHeader que recibe varias props como parámetros//
const ProfileHeader = ({
    loggedUser,         //Objeto con información del usuario logueado//
    navigation,         //Objeto con métodos de navegación//
    onLogout,           //Función para manejar el logout//
    setShowMenu,        //Función para mostrar/ocultar el menú desplegable//
    showMenu,           //Estado booleano que indica si el menú está visible//
    setShowStatusForm,  //Función para mostrar/ocultar el formulario de estado//
    showStatusForm      //Estado booleano que indica si el formulario de estado está visible//
}) => {
    return (
        //Contenedor principal del header de perfil//
        <div className="profileHeaderContainer">
            {/* Contenedor de la imagen de perfil */}
            <div className="profileImgContainer">
                {/* Imagen del logo */}
                <img src="/Logo.jpg" className="profileImg" alt="Logo" />
                {/* Botón para alternar la visibilidad del formulario de estado */}
                <button
                    className="profile-toggleStatusFormButton"
                    onClick={() => setShowStatusForm(!showStatusForm)}
                >
                    {/* Texto del botón cambia según el estado del formulario */}
                    {showStatusForm ? 'Hide Form' : 'New Status'}
                </button>
            </div>

            {/* Título de edición de perfil */}
            <h1 className="profileMsg">Edit Profile</h1>

            {/* Botón del menú de usuario */}
            <button
                //Clases condicionales basadas en si el usuario tiene avatar//
                className={`profileMenuButton ${loggedUser?.avatar ? 'with-avatar' : ''}`}
                onClick={() => setShowMenu(!showMenu)}  //Alterna la visibilidad del menú//
                aria-expanded={showMenu}  //Atributo de accesibilidad//
                aria-label="User menu"    //Etiqueta para accesibilidad//
            >
                {/* Contenido del botón del menú */}
                <div className="profileMenuButton-content">
                    {/* Si el usuario tiene avatar, lo muestra */}
                    {loggedUser?.avatar ? (
                        <img
                            src={
                                loggedUser.avatar.startsWith('data:')               //Verifica si el avatar comienza con 'data:' (ya está en formato data URI)//          
                                    ? loggedUser.avatar                             //Si es true: usa el avatar directamente (ya está formateado)//
                                    : `data:image/jpeg;base64,${loggedUser.avatar}` //Si es false: formatea el avatar (asumiendo que es base64) añadiendo el prefijo//
                            }
                            className="profileMenuButton-avatar"
                            alt="User avatar"
                        />
                    ) : (
                        //Si no tiene avatar, muestra la inicial del nombre de usuario//
                        <span className="profileMenuButton-initial">
                            {(loggedUser?.userName?.[0]?.toUpperCase()) || 'U'}
                        </span>
                    )}
                </div>
            </button>

            {/* Menú desplegable que se muestra solo cuando showMenu es true */}
            {showMenu && (
                <div className="profileMenuDropContainer">
                    {/* Enlace/botón para ir a Home */}
                    <Link
                        to="/home"
                        className="profileHomeButton"
                        onClick={() => {
                            navigation.navigateToHome()  //Navega a home//
                            setShowMenu(false)           //Cierra el menú//
                        }}
                    >
                        {/* Icono y texto */}
                        <i className="fas fa-house"></i> Home
                    </Link>

                    {/* Enlace/botón para ir a Mensajes */}
                    <Link
                        to="/messages"
                        className="profileMessagesButton"
                        onClick={() => {
                            navigation.navigateToMessages()  //Navega a mensajes//
                            setShowMenu(false)               //Cierra el menú//
                        }}
                    >
                        <i className="fas fa-envelope"></i> My Msg
                    </Link>

                    {/* Enlace/botón para ir a Favoritos */}
                    <Link
                        to="/favorites"
                        className="profileFavoritesButton"
                        onClick={() => {
                            navigation.navigateToNotFound()  //Navega a "no encontrado"//
                            setShowMenu(false)               //Cierra el menú//
                        }}
                    >
                        <i className="fas fa-star"></i> My Fav
                    </Link>

                    {/* Botón para cerrar sesión */}
                    <button className="profileLogoutButton" onClick={onLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            )}
        </div>
    )
}

//Exporta el componente para poder usarlo en otros archivos//
export default ProfileHeader