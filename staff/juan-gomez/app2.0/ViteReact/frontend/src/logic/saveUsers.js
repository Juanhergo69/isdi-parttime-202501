//Importamos STORAGE_KEYS//
import { STORAGE_KEYS } from "../utils/STORAGE_KEYS"

//Guarda la lista de usuarios en localStorage//
export const saveUsers = (users) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)) //Convierte a JSON y guarda//
}