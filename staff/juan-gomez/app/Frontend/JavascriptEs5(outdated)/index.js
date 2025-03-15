var body = document.body; //Traemos el body al archivo Js//
var currentView //Creamos variable currentView como indefinida, será la página de renderizado en la que nos encontremos actualmente. Se irá asignando por cada renderizado//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN ALGUNA LÓGICA ASOCIADA AL FUNCIONAMIENTO DE LA PÁGINA WEB. DEBE SER COLOCADO EN PRIMER LUGAR DEL ÍNDICE HTML, YA QUE DESDE EL, SERÁN CONDICIONADOS EN SU COMPORTAMIENTO EL RESTO DE DATOS EJECUTADOS//
//******************************************************************************************************************************************************************************************//

//**********************************************************************************************************************************************************************************************//
//LA FUNCION APPENDCHILDREN() ES MERAMENTE CURISIODIDAD, EN PRUEBAS DE RENDIMIENTO, ES PEOR QUE EL MÉTODO CLÁSICO APPENDCHILD//
//**********************************************************************************************************************************************************************************************//
function appendChildren() { //La función permite añadir múltiples hijos (child) a el elemento padre (parent) que es el primero que pasamos//
    var parent = arguments[0] //Declaramos la variable parents (padre), y le asignamos el valor de la primera posición de los argumentos//
    for (var i = 1; i < arguments.length; i++) { //El for itera desde la segunda posición (la primera posición es el padre), hasta la última de los argumentos//
        parent.appendChild(arguments[i])    //Añadimos a parents (padre), todos los argumentos posteriores a el, es decir, sus children (hijos)//
    }
    return parent //Devolvemos parent (padre)//
}
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUENTES QUE HE IMPORTADO PARA UTILIZARLAS EN LA PÁGINA WEB. DEBE SER COLOCADO EN SEGUNDO LUGAR DEL INDICE HTML, YA QUE CONDICIONARÁ A LOS FUTUROS RENDERIZADOS DE PÁGINAS Y FORMULARIOS//
//******************************************************************************************************************************************************************************************//
var link = document.createElement('link') //Creo una nueva fuente para utilizar en la web (Zen Dots)//
link.href = 'https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap' //Incluyo el link de la fuente//
link.rel = 'stylesheet' //Declaro que es un estilo//
document.head.appendChild(link) //Lo añado al documento//

var link2 = document.createElement('link') //Creo una nueva fuente para utilizar en la web (Zen Loop)//
link.href = 'https://fonts.googleapis.com/css2?family=Zen+Dots&family=Zen+Loop:ital@0;1&display=swap' //Incluyo el link de la fuente//
link.rel = 'stylesheet' //Declaro que es un estilo//
document.head.appendChild(link2) //Lo añado al documento//
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN LA CREACIÓN DE UN CONTENEDOR, FORMULARIO, O PÁGINA, QUE SERÁN LLAMADOS PRÓXIMAMENTE EN LOS RENDERIZADOS. DEBE SER COLOCADO EN TERCER LUGAR DEL INDICE HTML, YA QUE CONDICIONARÁ A LOS FUTUROS RENDERIZADOS DE PÁGINAS Y FORMULARIOS, BEBIENDO PREVIAMENTE DE LAS LÓGICAS//
//******************************************************************************************************************************************************************************************//
function createContainer(style) { //La función permite crear un contenedor con estilos (style) predefinidos. Esto nos servirá para ir renderizando cada una de las páginas de nuestra web//
    var container = document.createElement('div'); //Declaramos la variable container, y le asignamos el valor de documento html creado como un div//
    container.className = style; //Continuamos asginandole la clase, que en este caso serán styles (estilos)//
    return container; //Devolvemos container//
}

function createTextContainer(tag, text, style) { //La función permite crear un elemento html que contiene texto. tag es un formalismo, se debe poner siempre, a continuación se pasa el texto y finalmente los estilos (si se quieren introducir varios estilos, han de ser seguidos dentro del mismo string)//
    var element = document.createElement(tag); //Declaramos la variable element, y le asignamos el valor de documento html creado en base al tag//
    element.textContent = text; //Continuamos asignandole el contenido, que en este caso será text (texto)//
    element.className = style; //Continuamos asignandole la clase, que en este caso serán los styles (estilos)//
    return element; //Devolvemos element//
}

