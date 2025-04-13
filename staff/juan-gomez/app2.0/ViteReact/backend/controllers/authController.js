//Importa el módulo 'fs' (File System) para trabajar con el sistema de archivos//
const fs = require('fs');
//Importa el módulo 'path' para trabajar con rutas de archivos y directorios//
const path = require('path');

//Define la ruta al archivo JSON donde se almacenarán los usuarios//
//__dirname representa el directorio actual y '../storage/users.json' es la ruta relativa al archivo//
const USERS_FILE = path.join(__dirname, '../storage/users.json')

//Función para leer todos los usuarios desde el archivo JSON//
const getUsers = () => {
    try {
        //Lee el contenido del archivo de usuarios de forma síncrona con codificación UTF-8//
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        //Parsea el contenido JSON a un objeto JavaScript y lo retorna//
        return JSON.parse(data);
    } catch (err) {
        //Si ocurre un error (ej. archivo no existe), retorna un array vacío//
        return []
    }
}

//Función para guardar la lista de usuarios en el archivo JSON//
const saveUsers = (users) => {
    //Escribe los datos en el archivo de forma síncrona//
    //Convierte el objeto JavaScript a formato JSON con formato legible (2 espacios de indentación)//
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

//Función para capitalizar la primera letra de un string//
const capitalizeFirstLetter = (str) => {
    //Toma el primer carácter, lo convierte a mayúscula y lo concatena con el resto del string//
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//Función para validar el formato de un email//
const validateEmail = (email) => {
    //Expresión regular para validar formato básico de email (texto@texto.texto)//
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //Retorna true si el email coincide con el patrón//
    return emailRegex.test(email)
}

//Función para validar la fortaleza de una contraseña//
const validatePassword = (password) => {
    // Expresión regular que requiere:
    // - Al menos una minúscula (?=.*[a-z])
    // - Al menos una mayúscula (?=.*[A-Z])
    // - Al menos un número (?=.*\d)
    // - Al menos un carácter especial (?=.*[@$!%*?&])
    // - Mínimo 6 caracteres {6,}
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    //Retorna true si la contraseña cumple con todos los requisitos//
    return passwordRegex.test(password)
}

//Controlador para el proceso de login//
exports.login = (req, res) => {
    //Extrae email, password y rememberme del cuerpo de la solicitud//
    const { email, password, rememberme } = req.body
    
    //Obtiene todos los usuarios registrados//
    const users = getUsers()
    
    //Busca un usuario que coincida con el email proporcionado//
    const user = users.find(u => u.email === email)
    
    //Si no encuentra el usuario, retorna error 401 (No autorizado)//
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'The email is not registered yet. Please, create an account first'
        });
    }
    
    //Si la contraseña no coincide, retorna error 401 (No autorizado)//
    if (user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Incorrect password, Please, try again'
        });
    }
    
    //Si las credenciales son correctas, retorna éxito con el ID de usuario y opción rememberme//
    res.json({
        success: true,
        userId: user.id,
        rememberme: rememberme || false
    })
}

//Controlador para el proceso de registro//
exports.register = (req, res) => {
    //Extrae los datos del cuerpo de la solicitud//
    const { email, password, confirmationPassword } = req.body
    //Obtiene todos los usuarios registrados//
    const users = getUsers()

    //Valida el formato del email//
    if (!validateEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Email must contain text + @ + text + valid termination (example .com, .es, .net, etc...)'
        })
    }

    //Valida la fortaleza de la contraseña//
    if (!validatePassword(password)) {
        return res.status(400).json({
            success: false,
            message: 'Password must contain 6 characters, 1 upper letter, 1 lower letter, 1 number and 1 special character'
        })
    }

    //Verifica que la contraseña y su confirmación coincidan//
    if (password !== confirmationPassword) {
        return res.status(400).json({
            success: false,
            message: 'Passwords are not the same. Please, try again'
        })
    }

    //Verifica si el email ya está registrado//
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: 'This mail is already in use'
        })
    }

    //Crea un nombre de usuario a partir del email (parte antes del @)//
    const userName = email.split('@')[0];
    //Capitaliza la primera letra del nombre de usuario//
    const capitalizedUserName = capitalizeFirstLetter(userName);
    //Crea el nuevo objeto usuario//
    const newUser = {
        email,
        password,
        userName: capitalizedUserName,
        id: Date.now() //Usa el timestamp actual como ID único//
    }

    //Agrega el nuevo usuario al array de usuarios//
    users.push(newUser)
    //Guarda los usuarios actualizados en el archivo//
    saveUsers(users)

    //Retorna respuesta exitosa con código 201//
    res.status(201).json({
        success: true,
        userId: newUser.id,
        message: 'User registered successfully'
    })
}