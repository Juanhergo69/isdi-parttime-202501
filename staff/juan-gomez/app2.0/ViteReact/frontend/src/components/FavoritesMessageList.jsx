//Importa el componente FavoritesMessageItem desde el archivo local//
//para renderizar cada mensaje favorito individualmente//
import FavoritesMessageItem from './FavoritesMessageItem'

//Define el componente funcional FavoritesMessageList que recibe props://
const FavoritesMessageList = ({ 
    favoriteMessages,       //- favoriteMessages: array de mensajes marcados como favoritos//
    users,                  //- users: array de información de usuarios//
    loggedUserId,           //- loggedUserId: ID del usuario actual//
    onLike,                 //- onLike: función para manejar likes//
    onDislike,              //- onDislike: función para manejar dislikes//
    onFavorite,             //- onFavorite: función para manejar favoritos//
    navigation              //- navigation: objeto para manejar navegación//
}) => {
    //Retorna la estructura JSX del componente//
    return (
        //Contenedor principal de la lista de mensajes favoritos//
        <div className="favoriteMsgContainer">
            {/* Operador ternario para manejar mensajes vacíos/favoritos existentes */}
            {favoriteMessages.length > 0 ? (
                //Si hay mensajes favoritos, mapea cada uno para renderizarlo//
                favoriteMessages.map((message) => (
                    //Componente FavoritesMessageItem para cada mensaje favorito//
                    //con las siguientes props://
                    //- key: identificador único usando la fecha del mensaje//
                    //- message: objeto con datos del mensaje actual//
                    //- users: información de usuarios para mostrar datos relacionados//
                    //- loggedUserId: ID del usuario para controles de interacción//
                    //- onLike: función para manejar likes en este mensaje//
                    //- onDislike: función para manejar dislikes en este mensaje//
                    //- onFavorite: función para manejar favoritos en este mensaje//
                    //- navigation: objeto para navegación a perfiles de usuario//
                    <FavoritesMessageItem
                        key={message.date}
                        message={message}
                        users={users}
                        loggedUserId={loggedUserId}
                        onLike={onLike}
                        onDislike={onDislike}
                        onFavorite={onFavorite}
                        navigation={navigation}
                    />
                ))
            ) : (
                //Si no hay mensajes favoritos, muestra mensaje indicando que no hay favoritos//
                <div className="favorite-no-messages">
                    You haven't favorited any messages yet.
                </div>
            )}
        </div>
    )
}

//Exporta el componente para que pueda ser importado y usado en otros archivos//
export default FavoritesMessageList