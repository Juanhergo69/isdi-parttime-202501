//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN EL TRATAMIENTO DE DATOS, YA SEA CREACIÓN, ALMACENAMIENTO O COMPARACIÓN DE LOS MISMOS. DEBE COLOARSE EN CUARTA POSICIÓN DEL INDICE HTML, YA QUE, TRAS LOS RENDERIZADOS, EJECUTARÁ UNA SERIE DE LÓGICAS PARA LA CREACIÓN DE USUARIOS Y LOGEO DE USUARIOS//
//******************************************************************************************************************************************************************************************//
function registerUser(registerData) { //La función permite crear el registro del usuario, en base a los datos de registro ej.-->registerData = {'email': '', 'password': '', 'confirmation-password': ''}//
    if (!registerData['email'] && !registerData['password'] && !registerData['confirmation-password']) { //El if nos indica que si no se rellena el campo de email, contraseña y confirmación de contraseña ej-->!registerData['email'] => registerData['email'] === undefined && registerData['email'] === null//
        alert('Register Data Incomplete') //Nos arroja un alert que nos indica que los datos están incompletos//
        return //Al producirse esto, nos salimos de la función//
    }
    if (registerData['password'] !== registerData['confirmation-password']) { //El if nos indica que si el campo de contraseña es diferente al campo de confirmar contraseña//
        alert('Password and confirmation password are not the same') //Nos arroja un alert que nos indica que las contraseñas no son coincidentes//
        return //Al producirse esto, nos salimos de la función//
    }

    var usersJson = localStorage.getItem('users') //Declaramos variable usersJson, que serán los usuarios que se registren, y que quedarán almacenados en la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia//

    var users //Declaramos variable users, donde se irán almacenando los usuarios registrados. De esta variable beberá la anterior variable usersJson para poder hacer las comprobaciones de si el usario no está registrado (y por ende, se cree la cuenta nueva) o de estarlo, pasar a página de home//
    if (!usersJson) { //El if nos dice, que si al hacer la comprobación no está registrado el usuario//
        users = [] //Se almacena en la variable users//
    } else { //Y si ocurre lo contrario, es decir, que sí existe en la base de datos//
        users = JSON.parse(usersJson) //Transformar el resultado en formato json a formato javascript// 
    }

    var doesUserExist = users.some(function (_user) { return _user.email === registerData['email'] }) //Declaramos variable doesUserExist, que nos permitirá comprobar la existencia (o no) del usuario que pretende registrarse. Some permite comprobar si alguno de los elementos cumple la condición indicada, en base a la función proporcionada//
    if (doesUserExist) { //El if nos indica que, si el usuario existe//
        alert('this mail is alredy in use') //Nos lanza un alert indicando que el usuario ya existe//
        return //Si se cumple el if, nos salimos de la función//
    }

    var userName = registerData['email'].split('@')[0] //Declaramos variable userName, que será el nombre que adoptará el sistema para el usuario registrado. Mediante split, dividimos la dirección de mail en dos partes de un mismo array, partiendo desde el arroba (y haciéndolo desaparecer), y seleccionamos el elemento 0, es decir, la primera posición de ese array. En este caso, sería todo lo anterior al @//
    var userCreated = { email: registerData['email'], password: registerData['password'], userName, id: Date.now() } //Declaramos variable userCreated, que serán los datos almacenados del registro del usuario. Constará de su email, su contraseña, su nombre de usuario (declarado arriba) y "trampeamos con id:Date.now(), para asignar una id especifica para ese usuario"

    users.push(userCreated) //Con este push lo que hacemos es empujar los datos de userCreated a la variable users previamente declarada//

    localStorage.users = JSON.stringify(users) //Asignamos a nuestra base de datos de usuarios el valor de JSON.stringify sobre los usuarios, básicamente transformamos de javascript a Json//

    sessionStorage.id = userCreated.id //Almacenamos en sessionStorage el id del usuario que se acaba de registrar y/o logear//

    navigateToHome(currentView) //La función navigateToHome permite navegar hasta la página de home, a traves de la vista actual (currentView)
}

