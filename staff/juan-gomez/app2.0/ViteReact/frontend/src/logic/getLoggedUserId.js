//Importa STORAGE_kEYS//
import { STORAGE_KEYS } from "../utils/STORAGE_KEYS"

//Obtiene el ID del usuario logueado (de localStorage o sessionStorage)//
export const getLoggedUserId = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ID)) || //Busca en localStorage//
        JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ID)) //Si no, busca en sessionStorage//
}