function createButton(text, style, callback) { //La función permite crear un botón. text será el contenido que tendrá, style los estilos y callback funcionaría como la función que proporcionaría (en este caso una respuesta)//
    var button = document.createElement('button'); //Declaramos la variable button, y le asignamos el valor de documento html creado como botón ('button')//
    button.textContent = text; //Continuamos asignandole el contenido, que en este caso será text (texto)//
    button.className = style;  //Continuamos asignandole la clase, que en este caso serán los styles (estilos)//
    button.addEventListener('click', callback) //Creamos un adEventListener, en base al click realizado sobre el botón, para ejecutar el callback//
    return button; //Devolvemos button//
}

function createImgButton(img, style, callback) { //La función permite crear un botón asociado a una imagen. Tendrá, la propia imagen, los estilos y el callback//
    var imgButton = document.createElement('button') //Declaramos la variable imgButton, que será el botón que ejecutará el submit//
    imgButton.style.border = 'none'; //Añadimos estilos al botón que contendrá la imágen para hacerlo desaparecer del renderizado (tras errores de visualización en la página, he llegado a esta conclusión)//
    imgButton.style.background = 'transparent'; //Añadimos estilos al botón que contendrá la imágen para hacer desaparecer del rederizado (tras errores de visualización de la página, he llegado a esta conclusión)//
    var img = document.createElement('img') //Declaramos la variable img, que será la imagen que se introducirá al botón para ejecutuar el submit//
    img.src = 'Logo.jpg' ///Añadimos la raíz de esta imagen (en este caso, esta añadida a la propia carpeta de la app)//
    img.className = style //Declaramos clase de img, que en este caso serán los estilos//

    imgButton.appendChild(img) //Añadimos img al imgbutton//
    body.appendChild(imgButton) //Añadimos imgButton al body//

    imgButton.addEventListener('click', callback) //Creamos adEventListener, en base al click realizado sobre el botón, para ejecutar el callback//
    return imgButton //Devolvemos imgButton//
}


