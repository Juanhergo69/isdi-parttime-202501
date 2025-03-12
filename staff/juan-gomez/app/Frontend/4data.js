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

function storeMsg(loggedUserUserId, title, msg, date) { //La función permitira almacenar un mensaje en localStorage, basado en el nombre del usuario, titulo, mensaje y fecha de creación//
    if (!title || !msg) { //El if nos indica que si no hay título o no hay mensaje//
        alert('All fields are required. The message has not been stored') //Se ejecuta un alert indicando que el mensaje no se ha almacenado//
        return //Nos salimos de la función//
    } else { //Si no se cumple el if, es decir, hay titulo y mensaje//
        var objectUserMsg = { userId: loggedUserUserId, title: title, msg: msg, date: date.toLocaleString() } //Creamos el objeto objectUserMsg, que contendrá la id del usuario, titulo, mensaje y fecha(utilizamos toLocaleString para formatear la fecha y que sea legible//
        var storedMessages = JSON.parse(localStorage.getItem('messages')) || [] //Declaramos variable storeMessages, que contendrá los mensajes cojidos de localStorage (hay que hacer la conversión con JSON.parse). Si no los hay, se ejecutará un array vacío//
        storedMessages.push(objectUserMsg); //Pusheamos, o lo que es lo mismo, añadimos objectUserMsg a storeMessages//
        localStorage.setItem('messages', JSON.stringify(storedMessages)); //Y añadimos a localStorage el mensaje (hay que hacer la conversión con JSON.stringify)
        alert('Message stored successfully.') //Se ejecuta un alert indicando que el mensaje se ha almacenado//
    }
}

function viewMessages() {
    var storedMessages = JSON.parse(localStorage.getItem('messages')) || [] //Declaramos variable storeMessages, que contendrá los mensajes cojidos de localStorage (hay que hacer la conversión con JSON.parse) Si no los hay, se ejecutará un array vacío//
    var postCommunityMsgContainer = document.getElementById('postcommunity') //Declaramos variable postCommunityMsgContainer, que contendrá todos los elementos de la id postcommunity//
    var users = JSON.parse(localStorage.getItem('users')) || [] //Declaramos variable users, y la traemos haciendo el cambio de JSON  JS desde localStorage. Si no hay usuarios registrados, nos traemos un array vacío//

    postCommunityMsgContainer.innerHTML = '' //Limpiamos el contenedor antes de agregar los mensajes//

    storedMessages.forEach(function (message) { //Iteramos cada mensaje almacenado//
        var messageDiv = document.createElement('div') //Declaramos variable messageDiv, y lo creamos como div (servirá de contenedor para el mensaje)
        messageDiv.className = 'message' //Asignamos nombre de clase para dar estilos//

        var user = users.find(function (_user) { //Declaramos variable user, que contendrá la búsqueda del nombre del usuario actualizado usando la ID almacenada en el mensaje//
            return _user.id === message.userId
        })

        var userName = user ? user.userName : 'Unknown User' //Si no se encuentra el usuario preguntando con ternarios, mostramos Unknown User//

        var userDiv = document.createElement('div') //Declaramos variable userDiv//
        userDiv.className = 'message-user' //Asignamos nombre de clase para dar estilos//
        userDiv.textContent = `User: ${userName}`; //Indicamos que su contenido será el nombre del usuario actualizado//
        messageDiv.appendChild(userDiv) //Añadimos userDiv a messageDiv//

        var titleDiv = document.createElement('div') //Declaramos variable titleDiv//
        titleDiv.className = 'message-title' //Asignamos nombre de clase para dar estilos//
        titleDiv.textContent = `Title: ${message.title}`; //Indicamos que su contenido será el título del mensaje//
        messageDiv.appendChild(titleDiv) //Añadimos titleDiv a a messageDiv//

        var msgDiv = document.createElement('div') //Declaramos variable msgDiv//
        msgDiv.className = 'message-text' //Asignamos nombre de clase para dar estilos//
        msgDiv.textContent = `Message: ${message.msg}`; //Indicamos que su contenido será el mensaje escrito por el usuario//
        messageDiv.appendChild(msgDiv) //Añadimos msgDiv a messageDiv//

        var dateDiv = document.createElement('div') //Declaramos variable dateDiv//
        dateDiv.className = 'message-date' //Asignamos nombre de clase para dar estilos//
        dateDiv.textContent = `Date: ${message.date}`; //Indicamos que su contenido será la fecha en la que se generó el mensaje//
        messageDiv.appendChild(dateDiv) //añadimos dateDiv a messageDiv//

        postCommunityMsgContainer.appendChild(messageDiv) //Añadimos messageDiv a postComunityMsgContainer//
    });
}

//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//
