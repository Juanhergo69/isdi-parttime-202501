//Importa getMessages//
import { getMessages } from './getMessages'
//Importa toggleLike//
import { toggleLike } from './toggleLike'

//Handler para likes//
export const handleLike = (messageId, loggedUserId) => {
    //Ejecuta la función toggleLike pasando://
    //- messageId: identifica el mensaje a modificar//
    //- loggedUserId: identifica al usuario que realiza la acción//
    //Esta función modifica el estado de like en el almacenamiento de datos//
    toggleLike(messageId, loggedUserId)

    //Retorna una nueva lista actualizada de todos los mensajes//
    //llamando a getMessages() después de realizar el cambio//
    return getMessages()
}