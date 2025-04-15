//Importa getUsers//
import { getUsers } from './getUsers'
//Importa createModal//
import { createModal } from '../utils/createModal'

export const handleLogin = (formData) => {
    const users = getUsers();
    const user = users.find(user => user.email === formData.email);

    if (!user) {
        createModal('The email is not registered yet. Please, create an account first');
        return { 
            success: false,
            shouldRedirect: true
        };
    }

    if (user.password !== formData.password) {
        createModal('Incorrect password, Please, try again');
        return { 
            success: false,
            shouldRedirect: false
        }
    }

    return { 
        success: true, 
        user: user,
        rememberSession: formData.rememberme
    }
}