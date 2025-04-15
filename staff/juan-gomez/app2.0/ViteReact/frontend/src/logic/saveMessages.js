//Importamos STORAGE_KEYS//
import { STORAGE_KEYS } from "../utils/STORAGE_KEYS"

//Guarda la lista de mensajes en localStorage//
export const saveMessages = (messages) => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
}