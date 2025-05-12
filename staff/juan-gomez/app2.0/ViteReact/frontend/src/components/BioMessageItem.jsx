//Define el componente funcional BioMessageItem que recibe las siguientes props://
const BioMessageItem = ({
    message,                //- message: objeto con los datos del mensaje//
    users,                  //- users: array de información de usuarios//
    loggedUserId,           //- loggedUserId: ID del usuario actualmente logueado//
    onLike,                 //- onLike: función para manejar el evento de like//
    onDislike,              //- onDislike: función para manejar el evento de dislike//
    onFavorite              //- onFavorite: función para manejar el evento de favorito//
}) => {
    //Determina si el usuario actual ha dado like al mensaje//
    const hasLiked = message.likes?.includes(loggedUserId.toString())
    //Determina si el usuario actual ha dado dislike al mensaje//
    const hasDisliked = message.dislikes?.includes(loggedUserId.toString())
    //Determina si el usuario actual ha marcado como favorito el mensaje//
    const hasFavorited = message.favorite?.includes(loggedUserId.toString())
    //Cuenta el número total de likes (0 si no hay)//
    const likesCount = message.likes?.length || 0
    //Cuenta el número total de dislikes (0 si no hay)//
    const dislikesCount = message.dislikes?.length || 0

    //Mapea los IDs de usuarios que dieron like a sus nombres de usuario//
    const likedUsers = message.likes?.map(likeUserId => {
        //Busca el usuario correspondiente al ID del like//
        const user = users.find(user => user.id === likeUserId)
        //Devuelve el nombre de usuario o 'Unknown' si no se encuentra//
        return user ? user.userName : 'Unknown'
    }) || [] //Array vacío si no hay likes//                                                 

    //Mapea los IDs de usuarios que dieron dislike a sus nombres de usuario//
    const dislikedUsers = message.dislikes?.map(dislikeUserId => {
        //Busca el usuario correspondiente al ID del dislike//
        const user = users.find(user => user.id === dislikeUserId)
        //Devuelve el nombre de usuario o 'Unknown' si no se encuentra//
        return user ? user.userName : 'Unknown'
    }) || [] //Array vacío si no hay dislikes//                                                     

    //Retorna la estructura JSX del componente//
    return (
        //Contenedor principal del mensaje con clase CSS//
        <div className="bio-message">
            {/* Muestra el título del mensaje con clase CSS */}
            <div className="bio-message-title">Title: {message.title}</div>
            {/* Muestra el contenido/texto del mensaje con clase CSS */}
            <div className="bio-message-text">Message: {message.msg}</div>

            {/* Renderizado condicional de la imagen del mensaje (si existe) */}
            {message.image && (
                //Contenedor de la imagen con clase CSS//
                <div className="bio-message-image-container">
                    {/* Imagen del mensaje con:
                        - src: URL de la imagen
                        - alt: texto alternativo
                        - className: clase CSS para estilos */}
                    <img
                        //Verifica si la imagen comienza con 'data:' (ya está en formato data URI)//
                        //Si es true: usa la imagen directamente (ya está formateado)//
                        //Si es false: formatea la imagen (asumiento que es base 64) añadiendo el prefijo//
                        src={message.image.startsWith('data:') ? message.image : `data:image/jpeg;base64,${message.image}`}
                        alt="User uploaded content"
                        className="bio-message-image"
                    />
                </div>
            )}

            {/* Muestra la fecha del mensaje con clase CSS 'bio-message-date' */}
            <div className="bio-message-date">Date: {message.date}</div>

            {/* Contenedor de acciones/interacciones con clase CSS 'bio-message-actions' */}
            <div className="bio-message-actions">
                {/* Contenedor del botón de like con clase CSS 'bio-like-container' */}
                <div className="bio-like-container">
                    {/* Botón de like con:
                        - className: clase CSS
                        - onClick: función que maneja el like usando la fecha como ID
                        - aria-label: etiqueta para accesibilidad */}
                    <button
                        className="bio-like-button"
                        onClick={() => onLike(message.date)}
                        aria-label="Like"
                    >
                        {/* Icono de like (sólido si ya dio like, outline si no) */}
                        <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
                        {/* Contador de likes */}
                        <span className="bio-message-likes">({likesCount})</span>
                    </button>
                    {/* Tooltip que muestra usuarios que dieron like (si hay alguno) */}
                    {likedUsers.length > 0 && (
                        <div className="bio-users-tooltip likes-tooltip">
                            {/* Muestra los primeros 3 usuarios separados por comas */}
                            {likedUsers.slice(0, 3).join(', ')}
                            {/* Si hay más de 3, muestra "+ X more" */}
                            {likedUsers.length > 3 && (
                                <span className="bio-users-count">
                                    {` and ${likedUsers.length - 3} more`}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Contenedor del botón de dislike (estructura similar a like) */}
                <div className="bio-dislike-container">
                    <button
                        className="bio-dislike-button"
                        onClick={() => onDislike(message.date)}
                        aria-label="Dislike"
                    >
                        {/* Icono de dislike (sólido si ya dio dislike, outline si no) */}
                        <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>
                        {/* Contador de dislikes */}
                        <span className="bio-message-dislikes">({dislikesCount})</span>
                    </button>
                    {/* Tooltip que muestra usuarios que dieron dislike (si hay alguno) */}
                    {dislikedUsers.length > 0 && (
                        <div className="bio-users-tooltip dislikes-tooltip">
                            {/* Muestra los primeros 3 usuarios separados por comas */}
                            {dislikedUsers.slice(0, 3).join(', ')}
                            {/* Si hay más de 3, muestra "+ X more" */}
                            {dislikedUsers.length > 3 && (
                                <span className="bio-users-count">
                                    {` and ${dislikedUsers.length - 3} more`}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Contenedor del botón de favorito con clase CSS 'bio-favorite-container' */}
                <div className="bio-favorite-container">
                    {/* Botón de favorito con:
                        - className: clase CSS
                        - onClick: función que maneja el favorito usando la fecha como ID
                        - aria-label: etiqueta para accesibilidad */}
                    <button
                        className="bio-favorite-button"
                        onClick={() => onFavorite(message.date)}
                        aria-label="Favorite"
                    >
                        {/* Icono de corazón (sólido si es favorito, outline si no) */}
                        <i className={hasFavorited ? "fas fa-heart" : "far fa-heart"}></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

//Exporta el componente como default para poder importarlo en otros archivos//
export default BioMessageItem