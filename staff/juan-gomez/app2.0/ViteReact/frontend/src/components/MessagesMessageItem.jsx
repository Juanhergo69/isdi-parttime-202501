//Define el componente funcional MessagesMessageItem que recibe props://
//- message: objeto con los datos del mensaje//
//- users: array de usuarios para relacionar likes/dislikes//
//- handleDelete: función para eliminar este mensaje//
const MessagesMessageItem = ({ message, users, handleDelete }) => {
    //Calcula el número de likes (si no hay, usa 0 como valor por defecto)//
    const likesCount = message.likes?.length || 0
    
    //Calcula el número de dislikes (si no hay, usa 0 como valor por defecto)//
    const dislikesCount = message.dislikes?.length || 0
    
    //Mapea los IDs de usuarios que dieron like a sus nombres de usuario//
    //Si no encuentra el usuario, devuelve 'Unknown'//
    const likedUsers = message.likes?.map(likeUserId => {
        //Busca el usuario correspondiente al ID del like//
        const user = users.find(user => user.id === likeUserId)
        //Devuelve el nombre de usuario o 'Unknown' si no se encuentra//
        return user ? user.userName : 'Unknown'
    }) || [] //Si no hay likes, devuelve array vacío//
    
    //Mapea los IDs de usuarios que dieron dislike a sus nombres de usuario//
    //Si no encuentra el usuario, devuelve 'Unknown'//
    const dislikedUsers = message.dislikes?.map(dislikeUserId => {
        //Busca el usuario correspondiente al ID del dislike//
        const user = users.find(user => user.id === dislikeUserId)
        //Devuelve el nombre de usuario o 'Unknown' si no se encuentra//
        return user ? user.userName : 'Unknown';
    }) || [] //Si no hay dislikes, devuelve array vacío//

    //Retorna la estructura JSX del componente//
    return (
        //Contenedor principal del mensaje//
        <div className="message">
            {/* Muestra el título del mensaje */}
            <div className="message-title">Title: {message.title}</div>
            
            {/* Muestra el contenido/texto del mensaje */}
            <div className="message-text">Message: {message.msg}</div>

            {/* Si el mensaje tiene imagen, la muestra */}
            {message.image && (
                <div className="message-image-container">
                    <img
                        src={message.image}         //URL de la imagen//
                        alt="User uploaded content" //Texto alternativo//
                        className="message-image"   //Clase CSS//
                    />
                </div>
            )}

            {/* Muestra la fecha del mensaje */}
            <div className="message-date">Date: {message.date}</div>

            {/* Contenedor de estadísticas (likes/dislikes) */}
            <div className="message-stats">
                {/* Contenedor de likes */}
                <div className="messages-like-container">
                    {/* Estadísticas de likes (icono + contador) */}
                    <div className="messages-like-stats">
                        <i className="fas fa-thumbs-up"></i> {/* Icono de like */}
                        <span className="message-likes">({likesCount})</span> {/* Contador */}
                    </div>
                    {/* Tooltip que muestra los usuarios que dieron like (si hay alguno) */}
                    {likedUsers.length > 0 && (
                        <div className="messages-users-tooltip likes-tooltip">
                            {/* Muestra los primeros 3 usuarios separados por comas */}
                            {likedUsers.slice(0, 3).join(', ')}
                            {/* Si hay más de 3, muestra "+ X more" */}
                            {likedUsers.length > 3 && (
                                <span className="messages-users-count">
                                    {` and ${likedUsers.length - 3} more`}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Contenedor de dislikes (misma estructura que likes) */}
                <div className="messages-dislike-container">
                    {/* Estadísticas de dislikes (icono + contador) */}
                    <div className="messages-dislike-stats">
                        <i className="fas fa-thumbs-down"></i> {/* Icono de dislike */}
                        <span className="message-dislikes">({dislikesCount})</span> {/* Contador */}
                    </div>
                    {/* Tooltip que muestra usuarios que dieron dislike (si hay alguno) */}
                    {dislikedUsers.length > 0 && (
                        <div className="messages-users-tooltip dislikes-tooltip">
                            {/* Muestra los primeros 3 usuarios separados por comas */}
                            {dislikedUsers.slice(0, 3).join(', ')}
                            {/* Si hay más de 3, muestra "+ X more" */}
                            {dislikedUsers.length > 3 && (
                                <span className="messages-users-count">
                                    {` and ${dislikedUsers.length - 3} more`}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Botón para eliminar el mensaje */}
            <button
                className="messages-delete-message-button" //Clase CSS//
                onClick={() => handleDelete(message.date)} //Ejecuta handleDelete con la fecha como ID//
            >
                <i className="fas fa-trash"></i> {/* Icono de basura */}
                Delete {/* Texto del botón */}
            </button>
        </div>
    )
}

//Exporta el componente para poder usarlo en otros archivos//
export default MessagesMessageItem