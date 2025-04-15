//Importa getMessages//
import { getMessages } from './getMessages'
//Importa toggleDislike//
import { toggleDislike } from './toggleDislike'

//Handler para dislikes//
export const handleDislike = (messageId, loggedUserId) => {
    //Ejecuta la función toggleDislike pasando://
    //- messageId: identifica el mensaje a modificar//
    //- loggedUserId: identifica al usuario que realiza la acción//
    //Esta función modifica el estado de dislike en el almacenamiento de datos//
    toggleDislike(messageId, loggedUserId);
    
    //Retorna una nueva lista actualizada de todos los mensajes//
    //llamando a getMessages() después de realizar el cambio//
    return getMessages()
}