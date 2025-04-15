//Importa getUsers//
import { getUsers } from './getUsers'
//Importa saveUsers//
import { saveUsers } from './saveUsers'
//Importa validateEmail y validatePassword//
import { validateEmail, validatePassword} from '../utils/validators'
//Importa createModal//
import { createModal } from '../utils/createModal'
//Importa capitalizaFirstLetter//
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'

//Exporta la función handleRegister para que pueda ser utilizada en otros módulos//
export const handleRegister = (formData) => {
    //Valida formato de email//
    if (!validateEmail(formData.email)) {
      createModal('Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)')
      return { success: false, user: null }
    }
  
    //Valida fortaleza de contraseña//
    if (!validatePassword(formData.password)) {
      createModal('Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character');
      return { success: false, user: null }
    }
  
    //Verifica que las contraseñas coincidan//
    if (formData.password !== formData['confirmation-password']) {
      createModal('Passwords are not the same. Please, try again')
      return { success: false, user: null }
    }
  
    //Obtiene usuarios existentes//
    const users = getUsers()
    //Verifica si el email ya está registrado//
    const doesUserExist = users.some(user => user.email === formData.email)
  
    if (doesUserExist) {
      createModal('This mail is already in use')
      return { success: false, user: null }
    }
  
    //Crea nombre de usuario a partir del email//
    const userName = formData.email.split('@')[0]
    //Capitaliza la primera letra del nombre de usuario//
    const capitalizedUserName = capitalizeFirstLetter(userName)
    //Crea objeto con datos del nuevo usuario//
    const userCreated = {
      email: formData.email,
      password: formData.password,
      userName: capitalizedUserName,
      id: Date.now()
    }
  
    //Agrega el nuevo usuario al array//
    users.push(userCreated)
    //Guarda los usuarios actualizados//
    saveUsers(users)
  
    return { success: true, user: userCreated }
  }