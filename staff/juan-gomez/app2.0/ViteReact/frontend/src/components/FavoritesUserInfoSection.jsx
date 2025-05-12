//Define el componente funcional FavoritesUserInfoSection que recibe como prop://
//- loggedUser: objeto con la información del usuario logueado//
const FavoritesUserInfoSection = ({ loggedUser }) => {
    //Retorna la estructura JSX que muestra la información del usuario//
    return (
        //Contenedor principal de la sección de información del usuario//
        <div className="favorite-user-info-section">
            {/* Contenedor del avatar del usuario */}
            <div className="user-avatar">
                {/* Renderizado condicional: comprueba si el usuario tiene avatar */}
                {loggedUser?.avatar ? (
                    //Si tiene avatar, muestra la imagen//
                    <img
                        src={
                            loggedUser.avatar.startsWith('data:')               //Verifica si el avatar comienza con 'data:' (ya está en formato data URI)//
                                ? loggedUser.avatar                             //Si es true: usa el avatar directamente (ya está formateado)//
                                : `data:image/jpeg;base64,${loggedUser.avatar}` //Si es false: formatea el avatar (asumiendo que es base64) añadiendo el prefijo//
                        }
                        className="favorite-avatar"
                        alt="User avatar"
                    />
                ) : (
                    //Si no tiene avatar, muestra un círculo con la inicial//
                    <div className="favorite-avatar-initial">
                        {/* Muestra la primera letra del nombre de usuario en mayúscula
                            o 'U' como valor por defecto si no hay nombre */}
                        {loggedUser?.userName?.[0]?.toUpperCase() || 'U'}
                    </div>
                )}
            </div>
            {/* Muestra el nombre de usuario o 'User' como valor por defecto */}
            <h2 className="favorite-username">{loggedUser?.userName || 'User'}</h2>
        </div>
    )
}

//Exporta el componente para que pueda ser importado y utilizado en otros archivos//
export default FavoritesUserInfoSection;