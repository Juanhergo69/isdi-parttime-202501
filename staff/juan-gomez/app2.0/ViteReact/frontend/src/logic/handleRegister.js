//Valida formato de email con expresión regular//
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  //texto@texto.texto//
  return emailRegex.test(email);                   //Retorna true si cumple el patrón//
}

//Valida fortaleza de contraseña//
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  //Requiere: 1 minúscula, 1 mayúscula, 1 número, 1 caracter especial y mínimo 6 caracteres//
  return passwordRegex.test(password);
}

//Capitaliza la primera letra de un string//
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1) //Coje primer caracter (mayúscula) + resto del string//
}

//Exporta una función llamada handleRegister que maneja el registro de usuarios//
export const handleRegister = (formData) => {

  // VALIDACIONES INICIALES //

  //Valida el formato del email usando una función auxiliar//
  if (!validateEmail(formData.email)) {
    //Si el email no es válido, rechaza inmediatamente con un error descriptivo//
    return Promise.reject({
      success: false,  // Indica fallo en la operación
      error: 'Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)'
    })
  }

  //Valida que la contraseña cumpla los requisitos de complejidad//
  if (!validatePassword(formData.password)) {
    //Si la contraseña no es válida, rechaza con mensaje de requisitos//
    return Promise.reject({
      success: false,
      error: 'Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character'
    })
  }

  //Compara que password y confirmPassword coincidan//
  if (formData.password !== formData.confirmPassword) {
    //Si no coinciden, rechaza con error//
    return Promise.reject({
      success: false,
      error: 'Passwords are not the same. Please, try again'
    })
  }

  // PREPARACIÓN DE DATOS //

  //Crea un nombre de usuario a partir del email (parte antes del @)//
  //y capitaliza la primera letra usando una función auxiliar//
  const userName = capitalizeFirstLetter(formData.email.split('@')[0])

  //Prepara el objeto con los datos finales para enviar al servidor//
  const userData = {
    email: formData.email,                      //Email del usuario//
    password: formData.password,                //Contraseña//
    confirmPassword: formData.confirmPassword,  //Confirmación de contraseña//
    userName: userName                          //Nombre de usuario generado//
  }

  // PETICIÓN AL SERVIDOR //

  //Realiza petición POST al endpoint de registro//
  return fetch('/api/register', {
    method: 'POST',                         //Método HTTP para crear recursos//
    headers: {
      'Content-Type': 'application/json',  //Indica que enviamos JSON//
    },
    body: JSON.stringify(userData)        //Convierte los datos a string JSON//
  })
    //Primera promesa: maneja la respuesta HTTP//
    .then(response => {
      //Si la respuesta no fue exitosa (status 4xx/5xx)//
      if (!response.ok) {
        //Parsea el cuerpo del error y rechaza con él//
        return response.json().then(error => Promise.reject(error))
      }
      //Si la respuesta es OK, parsea el JSON//
      return response.json()
    })
    //Segunda promesa: maneja los datos parseados//
    .then(data => {
      //Si el registro fue exitoso según el servidor//
      if (data.success) {
        //Retorna objeto con éxito y datos del usuario//
        return {
          success: true,
          user: data.user
        }
      } else {
        //Si el servidor indica fallo, rechaza con los datos de error//
        return Promise.reject(data)
      }
    })
    //Manejo de errores global//
    .catch(error => {
      //Log del error para depuración//
      console.error('Error en handleRegister:', error)

      //Si el error no tiene estructura válida, crea uno estándar//
      if (!error || typeof error !== 'object') {
        return Promise.reject({
          success: false,
          error: 'Registration failed. Please try again later.'
        })
      }
      //Rechaza con el error recibido (ya estructurado)//
      return Promise.reject(error)
    })
}