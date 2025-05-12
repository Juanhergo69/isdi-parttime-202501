//Define el componente funcional FavoritesMessageItem que recibe las siguientes props://
const FavoritesMessageItem = ({
    message,            //- message: objeto con los datos del mensaje//
    users,              //- users: array de usuarios para mostrar información relacionada//
    loggedUserId,       //- loggedUserId: ID del usuario actual para controles de interacción//
    onLike,             //- onLike: función para manejar likes//
    onDislike,          //- onDislike: función para manejar dislikes//
    onFavorite,         //- onFavorite: función para manejar favoritos//
    navigation          //- navigation: objeto para manejar navegación//
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

    //Encuentra el autor del mensaje en el array de usuarios//
    const messageAuthor = users.find(user => user.id === message.userId);

    //Retorna la estructura JSX del componente//
    return (
        //Contenedor principal del mensaje favorito//
        <div className="favorite-message">
            {/* Muestra el autor del mensaje si existe */}
            {messageAuthor && (
                <div className="favorite-message-user">
                    {/* Texto "From:" seguido del nombre del autor */}
                    From: <span
                        className="favorite-user-name-link"
                        //Navega al perfil del autor al hacer click//
                        onClick={() => navigation.navigateToBio(messageAuthor.userName)}
                        //Estilos para parecer un enlace clickeable//
                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {messageAuthor.userName}
                    </span>
                </div>
            )}

            {/* Muestra el título del mensaje */}
            <div className="favorite-message-title">Title: {message.title}</div>
            {/* Muestra el contenido/texto del mensaje */}
            <div className="favorite-message-text">Message: {message.msg}</div>

            {/* Si el mensaje tiene imagen, la muestra */}
            {message.image && (
                <div className="favorite-message-image-container">
                    <img
                        //Verifica si la imagen comienza con 'data:' (ya está en formato data URI)//
                        //Si es true: usa la imagen directamente (ya está formateado)//
                        //Si es false: formatea la imagen (asumiendo que es base64) añadiendo el prefijo//
                        src={message.image.startsWith('data:') ? message.image : `data:image/jpeg;base64,${message.image}`} //URL de la imagen//
                        alt="User uploaded content"         //Texto alternativo//
                        className="favorite-message-image"  //Clase CSS//
                    />
                </div>
            )}

            {/* Muestra la fecha del mensaje */}
            <div className="favorite-message-date">Date: {message.date}</div>

            {/* Contenedor de acciones/interacciones con el mensaje */}
            <div className="favorite-message-actions">
                {/* Contenedor del botón de like */}
                <div className="favorite-like-container">
                    <button
                        className="favorite-like-button"     //Clase CSS//
                        onClick={() => onLike(message.date)} //Ejecuta función onLike//
                        aria-label="Like"                    //Accesibilidad//
                    >
                        {/* Icono de like (sólido si ya dio like, outline si no) */}
                        <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
                        {/* Contador de likes */}
                        <span className="favorite-message-likes">({likesCount})</span>
                    </button>
                    {/* Tooltip que muestra usuarios que dieron like (si hay alguno) */}
                    {likedUsers.length > 0 && (
                        <div className="favorite-users-tooltip likes-tooltip">
                            {/* Muestra los primeros 3 usuarios separados por comas */}
                            {likedUsers.slice(0, 3).join(', ')}
                            {/* Si hay más de 3, muestra "+ X more" */}
                            {likedUsers.length > 3 && (
                                <span className="favorites-users-count">
                                    {` and ${likedUsers.length - 3} more`}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Contenedor del botón de dislike (estructura similar a like) */}
                <div className="favorite-dislike-container">
                    <button
                        className="favorite-dislike-button"
                        onClick={() => onDislike(message.date)}
                        aria-label="Dislike"
                    >
                        {/* Icono de dislike (sólido si ya dio dislike, outline si no) */}
                        <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>
                        {/* Contador de dislikes */}
                        <span className="favorite-message-dislikes">({dislikesCount})</span>
                    </button>
                    {/* Tooltip que muestra usuarios que dieron dislike (si hay alguno) */}
                    {dislikedUsers.length > 0 && (
                        <div className="favorite-users-tooltip dislikes-tooltip">
                            {/* Muestra los primeros 3 usuarios separados por comas */}
                            {dislikedUsers.slice(0, 3).join(', ')}
                            {/* Si hay más de 3, muestra "+ X more" */}
                            {dislikedUsers.length > 3 && (
                                <span className="favorites-users-count">
                                    {` and ${dislikedUsers.length - 3} more`}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Contenedor del botón de favorito */}
                <div className="favorite-favorite-container">
                    <button
                        className="favorite-favorite-button"     //Clase CSS//
                        onClick={() => onFavorite(message.date)} //Ejecuta función onFavorite//
                        aria-label="Favorite"                    //Accesibilidad//
                    >
                        {/* Icono de corazón (sólido si es favorito, outline si no) */}
                        <i className={hasFavorited ? "fas fa-heart" : "far fa-heart"}></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

//Exporta el componente para que pueda ser usado en otros archivos//
export default FavoritesMessageItem