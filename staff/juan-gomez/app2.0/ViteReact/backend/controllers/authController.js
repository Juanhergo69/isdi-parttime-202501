//Importa el módulo 'fs' (File System) de Node.js para operaciones de sistema de archivos//
const fs = require('fs');
//Importa el módulo 'path' de Node.js para manejar y transformar rutas de archivos//
const path = require('path');

//Define la ruta completa al archivo JSON de usuarios usando path.join para compatibilidad entre sistemas//
//__dirname representa el directorio actual del archivo//
const USERS_FILE = path.join(__dirname, '../storage/users.json')

//Función para leer todos los usuarios desde el archivo JSON//
const getUsers = () => {
    try {
        //Lee el contenido del archivo de forma síncrona con codificación UTF-8//
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        //Convierte el contenido de texto JSON a un objeto JavaScript//
        return JSON.parse(data)
    } catch (err) {
        //Si hay error (ej. archivo no existe), devuelve array vacío//
        return []
    }
}

//Función para guardar la lista de usuarios en el archivo JSON//
const saveUsers = (users) => {
    //Escribe el array de usuarios en el archivo, convirtiéndolo a JSON formateado//
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

//Controlador para obtener información del usuario actual//
exports.getCurrentUser = (req, res) => {
    //Convierte el ID de usuario de los parámetros de la ruta a número entero//
    const userId = parseInt(req.params.userId);
    //Obtiene todos los usuarios registrados//
    const users = getUsers();
    //Busca el usuario con el ID correspondiente//
    const user = users.find(u => u.id === userId);
    
    //Si no encuentra el usuario, devuelve error 404//
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
    }
    
    //Devuelve los datos del usuario (excluyendo información sensible como password)//
    res.json({
        success: true,
        user: {
            id: user.id,
            userName: user.userName,
            email: user.email
        }
    })
}

//Función para capitalizar la primera letra de un string//
const capitalizeFirstLetter = (str) => {
    //Toma el primer carácter, lo convierte a mayúscula y lo concatena con el resto//
    return str.charAt(0).toUpperCase() + str.slice(1)
}

//Función para validar el formato de un email//
const validateEmail = (email) => {
    //Expresión regular que verifica estructura básica de email (texto@texto.texto)//
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //Retorna true si el email coincide con el patrón//
    return emailRegex.test(email);
}

//Función para validar la fortaleza de una contraseña//
const validatePassword = (password) => {
    // Expresión regular que verifica:
    // - Al menos una minúscula (?=.*[a-z])
    // - Al menos una mayúscula (?=.*[A-Z])
    // - Al menos un número (?=.*\d)
    // - Al menos un carácter especial (?=.*[@$!%*?&])
    // - Mínimo 6 caracteres {6,}
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    //Retorna true si la contraseña cumple todos los requisitos//
    return passwordRegex.test(password);
}

//Controlador para el proceso de login//
exports.login = (req, res) => {
    //Extrae email, password y rememberme del cuerpo de la solicitud//
    const { email, password, rememberme } = req.body;
    //Obtiene todos los usuarios registrados//
    const users = getUsers();
    //Busca un usuario con el email proporcionado//
    const user = users.find(u => u.email === email);
    
    //Si no encuentra el usuario, devuelve error 401 (No autorizado)//
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'The email is not registered yet. Please, create an account first'
        });
    }
    
    //Si la contraseña no coincide, devuelve error 401 (No autorizado)//
    if (user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Incorrect password, Please, try again'
        })
    }
    
    //Si las credenciales son correctas, devuelve éxito con datos del usuario//
    res.json({
        success: true,
        userId: user.id,
        userName: user.userName,
        rememberme: rememberme || false
    })
}

//Controlador para el proceso de registro//
exports.register = (req, res) => {
    // Extrae datos del cuerpo de la solicitud
    const { email, password, confirmationPassword } = req.body
    //Obtiene todos los usuarios registrados//
    const users = getUsers();

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

    //Verifica que contraseña y confirmación coincidan//
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

    //Crea nombre de usuario a partir de la parte antes del @ en el email//
    const userName = email.split('@')[0];
    //Capitaliza la primera letra del nombre de usuario//
    const capitalizedUserName = capitalizeFirstLetter(userName);
    //Crea nuevo objeto usuario con ID basado en timestamp actual//
    const newUser = {
        email,
        password,
        userName: capitalizedUserName,
        id: Date.now() //Usa el timestamp actual como ID único//
    }

    //Agrega el nuevo usuario al array de usuarios//
    users.push(newUser);
    //Guarda los usuarios actualizados en el archivo//
    saveUsers(users);

    //Devuelve respuesta exitosa con código 201 (Creado)//
    res.status(201).json({
        success: true,
        userId: newUser.id,
        userName: newUser.userName,
        message: 'User registered successfully'
    })
}