function loginUser(loginData) { //La función permite crear el login del usuario, en base a los datos de registro ej.-->loginData = {'email': '', 'password': ''}//
    var usersJson = localStorage.getItem('users') //Declaramos variable usersJson, que serán los usuarios que se registren, y que quedarán almacenados en la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia//
    var users = JSON.parse(usersJson) //Declaramos variable users, que transformará el resultado en formato json a formato javascript//
    var userLoginCheckout = users ? users.find(function (_user) { return _user['email'] === loginData['email'] }) : undefined //Declaramos variable userLoginCheckout, que permitirá comprobar, con ternarios, si el usuario se encuentra en la comprobación facilitada//

    if (!userLoginCheckout || userLoginCheckout['password'] !== loginData['password']) { //El if nos indica que si no se encuentra el usuario, o que la contraseña, en caso de que el usuario exista, no es la correcta//
        alert('Wrong credentials') //Nos arroja un alert que nos indica que los datos son incorrectos//
        return //Al producirse esto, nos salimos de la función//
    }

    if (loginData['rememberme']) { //El if nos indica que, si desde los datos de logueo, el inputId remememberme (la checkbox) es true (o lo que es lo mismo, está marcada)//
        localStorage.id = userLoginCheckout.id //La id del usuario será almacenada en localStorage (es decir, el almacenamiento local)//
    } else { //Si sucede lo contrario (es decir, la checkbox no está marcada)//
        sessionStorage.id = userLoginCheckout.id //La id del usuario será almacenada en sessionStorage (es decir, el almacenamiento de la sesión)//
    }

    navigateToHome(currentView) //Navegamos a la página home desde la vista actual//
}

function storeMsg(userMsg) { //La función permitiría almacenar en localStorage el mensaje que escribiría el usuario a través de sendMsgForm//
    if (userMsg === null || userMsg.trim() === '' || typeof userMsg !== 'string') { //El if nos indica que si userMsg no existe, o que contiene nada, o que lo que contiene no es un string// //LA VALIDACION NO FUNCIONA, SE AÑADE SIEMPRE EL MENSAJE//
        alert("El mensaje está vacío y no se ha almacenado.") //Declaramos un alert que nos indica que no se ha almacenado nada//
        return //Nos salimos de la función si el if se cumple//
    } else { //Si el if no se produce, y por tanto, el mensaje del usuario existe y tiene contenido//
        var storedMessages = JSON.parse(localStorage.getItem('messages')) || [] //Declaramos variable storeMessages, y le asignamos la obtención de estos datos si es que existen, si no los hay, se considera array vacío. Se utiliza JSON.parse para transformar de JSON a JS//
        storedMessages.push(userMsg) //Pusheamos, o lo que es lo mismo, añadimos el userMsg al array de storesMessages//
        localStorage.setItem('messages', JSON.stringify(storedMessages)) //Añadimos a localStorage, gracias a setItem, el array actualizado con los mensajes del usuario. Se recurre a JSON.stringify para transformar de JS a JSON//
        alert('Mensaje almacenado con éxito.') //Declaramos un alert que nos indica que el mensaje se ha almacenado con exito en localStorage//
    }
}

function viewMessages() { //La función permitiría rescatar los mensajes en localStorage, para posteriormente ser visualizados desde userMsgForm//
    var storedMessages = JSON.parse(localStorage.getItem('messages')) || [] //Declaramos variable storeMessages, que contendrá los mensajes de localStorage, transformados de JSON a JS, o si no hay mensajes, un array vacío (nada)//
    var postCommunityMsg = document.getElementById('postcommunity') //Declaramos variable postCommunityMsg, que contendrá los elementos recogidos en la id postcommunity//
    var messagesText = storedMessages.join('\n\n') //Declaramos variable messagesText, que contendrá la unión (join) de todos los storedMessages (mensajes almacenados), y separados por dos saltos de línea)
    postCommunityMsg.value = messagesText //Indicamos que el valor de postCommunityMsg es igual a messagesText//
}
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//
