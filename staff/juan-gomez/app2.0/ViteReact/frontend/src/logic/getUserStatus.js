//Importamos getUsers//
import { getUsers } from "./getUsers";

//Función para obtener el estado del usuario//
export const getUserStatus = (userId) => {
    const users = getUsers();
    const user = users.find(u => u.id === userId)
    return user?.status || ''
}