//Importa el componente BioMessageItem desde el archivo local para renderizar cada mensaje individual//
import BioMessageItem from './BioMessageItem'

//Define el componente funcional BioMessagesList que recibe las siguientes props://
const BioMessageList = ({ 
    messages,               //- messages: array de todos los mensajes disponibles//
    users,                  //- users: array de información de usuarios//
    userName,               //- userName: nombre del usuario cuyo perfil se está viendo//
    loggedUserId,           //- loggedUserId: ID del usuario actualmente logueado//
    onLike,                 //- onLike: función para manejar el evento de like//
    onDislike,              //- onDislike: función para manejar el evento de dislike//
    onFavorite              //- onFavorite: función para manejar el evento de favorito//
}) => {
    //Filtra los mensajes para obtener solo los del usuario que se está viendo//
    const userMessages = messages.filter(message => {
        //Encuentra el autor del mensaje en el array de usuarios//
        const messageAuthor = users.find(user => user.id === message.userId)
        //Retorna true si el autor existe y coincide con el userName buscado//
        return messageAuthor && messageAuthor.userName === userName
    })

    //Retorna la estructura JSX del componente//
    return (
        //Contenedor principal de la lista de mensajes con clase CSS//
        <div className="bioMsgContainer">
            {/* Operador ternario para manejar cuando hay o no mensajes */}
            {userMessages.length > 0 ? (
                //Si hay mensajes, los mapea para renderizar cada uno//
                userMessages.map((message) => (
                    //Componente BioMessageItem para cada mensaje con sus props://
                    //- key: identificador único usando la fecha del mensaje//
                    //- message: objeto con los datos del mensaje actual//
                    //- users: array de usuarios para mostrar información relacionada//
                    //- loggedUserId: ID del usuario logueado para controles de interacción//
                    //- onLike: función para manejar likes en este mensaje//
                    //- onDislike: función para manejar dislikes en este mensaje//
                    //- onFavorite: función para manejar favoritos en este mensaje//
                    <BioMessageItem
                        key={message.date}
                        message={message}
                        users={users}
                        loggedUserId={loggedUserId}
                        onLike={onLike}
                        onDislike={onDislike}
                        onFavorite={onFavorite}
                    />
                ))
            ) : (
                //Si no hay mensajes, muestra un mensaje indicando que no hay publicaciones//
                <div className="bio-no-messages">This user hasn't posted any messages yet.</div>
            )}
        </div>
    )
}

//Exporta el componente para que pueda ser importado y usado en otros archivos//
export default BioMessageList