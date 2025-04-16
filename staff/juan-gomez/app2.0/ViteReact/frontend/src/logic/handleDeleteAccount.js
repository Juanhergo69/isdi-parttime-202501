//Importa getUsers//
import { getUsers } from './getUsers'
//Importa saveUsers//
import { saveUsers } from './saveUsers'
//Importa getMessages//
import { getMessages } from './getMessages'
//Importa saveMessages//
import { saveMessages } from './saveMessages'
//Importa getLoggedUserId//
import { getLoggedUserId } from './getLoggedUserId'

//Función para borrar cuenta de usuario//
export const handleDeleteAccount = () => {
    //1. Obtenemos todos los datos necesarios//
    const users = getUsers()
    const messages = getMessages()
    const userId = getLoggedUserId()

    if (!userId) { //Si no existe id de usuario//
        throw new Error('No user logged in') //Mostrar error//
    }

    //2. Eliminar al usuario//
    const updatedUsers = users.filter(user => user.id !== userId) //Filtramos//
    saveUsers(updatedUsers) //Guardamos lista de usuarios//

    //3. Eliminar mensajes del usuario//
    const updatedMessages = messages.filter(message => message.userId !== userId)

    //4. Eliminar interacciones del usuario//
    const finalMessages = updatedMessages.map(message => ({
        ...message,
        likes: message.likes.filter(like => like !== userId),
        dislikes: message.dislikes.filter(dislike => dislike !== userId)
    }))
    saveMessages(finalMessages)

    //5. Limpiar almacenamiento//
    localStorage.removeItem('id')
    sessionStorage.removeItem('id')

    return true
}