function createForm(inputsArray, submitButtonText, callback) { //La función permite crear un formulario. inputsArray serán los objetos a crear ej.-->[{label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email'}, {label: 'Password....}], submitButtonText será el botón de ejecución de los inputsArray y callback sería la función de respuesta a todo lo anterior//
    var formContainer = document.createElement('form'); //Declaramos la variable formContainer, y le asignamos el valor de documento html creado como 'div'. Será el contenedor de nuestro formulario//
    formContainer.className = 'form' //Continuamos asignandole la clase, que en este caso será un formulario (form)//
    for (var i = 0; i < inputsArray.length; i++) { //El for itera todos los elementos de inputsArray//
        var input = inputsArray[i] //Declaramos la variable input, y le asignamos el valor del indice recorrido en el for sobre inputsArray//
        var label = document.createElement('label') //Declaramos la variable label, y le asignamos el valor de documento html creado como etiqueta (label)//
        label.htmlFor = input.inputId //Continuamos asignando a label la funcion htmlFor, que permite iterar los elementos que se asignen. ej-->input = {... inputId: 'email'}; input.inputId === 'email'//
        label.textContent = input.label //Continuamos asignando a label el contenido de texto, que en este caso será la etiqueta (label) generada sobre el input//

        var inputElement = document.createElement('input') //Declaramos la variable inputElement, y le asignamos el valor de documento html creado como input//
        inputElement.type = input.inputType; //Continuamos asignando a inputElement el tipo, que será el tipo de input generado sobre el input//
        inputElement.id = input.inputId; //Continuamos asignando a inputElement la id, que sera la id del input sobre el input//

        if (input.inputType !== 'checkbox') { //El if nos indica, que si el input es distinto a una checkbox//
            inputElement.placeholder = input.inputPlaceholder || '' //Continuamos asignando a inputElement el placeholder, que será aquello que sirva de guía para que el usuario sepa que debe escribir ahí. Será la id del placeholder sobre el input//
        } else { //Si el if no se cumple, y por tanto, se trata de un checkbox//
            inputElement.className = 'checkbox' //Continuamos asignando a inputElement la case de checkbox//
        }

        inputElement.required = input.isRequired //Continuamos asignando a inputElement la categoría required, que servirá para que ese campo sea de obligatorio cumplimiento para seguir avanzando//


        formContainer.appendChild(label) //Añadimos label a formContainer//
        formContainer.appendChild(inputElement) //Añadimos inputElemento a formContainer//
        body.appendChild(formContainer) //Añadimos formContainer al body/
    }

    var submitButton = document.createElement('input'); //Declaramos variable sumbitButton, y le asignamos el valor de documento html creado como input//
    submitButton.type = 'submit'; //Continuamos asignando el tipo de submitButton, que en este caso será submit//
    submitButton.value = submitButtonText //Continuamos asignando el valor de submitButton, que en este caso será submitButtonText//

    formContainer.appendChild(submitButton) //Añadimos submitButton a formContainer//

    formContainer.addEventListener('submit', function (event) { //Indicamos que, cuando se producza un submit (en este caso, que se ejecute submitButton) , se ejecutará una función sobre el evento//
        event.preventDefault() //Para evitar comportamientos extraños, como que se reinice el renderizado, ejecutamos preventDefault sobre ese evento//

        var form = event.target //Declaramos variable form, que será igual al objetivo del evento. En este caso, el objetivo del evento es el formulario creado. ej--> elemento form html al que le hemos dado submit//
        var formData = {} //Declaramos variable formData, que se corresponderá a los datos del formulario. Se declara como un objeto vacío que se irá rellenando con la iteración del siguiente for//

        for (var i = 0; i < inputsArray.length; i++) { //El for itera todos los elementos que se han generado en el formulario. La intención es acceder a los valores que escribe el usuario//

            //ej.-->inputsArray = [{ label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email' }, ...]//
            //Normalmente para acceder al valor de un input a traves del id ej.--> event.target.idDelInput (e.g. event.target.email)//

            //ej.-->form[inputsArray[i].inputId] ---> event.target['email'] === event.target.email
            //ej.-->console.log(form[inputsArray[i].inputId].value) //<input />.value

            var fieldName = inputsArray[i].inputId //Declaramos variable fieldName, que se corresponde al nombre del campo, y le asignamos el valor del indice de inputsArray en base la id del input//
            var value = form[inputsArray[i].inputId].value //Declaramos variable value, que se corresponde al valor de ese input, y le asignamos el valor del objetivo del evento (form) sobre el indice de inputsArray, en base al valor de la id del input//

            if (inputsArray[i].inputType === 'checkbox') { //El if nos indica que, si en el indice de inputsArray, el inputType es una checkbox//
                value = form[inputsArray[i].inputId].checked //El valor que nos devuelve sobre el formulario, es el indice de inputId, con la categoría checked (por ser checkbox)//
            } else { //Si el if no se produce, y se trata entonces de otra label que no es checkbox//
                value = form[inputsArray[i].inputId].value //El valor que nos devuelve sobre el formulario, es el indice de inputId, con la categoría value (por ser un valor)//
            }
            formData[fieldName] = value; //Asignamos a formData, en base al nombre del campo, el valor iterado en el for. ej-->formData = {'email': 'patata@mail.com'}//
        }

        callback(formData) //Llamamos a la respuesta (callback) de los datos del formulario.
    })

    return formContainer //Devolvemos formContainer//

}

