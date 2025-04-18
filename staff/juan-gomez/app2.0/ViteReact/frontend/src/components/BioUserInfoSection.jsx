//Define el componente funcional BioUserInfoSection que recibe como prop://
//- viewedUser: objeto con la información del usuario cuyo perfil se está viendo//
const BioUserInfoSection = ({ viewedUser }) => {
    //Retorna la estructura JSX que muestra la sección de información del usuario//
    return (
        //Contenedor principal de la sección con clase CSS//
        <div className="bio-user-info-section">
            {/* Contenedor del avatar del usuario con clase CSS */}
            <div className="bio-user-avatar">
                {/* Renderizado condicional del avatar: verifica si el usuario tiene avatar */}
                {viewedUser.avatar ? (
                    //Si tiene avatar, muestra la imagen con://
                    //- src: URL de la imagen del avatar//
                    //- alt: texto alternativo descriptivo con el nombre de usuario//
                    //- className: clase CSS para estilizar la imagen//
                    <img
                        src={viewedUser.avatar}
                        alt={`${viewedUser.userName}'s avatar`}
                        className="bio-avatar"
                    />
                ) : (
                    //Si no tiene avatar, muestra un div con la inicial del nombre de usuario//
                    <div className="bio-avatar-initial">
                        {/* Muestra la primera letra del nombre de usuario en mayúscula */}
                        {viewedUser.userName[0].toUpperCase()}
                    </div>
                )}
            </div>

            {/* Muestra el nombre de usuario en un h2 con clase CSS */}
            <h2 className="bio-username">{viewedUser.userName}</h2>

            {/* Renderizado condicional del estado/status del usuario (si existe) */}
            {viewedUser.status && (
                //Contenedor del estado con clase CSS//
                <div className="bio-user-status">
                    {/* Párrafo que muestra el estado del usuario */}
                    <p>{viewedUser.status}</p>
                </div>
            )}
        </div>
    )
}

//Exporta el componente como default para poder importarlo en otros archivos//
export default BioUserInfoSection