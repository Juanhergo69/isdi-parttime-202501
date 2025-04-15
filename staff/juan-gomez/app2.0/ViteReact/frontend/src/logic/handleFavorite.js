//Importa getMessages//
import { getMessages } from "./getMessages"
//Importa toggleFavorite//
import { toggleFavorite } from "./toggleFavorite"

//Handler para favoritos//
export const handleFavorite = (messageId, loggedUserId) => {
    //Ejecuta la función toggleFavorite pasando://
    //- messageId: identifica el mensaje a modificar//
    //- loggedUserId: identifica al usuario que realiza la acción//
    //Esta función modifica el estado de favorite en el almacenamiento de datos//
    toggleFavorite(messageId, loggedUserId)
    //Retorna una nueva lista actualizada de todos los mensajes//
    //llamando a getMessages() después de realizar el cambio//
    return getMessages()
}