function createHomePage() { //La función permite crear la página home//
    var homeContainer = createContainer('homeContainer')  //Declaramos la variable homeContainer (contenedor de la página home), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var loggedUserId //Declaramos variable loggedUserId, que recogerá los datos del usuario que ha hecho login, y en un princpio, la declaramos vacía, ya que dependiendo de si el almacenamiento es local o en sesión se añadairá a uno u otro (if de más abajo)//

    if (localStorage.id) { //El if nos indica que, si la id se encuentra en localStorage (almacenamiento local)//
        loggedUserId = JSON.parse(localStorage.getItem('id')) //Declaramos que la id del usuario que ha logueado se quedará almacenado en el local de la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia JSONparse permite transformar el resultado en formato json a formato javascript//
    } else { //Si el if no se cumple, y por tanto, si la id se encuentra sessionStorage (almacenamiento en la sesion)//
        loggedUserId = JSON.parse(sessionStorage.getItem('id')); //Declaramos que la id del usuario que ha logueado se quedará almacenado en la sesion de la base de datos de juguete (devtools/aplications/sessionstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia JSONparse permite transformar el resultado en formato json a formato javascript//
    }

    var usersJson = localStorage.users //Declaramos variable usersJson, que serán los usuarios que se registren, y que quedarán almacenados en la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia//
    var users = JSON.parse(usersJson) //Transformar el resultado en formato json a formato javascript// 

    var userLogged = users ? users.find(function (_user) { return _user.id === loggedUserId }) : undefined //Declaramos variable userLogged, que permitirá comprobar, con ternarios, si el usuario se encuentra en la comprobación facilitada//

    if (!userLogged) { //El if nos indica que si el usuario no se encuentra previamente registrado//
        alert('Create an account first') //Nos arroja un alert con el siguiente mensaje//
        return renderRegisterPage() //Devolvemos el renderizado de la págin ade registro//
    }

    var loggedUserUsername = userLogged.userName //Declaramos la variable loggedUserUserName, que se corresponderá al usuario logeado en base a su nombre de usuario//
    var homeImg = document.createElement('img') //Declaramos variable homeImg (imagen de homePage), y le asignamos el valor de documento html como imagen ('img')//
    homeImg.src = 'Logo.jpg' //Añadimos la raíz de esta imagen (en este caso, esta añadida a la propia carpeta de la app)//
    homeImg.className = 'homeImg' //Añadimos la clase css y le asignamos el nombre landingImg (en index.css se continúa el desarrollo de estilos)//
    var homeMsg = createTextContainer('h1', `Welcome, ${loggedUserUsername}`, 'homeMsg') //Declaramos la variable welcomeText, que se corresponderá al mensaje de bienvenida una vez se acceda a la página home//
    var menuDropContainer = createContainer('menuDropContainer') //Declaramos la variable menuDropContainer, que será el contenedor del menú desplegable que contendrá los elementos que se mostrarán al pulsar menuButton//
    var menuButton = createButton(loggedUserUsername[0].toUpperCase(), 'menuButton', function () { //Declaramos la variable menuButton, que tendrá como texto la primera letra puesta en mayúsculas del usuario logueado. Este botón tendrá la función de desplegar los elementos contenidos en menuDropContainer//
        if (menuDropContainer.style.display === 'none' || menuDropContainer.style.display === '') { //El if valida el estado de menuDropContainer. La idea es parametrizarlo en display 'none' desde css, y cuando se active el botón, haría el cambio a flex y se mostraría con los estilos asignados// 
            menuDropContainer.style.display = 'flex' //menuDropContainer se renderiza con categoría flex//
        } else { //Si no se produce ninguna condición del if, por tanto, el menuDropContainer está renderizado//
            menuDropContainer.style.display = 'none' //Lo borramos de pantalla//
        }
    })

    var profileButton = createButton('Profile', 'profileButton', function () { //Declaramos variable profileButton, para crear el botón de perfil de usuario. La función es un alert, ya que el renderizado de esa página aún no está realizado//
        alert('Ir al perfil, página no renderizada');
    });

    var settingsButton = createButton('Settings', 'settingsButton', function () { //Declaramos variable settingsButton, para crear el botón de ajustes del usuario. La función es un alert, ya que el renderizado de esa página aún no está realizado//
        alert('Ir a ajustes, página no renderizada');
    });

    var logoutButton = createButton('Logout', 'logoutButton', function () { //Declaramos la variable logoutButton (que será el botón para salir de la página home, y deslogar el usuario), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los estilos, y la pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
        if (sessionStorage.id) { //El if indica que, si se desloguea desde la sessionStorage (almacenamiento de la sesión)//
            sessionStorage.removeItem('id') //Se elimina la id de la sessionStorage//
        }
        if (localStorage.id) { //El if indica que, si se deslogue desde la localStorage (almacenamiento local)//
            localStorage.removeItem('id') //Se elimina la id de la localStorage//
        }
        navigateToLogin(homeContainer) //Ejecutamos la funcion navigateToLogin (desde homeContainer, que es donde nos encontramos) tras pulsar logoutButton//
        body.removeChild(sendMsgForm) //Quitamos del body el formulario de envío de mensajes//
        body.removeChild(userMsgForm) //Quitamos del body el formulario de mensajes enviados por los usuarios//
    })

    var objectTitleSendMsg = { label: 'Title your post', inputType: 'textTitle', inputPlaceholder: 'Enter your title', inputId: 'title', isRequired: false } //Declaramos variable objectTitleSendMsg, que será el objeto que contenga el titulo del post que se quiera añadir//
    var objectBodySendMsg = { label: 'Write your post', inputType: 'textarea', inputPlaceholder: 'Enter your msg', inputId: 'msg', isRequired: false } //Declaramos variable objectBodySendMsg, que será el cuerpo donde el usuario añada el mensaje que quiere enviar. Esto dará problemas, pero más tarde validaremos el textarea para solucionarlo// //
    var sendMsgForm = createForm([objectTitleSendMsg, objectBodySendMsg], 'Post your Msg', function () { //Declaramos variable sendMsgForm, para crear el formulario de creación de mensaje//
        sendMsgForm.addEventListener('submit', function (event) { //Declaro en primer lugar que sendMsgForm reaccionará al submit (no encuentro mejor forma de hacerlo)//
            event.preventDefault() //Previniendo los comportamientos predeterminados del formulario//
        })
        var title = document.getElementById('title').value //Declaramos variable title, que contendenrá, gracias a la función getElementById, la id del título del post//
        var msg = document.getElementById('msg').value //Declaramos variable msg, que contendrá, gracias a la función getElementById, la id del mensaje que se escriba//
        var userMsg = `User: ${loggedUserUsername}\nTitle: ${title}\nMessage: ${msg}` //Declaramos variable userMsg, que contendrá el usuario, el título del post y el mensaje se ha escrito//
        storeMsg(userMsg) //Ejecutamos la función de almacenamiento de mensaje en base al userMsg//
        document.getElementById('title').value = '' //Despues de ejecutar la funcion storeMsg, limpiamos el campo de titulo//
        document.getElementById('msg').value = '' //Despues de ejecutar la funcion storeMsg, limpiamos el campo de msg//
        viewMessages() //Ejecutamos la función viewMessages para mostrar los mensajes en userMsgForm//
    });
    sendMsgForm.className = 'sendMsgForm' //Damos un nombre de clase para dar estilos al formulario desde Css//

    var objectBodyUserMsg = { label: 'Posts of community', inputType: 'textarea', inputPlaceholder: '', inputId: 'postcommunity', isRequired: false } //Declaramos variable objectBodyUserMsg, que contendrá los mensajes escritos por los usarios desde sendMsgForm. Esto dará problemas, pero más tarde validaremos el textarea para solucionarlo//
    var userMsgForm = createForm([objectBodyUserMsg], 'Answer', function () { //Declaramos variable userMsgForm, para crear el formulario donde se visualizarán los mensajes enviados por los usuarios desde sendMsgForm. La función es un alert, ya que la función que queremos darle (contestar a esos mensajes) aún no está desarrollada//
        alert('Contestar mensaje, aún no desarrollado') //Falta por desarrollar esta función, mi idea es que se pueda seleccionar un mensaje a la vista desde userMsgForm, y tras hacer submit sobre answer, poder contestar a ese mensaje en concreto//
    });
    userMsgForm.className = 'userMsgForm' //Damos un nombre de clase para dar estilos al formulario desde Css//

    var inputElementMsg = document.getElementById('msg') //Declaramos variable inputElementMsg, para comenzar con las validaciones, con idea de forzar que el input pase a ser un textarea//
    if (inputElementMsg && objectBodySendMsg.inputType === 'textarea') { //El if nos indica que si inputElementMsg y el tipo de input del objeto objectBodySendMsg son exactamente iguales a textarea//
        var textareaElementMsg = document.createElement('textarea') //Declaramos variable textareaElementMsg, y la creamos como documento HTML textarea//

        textareaElementMsg.id = inputElementMsg.id //Estas igualdades permiten asignar las caracteristicas de los input a textarea//
        textareaElementMsg.placeholder = inputElementMsg.placeholder //Estas igualdades permiten asignar las caracteristicas de los input a textarea//
        textareaElementMsg.required = inputElementMsg.required //Estas igualdades permiten asignar las caracteristicas de los input a textarea//

        inputElementMsg.parentNode.replaceChild(textareaElementMsg, inputElementMsg) //Encontrado por internet, con parentNode accedo al nodo padre de los inputs, es decir, userMsgForm, para decirle que remplace los inputElementPost por textAreaElementPost//
    }

    var inputElementPost = document.getElementById('postcommunity') //Declaramos variable inputElementPost, para comenzar con las validaciones, con idea de forzar que el input pase a ser un textarea//
    if (inputElementPost && objectBodyUserMsg.inputType === 'textarea') { //El if nos indica que si inputElementPost y el tipo de input del objeto objectBodyUserMsg son exactamente iguales a textarea//
        var textareaElementPost = document.createElement('textarea') //Declaramos variable textareaElementPost, y la creamos como documento HTML textarea//

        textareaElementPost.id = inputElementPost.id //Estas igualdades permiten asignar las caracteristicas de los input a textarea//
        textareaElementPost.placeholder = inputElementPost.placeholder //Estas igualdades permiten asignar las caracteristicas de los input a textarea//
        textareaElementPost.required = inputElementPost.required //Estas igualdades permiten asignar las caracteristicas de los input a textarea//

        textareaElementPost.readOnly = true //Con esto evitamos que los mensajes a la vista en textAreaElementPost puedan ser borrados y/o modificados. Y al mismo tiempo, evitamos que se pueda escribir en ese campo. Básicamente, es para hacerlo de solo lectura//

        inputElementPost.parentNode.replaceChild(textareaElementPost, inputElementPost) //Encontrado por internet, con parentNode accedo al nodo padre de los inputs, es decir, userMsgForm, para decirle que remplace los inputElementPost por textAreaElementPost//
    }

    menuDropContainer.appendChild(profileButton) //Añadimos profileButton a menuDropContainer//
    menuDropContainer.appendChild(settingsButton) //Añadimos settingsButton a menuDropContainer//
    menuDropContainer.appendChild(logoutButton) //Añadimos logoutButton a menuDropContainer//

    homeContainer.appendChild(homeImg) //Añadimos homeImg a home Container//
    homeContainer.appendChild(homeMsg) //Añadimos homeMsg a homeContainer//
    homeContainer.appendChild(menuButton) //Añadimos menuButton a homeContainer//
    homeContainer.appendChild(menuDropContainer) //Añadimos menuDropContainer a homeContainer//

    body.appendChild(sendMsgForm) //Añadimos sendMsgForm al body//
    body.appendChild(userMsgForm) //Añadimos userMsgForm al body//
    body.appendChild(homeContainer) //Añadimos homeContainer al body//

    viewMessages()

    return homeContainer //Devolvemos homeContainer//
}

