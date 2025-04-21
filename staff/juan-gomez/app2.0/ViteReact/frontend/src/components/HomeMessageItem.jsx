//Define el componenete funcional HomeMessageItem que recibe props como parámetros//
const HomeMessageItem = ({ 
    message,        //Objeto con los datos del mensaje//       
    author,         //Objeto con los datos del autor//
    navigation,     //Función de navegación//
    loggedUserId,   //Objeto con el id del usuario logueado//
    onLike,         //Función para dar likes//
    onDislike,      //Función para dar dislikes//
    onFavorite,     //Función para dar favoritos//
    users           //Array de usuarios para relacionar likes/dislikes y favoritos//
  }) => {
    //Determina si el usuario actual ha dado like al mensaje//
    const hasLiked = message.likes?.includes(loggedUserId)
    //Determina si el usuario actual ha dado dislike al mensaje//
    const hasDisliked = message.dislikes?.includes(loggedUserId)
    //Cuenta el número total de likes (0 si no hay)//
    const likesCount = message.likes?.length || 0
    //Cuenta el número total de dislikes (0 si no hay)//
    const dislikesCount = message.dislikes?.length || 0

     //Mapea los IDs de usuarios que dieron like a sus nombres de usuario//
    const likedUsers = message.likes?.map(likeUserId => 
      //Busca el usuario correspondiente al ID del like//
      users.find(u => u.id === likeUserId)?.userName || 'Unknown'
    )
    //Mapea los IDs de usuarios que dieron dislike a sus nombres de usuario//
    const dislikedUsers = message.dislikes?.map(dislikeUserId => 
      //Busca el usuario correspondiente al ID del dislike//
      users.find(u => u.id === dislikeUserId)?.userName || 'Unknown'
    )

    //Determina si el usuario actual ha marcado como favorito el mensaje//
    const hasFavorited = message.favorite?.includes(loggedUserId)
  
    //Retorna la estructura JSX del componente//
    return (
      //Contenedor principal del mensaje con clase CSS//
      <div className="homeMessage">
        {/* Contenedor con el usuario que ha redactado el mensaje */}
        <div className="home-message-user">
          User: <span
            className="home-user-name-link"
            //Navega al perfil del autor al hacer click//
            onClick={() => navigation.navigateToBio(author.userName)}
            //Estilos para parecer un enlace clickeable//
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {(author && author.userName) || 'Unknown'}
          </span>
        </div>

        {/* Contenedores para el título del mensaje y el mensaje */}
        <div className="home-message-title">Title: {message.title}</div>
        <div className="home-message-text">Message: {message.msg}</div>

        {/* Muestra la imagen del mensaje si existe */}
        {message.image && (
          //Contenedor para la imagen del mensaje//
          <div className="home-message-image-container">
            <img
              src={message.image}
              alt="User uploaded content"
              className="home-message-image"
            />
          </div>
        )}

        {/* Fecha en la que se emitió el mensaje */}
        <div className="home-message-date">Date: {message.date}</div>
        
        {/* Contenedor para los botones de acción de los mensajes */}
        <div className="home-message-actions">
          { /*Contenedor del botón de like*/ }
          <div className="home-like-container">
            <button
              className="home-like-button"          //Clase CSS//
              onClick={() => onLike(message.date)}  //Ejecuta función onLike//
              aria-label="Like"                     //Accesibilidad//
            >
              {/* Icono de like (sólido si ya dio like, outline si no) */}
              <i className={hasLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
              {/* Contador de likes */}
              <span className="home-message-likes">({likesCount})</span>
            </button>
            {/* Tooltip que muestra usuarios que dieron like (si hay alguno) */}
            {likedUsers.length > 0 && (
              <div className="home-users-tooltip likes-tooltip">
                {/* Muestra los primeros 3 usuarios separados por comas */}
                {likedUsers.slice(0, 3).join(', ')}
                 {/* Si hay más de 3, muestra "+ X more" */}
                {likedUsers.length > 3 && (
                  <span className="home-users-count">
                    {` and ${likedUsers.length - 3} more`}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Contenedor del botón de dislike (estructura similar a like) */}
          <div className="home-dislike-container">
            <button
              className="home-dislike-button"           //Clase CSS//
              onClick={() => onDislike(message.date)}   //Ejecuta la función onDislike//
              aria-label="Dislike"                      //Accesibilidad//
            >
              {/* Icono de dislike (sólido si ya dio dislike, outline si no) */}
              <i className={hasDisliked ? "fas fa-thumbs-down" : "far fa-thumbs-down"}></i>
              {/* Contador de dislikes */}
              <span className="home-message-dislikes">({dislikesCount})</span>
            </button>
            {/* Tooltip que muestra usuarios que dieron dislike (si hay alguno) */}
            {dislikedUsers.length > 0 && (
              <div className="home-users-tooltip dislikes-tooltip">
                {/* Muestra los primeros 3 usuarios separados por comas */}
                {dislikedUsers.slice(0, 3).join(', ')}
                 {/* Si hay más de 3, muestra "+ X more" */}
                {dislikedUsers.length > 3 && (
                  <span className="home-users-count">
                    {` and ${dislikedUsers.length - 3} more`}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Contenedor del botón de favorito */}
          <div className="home-favorite-container">
            <button
              className="home-favorite-button"          //Clase CSS//
              onClick={() => onFavorite(message.date)}  //Ejecuta la función onFavorite//
              aria-label="Favorite"                     //Accesibilidad//
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
  export default HomeMessageItem