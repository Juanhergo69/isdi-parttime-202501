//Importa getUsers//
import { getUsers } from "./getUsers"

//Función para guardar el estado del usuario//
export const saveUserStatus = (userId, status) => {
    const users = getUsers();
    const updatedUsers = users.map(user => {
        if (user.id === userId) {
            return { ...user, status }
        }
        return user
    })
    localStorage.setItem('users', JSON.stringify(updatedUsers))
}