//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//

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

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN RENDERIZADOS DE LAS DISTINAS PÁGINAS DE NUESTRA WEB. DEBE SER COLOCADO EN QUINTO LUGAR DEL ÍNDICE HTML, YA QUE, EL REDERIZADO DEPENDERÁ DE SI LAS LÓGICAS SON CORRECTAS, Y DEPENDIENDO DEL TRATAMIENTO DE LOS DATOS, RENDERIZARÁ UNA PÁGINA U OTRA//
//******************************************************************************************************************************************************************************************//
function renderLandingPage() { //La función permite renderizar el Landing page, es decir, la primera página que se mostrará al acceder a la web//
    var landingContainer = createContainer('landingContainer'); //Declaramos la variable landingContainer (contenedor de la página principal), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    //var landingTitle = createTextContainer('h1', 'SM Developers', 'title'); //Declaramos la variable landingTitle (título de la página principal), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos (dejo comentado esto, porque al incluir la imagen de la página principal, deja de ser útil el título, pero quiero tenerlo a mano para chequeo)//
    var landingMsg = createTextContainer('h3', 'Welcome to your social developer network', 'landingMsg') //Declaramos la variable landingMsg (mensaje de la página principal, y le asignamos la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado de menor tamaño), el texto y los estilos//
    var landingImg = document.createElement('img') //Declaramos variable landingImg (imagen de landingPage), y le asignamos el valor de documento html como imagen ('img')//
    landingImg.src = 'Logo.jpg' //Añadimos la raíz de esta imagen (en este caso, esta añadida a la propia carpeta de la app)//
    landingImg.className = 'landingImg' //Añadimos la clase css y le asignamos el nombre landingImg (en index.css se continúa el desarrollo de estilos)//

    var joinButton = createButton('Join In!', 'buttonJoin', function () { navigateToRegister(landingContainer) }) //Declaramos la variable joinButton (que será el botón para acceder), y le asignamos el valor de la función createButton. Entre paréntesis agregamos el texto, los estilos, y le pasamos la función de la página a la que queramos ir, en base a la página en la que nos encontramos//


    //landingContainer.appendChild(landingTitle) //Añadimos al contenedor de la página principal, el título de la página principal (dejo comentado esto, porque al incluir la imagen de la página principal, deja de ser útil el título, pero quiero tenerlo a mano para chequeo)//
    landingContainer.appendChild(landingImg) //Añadimos al contenedor de la página principal, la imágen de la página principal//
    landingContainer.appendChild(landingMsg) //Añadimos al contenedor de la página principal, el mensaje de bienvenida//
    landingContainer.appendChild(joinButton) //Añadimos al contenedor de la página principal, el botón para unirse//



    body.appendChild(landingContainer); //Añadimos el contenedor de la página principal al body//

    return landingContainer //Devolvemos landingContainer//
}

