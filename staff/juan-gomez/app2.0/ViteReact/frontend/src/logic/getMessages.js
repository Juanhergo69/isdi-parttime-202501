//Importamos STORAGE_KEYS//
import { STORAGE_KEYS } from "../utils/STORAGE_KEYS"

//Obtiene todos los mensajes almacenados//
export const getMessages = () => {
    const messagesJson = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    return messagesJson ? JSON.parse(messagesJson) : [] //Retorna mensajes o array vacío//
}