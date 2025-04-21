//Objeto con constantes para las claves de almacenamiento//
export const STORAGE_KEYS = {
  USERS: 'users',       //Clave para usuarios en localStorage//
  MESSAGES: 'messages', //Clave para mensajes//
  ID: 'id'              //Clave para ID de usuario//
}

//Obtiene todos los usuarios almacenados//
export const getUsers = () => {
  const usersJson = localStorage.getItem(STORAGE_KEYS.USERS) //Obtiene datos como JSON string//
  return usersJson ? JSON.parse(usersJson) : [] //Convierte a objeto JS o retorna array vacío//
}

//Guarda la lista de usuarios en localStorage//
export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)) //Convierte a JSON y guarda//
}

//Valida formato de email con expresión regular//
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ //texto@texto.texto//
  return emailRegex.test(email); //Retorna true si cumple el patrón//
}

//Valida fortaleza de contraseña//
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  //Requiere: 1 minúscula, 1 mayúscula, 1 número, 1 caracter especial y mínimo 6 caracteres//
  return passwordRegex.test(password)
}

//Capitaliza la primera letra de un string//
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1) //Coje primer caracter (mayúscula) + resto del string//
}

//Exporta la función handleRegister para que pueda ser utilizada en otros módulos//
export const handleRegister = (formData) => {
  //Valida formato de email//
  if (!validateEmail(formData.email)) {
    return {
      success: false,                                                                                       //Si no hay éxito//
      error: 'Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)'     //Devuelve mensaje de error//
    }
  }

  //Valida fortaleza de contraseña//
  if (!validatePassword(formData.password)) {
    return {
      success: false,                                                                                                 //Si no hay exito//
      error: 'Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character'   //Devuelve mensaje de error//
    }
  }

  //Verifica que las contraseñas coincidan//
  if (formData.password !== formData['confirmation-password']) {
    return {
      success: false,                                         //Si no hay éxito//
      error: 'Passwords are not the same. Please, try again'  //Devuelve mensaje de error//
    }
  }

  //Obtiene usuarios existentes//
  const users = getUsers()
  //Verifica si el email ya está registrado//
  const doesUserExist = users.some(user => user.email === formData.email)

  if (doesUserExist) {
    return {
      success: false,                       //Si no hay éxito//
      error: 'This mail is already in use'  //Devuelve mensaje de error//
    }
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

  return { success: true, user: userCreated } //Devuelve el éxito y el usuario creado//
}