function renderRegisterPage() { //La función permite renderizar el registerPage, es decir, la página de registro//
    var registerContainer = createContainer('registerForm'); //Declaramos la variable registerContainer (contenedor de la página de registro), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var registerTitle = createTextContainer('h1', 'REGISTER', 'title'); //Declaramos la variable registerTitle (título de la página de registro), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true } //Declaramos el objeto objectEmail, que contendrá los campos correspondientes al input de email//
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true } //Declaramos el objeto objectPassword, que contendrá los campos corespondientes al input de contraseña//
    var objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true } //Declaramos el objeto objectConfirmPassword, que contendrá los campos correspondientes al input de confirmar contraseña//
    var registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser) //Declaramos variable registerForm, que se corresponde al formulario de registro. Llamamos al función createForm y le introducimos los objetos que queremos que se rendericen, así como el submit (en este caso Register) y el callback, que será llamando a la función registerUser//
    var toLoginButton = createButton('Go to login', 'buttonGoToLogin', function () { navigateToLogin(registerContainer) }) //Declaramos la variable toLoginButton (que será el botón para acceder a la página de logeo), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los estilos, y le pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    var toLandingButton = createImgButton('img', 'imgButton', function () { navigateToLanding(registerContainer) }) //Declaramos la variable toLandingButton (que será el botón acceder a la página de landing), y le asignamos el valor de la función createImgButton. Entre paréntesis, agregamos el texto, los estilos, y la pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    var registerMsg = createTextContainer('h4', 'Have you an account?', 'registerMsg')

    registerContainer.appendChild(toLandingButton) //Añadimos toLandingButton a registerContainer//
    registerContainer.appendChild(registerTitle) //Añadimos registerTitle a registerContainer//
    registerContainer.appendChild(registerForm) //Añadimos registerForm a registerContainer//
    registerContainer.appendChild(registerMsg) //Añadimos registerMsg a registerContainer/
    registerContainer.appendChild(toLoginButton) //Añadimos toLoginButton a registerContainer//

    body.appendChild(registerContainer) //Añadimos registerContainer al body//

    return registerContainer //Devolvemos registerContainer//
}

function renderLoginpage() { //La función permite renderizar la loginPage, es decir, la página de login//
    var loginContainer = createContainer('loginForm'); //Declaramos la variable loginContainer (contenedor de la página de login), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var loginTitle = createTextContainer('h1', 'LOGIN', 'title'); //Declaramos la variable loginTitle (título de la página de login), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true } //Declaramos el objeto objectEmail, que contendrá los campos correspondientes al input de email//
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true } //Declaramos el objeto objectPassword, que contendrá los campos corespondientes al input de contraseña//
    var objectRememberMe = { label: 'Remember me', inputType: 'checkbox', inputId: 'rememberme', isRequired: false }
    var loginForm = createForm([objectEmail, objectPassword, objectRememberMe], 'Login', loginUser) //Declaramos variable loginForm, que se corresponde al formulario de login. Llamamos al función createForm y le introducimos los objetos que queremos que se rendericen, así como el submit (en este caso Login) y el callback, que será llamando a la función loginUser//
    var toRegisterButton = createButton('Register now!', 'buttonGoToRegister', function () { navigateToRegister(loginContainer) }) //Declaramos la variable toRegisterButton (que será el botón para acceder a la página de registro), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los extilos, y le pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    var toLandingButton = createImgButton('img', 'imgButton', function () { navigateToLanding(loginContainer) }) //Declaramos la variable toLandingButton (que será el botón acceder a la página de landing), y le asignamos el valor de la función createImgButton. Entre paréntesis, agregamos el texto, los estilos, y la pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    var loginMsg = createTextContainer('h4', 'You don`t have an account?', 'loginMsg')

    loginContainer.appendChild(toLandingButton) //Añadimos toLandingButton a loginContainer//
    loginContainer.appendChild(loginTitle) //Añadimos loginTitle a loginContainer//
    loginContainer.appendChild(loginForm) //Añadimos loginForm a loginContainer//
    loginContainer.appendChild(loginMsg) //Añadimos loginMsg a loginContainer//
    loginContainer.appendChild(toRegisterButton) //Añadimos toRegisterButton a loginContainer//


    body.appendChild(loginContainer) //Añadimos loginContainer al body//

    return loginContainer //Devolvemos loginContainer//
}

function renderHomePage() { ////La función permite renderizar el Home page, es decir, la página de home//
    var homePage = createHomePage() //Declaramos la variable homePage, que será la propia página de home, y se ejecutará mediante la función createHomePage//

    body.appendChild(homePage) //Añadimos homePage al body//
}
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN NAVEGACIÓN ENTRE LOS DISTINTOS RENDERIZADOS DE NUESTRA WEB. DEBE SER COLOCADO EN SEXTO LUGAR DEL ÍNDICE HTML, YA QUE, LA NAVEGACIÓN DEPENDERÁ DE SI LOS RENDERIZADOS ESTÁN CORRECTOS Y SON FUNCIONALES//
//******************************************************************************************************************************************************************************************//
function navigateToLanding(previousView) { //La función permite navegar al landingPage, es decir, la primera página que se mostrará al acceder a la web.Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta// 
    var landingView = renderLandingPage()

    body.replaceChild(landingView, previousView)
}

function navigateToRegister(previousView) { //La función permite navegar al registerPage, es decir, la página de registro. Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta//
    var registerView = renderRegisterPage() //Declaramos variable registerView, que será la vista de la página de registro y le asignamos el valor de la función de renderizado de la página de registro (renderRegisterPage)//
    currentView = registerView //Asignamos el valor de la vista actual (registerView) a la variable currentView//
    body.replaceChild(registerView, previousView) //Añadimos el contenedor de la página de registro al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por registerView//
}

function navigateToLogin(previousView) { //La función permite navegar a el Login page, es decir, la página de login. Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta//
    var loginView = renderLoginpage() //Declaramos variable loginView, que será la vista de la página de login y le asignamos el valor de la función de renderizado de la página de login (renderLoginPage)//
    currentView = loginView //Asignamos el valor de la vista actual (loginView) a la variable currentView//
    body.replaceChild(loginView, previousView) //Añadimos el contenedor de la página de login al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por loginView//
}

function navigateToHome(previousView) { //La función permite navegar a el Home page, es decir, la página home. Entre paréntises, se introduce el comando previousView, que nos servirá de guía para eliminar el rederizado de la página anterior cuando se renderice esta//
    var homeView = createHomePage() //Declaramos variable homeView, que será la vista de la página de home y le asignamos el valor de la función de renderizado de la página de home (renderHomePage)//
    currentView = homeView //Asignamos el valor de la vista actual (homeView) a la variable currentView//

    body.replaceChild(homeView, previousView) //Añadimos el contenedor de la página home al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por homeView//
}
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN LA EJECUCIÓN DE LA PÁGINA WEB. DEBE SER COLOCADO EN ÚLTIMO LUGAR DEL ÍNDICE HTML, YA QUE POR SI MISMO, NO PODRÍA REALIZAR NADA SI NO BEBE DE LOS ANTERIORES DATOS//
//******************************************************************************************************************************************************************************************//
sessionStorage.id || localStorage.id ? renderHomePage() : renderLandingPage() //Ejecutamos la función de renderLandingPage, pero primero, preguntamos con ternarios si hay algún usuario que esté logueado en este momento. De ser hay, renderiza la página home//
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//

