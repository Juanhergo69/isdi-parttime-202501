export const body = document.body; //Exportamos y creamos el body en el archivo Js//
export let currentView //Exportamos y creamos variable currentView como indefinida, será la página de renderizado en la que nos encontremos actualmente. Se irá asignando por cada renderizado//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN ALGUNA LÓGICA ASOCIADA AL FUNCIONAMIENTO DE LA PÁGINA WEB. DEBE SER COLOCADO EN PRIMER LUGAR DEL ÍNDICE HTML, YA QUE DESDE EL, SERÁN CONDICIONADOS EN SU COMPORTAMIENTO EL RESTO DE DATOS EJECUTADOS//
//******************************************************************************************************************************************************************************************//

//**********************************************************************************************************************************************************************************************//
//LA FUNCION APPENDCHILDREN() ES MERAMENTE CURISIODIDAD, EN PRUEBAS DE RENDIMIENTO, ES PEOR QUE EL MÉTODO CLÁSICO APPENDCHILD//
//**********************************************************************************************************************************************************************************************//
export const appendChildren = (parent, ...children) => { //Exportamos y creamos funcion appendChildren, en base al nodo padre, y con el número indeterminado de hijos para añadir//
    children.forEach(child => parent.appendChild(child)) //Recorremos con forEach los hijos, y con función flecha, indicamos que al nodo padre se le añade el hijo//
    return parent //Devolvemos el nodo padre con los hijos añadidos//
}
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUENTES QUE HE IMPORTADO PARA UTILIZARLAS EN LA PÁGINA WEB. DEBE SER COLOCADO EN SEGUNDO LUGAR DEL INDICE HTML, YA QUE CONDICIONARÁ A LOS FUTUROS RENDERIZADOS DE PÁGINAS Y FORMULARIOS//
//******************************************************************************************************************************************************************************************//
export const loadFonts = () => { //Exportamos y creamos función loadFonts, que nos permitirá cargar al body las siguientes fuentes de texto (agregando más links se pueden añadir infinitas fuentes dentro de la misma función//
    const link = document.createElement('link') //Creamos el link de la fuente de texto//
    link.href = 'https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap' //Indicamos el src de la fuente//
    link.rel = 'stylesheet' //Se declara como un estilo//
    document.head.appendChild(link) //Se añade al head del documento//

    const link2 = document.createElement('link')
    link2.href = 'https://fonts.googleapis.com/css2?family=Zen+Dots&family=Zen+Loop:ital@0;1&display=swap';
    link2.rel = 'stylesheet';
    document.head.appendChild(link2)
}
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//

import { body, currentView } from './1logics.mjs' //Importamos el body desde el archivo 1logics.js//
import { storeMsg, viewMessages } from './4data.mjs' //Importamos funciones de almacenamiento y visualización de mensajes//
import { navigateToLogin, navigateToRegister } from './6navigation.mjs' //Importamos funciones de navegación entre páginas//
import { loadFonts } from './2fonts.mjs'

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN LA CREACIÓN DE UN CONTENEDOR, FORMULARIO, O PÁGINA, QUE SERÁN LLAMADOS PRÓXIMAMENTE EN LOS RENDERIZADOS. DEBE SER COLOCADO EN TERCER LUGAR DEL INDICE HTML, YA QUE CONDICIONARÁ A LOS FUTUROS RENDERIZADOS DE PÁGINAS Y FORMULARIOS, BEBIENDO PREVIAMENTE DE LAS LÓGICAS//
//******************************************************************************************************************************************************************************************//
export const createContainer = (style) => { //Exportamos y creamos createContainer. La función permite crear un contenedor con estilos (style) predefinidos. Esto nos servirá para ir renderizando cada una de las páginas de nuestra web//
    const container = document.createElement('div') //Declaramos container, y le asignamos el valor de documento creado como un div//
    container.className = style //Continuamos asginandole la clase, que en este caso será el estilo que le pase el usuario en la llamada de la función//
    loadFonts()
    return container //Devolvemos container//
}

export const createTextContainer = (tag, text, style) => { //Exportamos y creamos createTextContainer. La función permite crear un elemento html que contiene texto. tag es un formalismo, se debe poner siempre, a continuación se pasa el texto y finalmente los estilos (si se quieren introducir varios estilos, han de ser seguidos dentro del mismo string)//
    const element = document.createElement(tag) //Declaramos element, y le asignamos el valor de documento html creado en base al tag//
    element.textContent = text //Continuamos asignandole el contenido, que en este caso será text (texto)//
    element.className = style //Continuamos asignandole la clase, que en este caso serán los styles (estilos)//
    loadFonts()
    return element //Devolvemos element//
}

export const createButton = (text, style, callback) => { //Exportamos y creamos createButton. La función permite crear un botón. text será el contenido que tendrá, style los estilos y callback funcionaría como la función que proporcionaría (en este caso una respuesta)//
    const button = document.createElement('button') //Declaramos button, y le asignamos el valor de documento html creado como botón ('button')//
    button.textContent = text //Continuamos asignandole el contenido, que en este caso será text (texto)//
    button.className = style  //Continuamos asignandole la clase, que en este caso serán los styles (estilos)//
    button.addEventListener('click', callback) //Creamos un adEventListener, en base al click realizado sobre el botón, para ejecutar el callback//
    loadFonts()
    return button //Devolvemos button//
}

export const createImgButton = (img, style, callback) => { //Exportamos y creamos createImgButton. La función permite crear un botón asociado a una imagen. Tendrá, la propia imagen, los estilos y el callback//
    const imgButton = document.createElement('button') //Declaramos imgButton, que será el botón que ejecutará el submit//
    imgButton.style.border = 'none'; //Añadimos estilos al botón que contendrá la imágen para hacerlo desaparecer del renderizado (tras errores de visualización en la página, he llegado a esta conclusión)//
    imgButton.style.background = 'transparent'; //Añadimos estilos al botón que contendrá la imágen para hacer desaparecer del rederizado (tras errores de visualización de la página, he llegado a esta conclusión)//
    img = document.createElement('img') //Declaramos img, que será la imagen que se introducirá al botón para ejecutuar el submit//
    img.src = 'Logo.jpg' ///Añadimos la raíz de esta imagen (en este caso, esta añadida a la propia carpeta de la app)//
    img.className = style //Declaramos clase de img, que en este caso serán los estilos//

    imgButton.appendChild(img) //Añadimos img al imgbutton//
    body.appendChild(imgButton) //Añadimos imgButton al body//

    imgButton.addEventListener('click', callback) //Creamos adEventListener, en base al click realizado sobre el botón, para ejecutar el callback//
    return imgButton //Devolvemos imgButton//
}


export const createForm = (inputsArray, submitButtonText, callback) => { //Exportamos y creamos createForm. La función permite crear un formulario. inputsArray serán los objetos a crear ej.-->[{label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email'}, {label: 'Password....}], submitButtonText será el botón de ejecución de los inputsArray y callback sería la función de respuesta a todo lo anterior//
    const formContainer = document.createElement('form') //Declaramos formContainer, y le asignamos el valor de documento html creado como 'div'. Será el contenedor de nuestro formulario//
    formContainer.className = 'form' //Continuamos asignandole la clase, que en este caso será un formulario (form)//
    inputsArray.forEach(input => { //Hacemos una iteración con forEach sobre inputsArray, en base al input//
        const label = document.createElement('label') //Creamos la etiqueta (label)//
        label.htmlFor = input.inputId //Indicamos que la etiqueta es la misma que la del id del input que se ha recorrido con forEach//
        label.textContent = input.label //Indicamos que el contenido es la etiqueta del input que se ha recorrido con forEach//

        const inputElement = document.createElement('input') //Creamos el input//
        inputElement.type = input.inputType //Indicamos que el tipo de input es el mismo que el que se ha recorrido con forEach// 
        inputElement.id = input.inputId //Indicamos que la id del input es la misma que la del input que se ha recorrido con forEach//

        if (input.inputType !== 'checkbox') { //El if nos indica, que si el tipo del input no es una checkbox//
            inputElement.placeholder = input.inputPlaceholder || '' //El placeholder será igual al placeholder del input recorrido por forEach, o, en el caso que no exista placeholder, nada (string vacío)
        } else { //Si el if no se cumple, y por tanto, el input es efectivamente una checkbox//
            inputElement.className = 'checkbox' //Asignamos nombre de clase de ese input para darle estilos//
        }

        inputElement.required = input.isRequired //El input creado tiene las mismas caracteristas de isRequired que el input recorrido por forEach//

        formContainer.appendChild(label) //Añadimos la etiqueta a formContainer//
        formContainer.appendChild(inputElement) //Añadimos el input a formContainer//
    })

    const submitButton = document.createElement('input') //Declaramos sumbitButton, y le asignamos el valor de documento html creado como input//
    submitButton.type = 'submit' //Continuamos asignando el tipo de submitButton, que en este caso será submit//
    submitButton.value = submitButtonText //Continuamos asignando el valor de submitButton, que en este caso será submitButtonText//

    formContainer.appendChild(submitButton) //Añadimos submitButton a formContainer//

    formContainer.addEventListener('submit', function (event) { //Indicamos que, cuando se producza un submit (en este caso, que se ejecute submitButton) , se ejecutará una función sobre el evento//
        event.preventDefault() //Para evitar comportamientos extraños, como que se reinice el renderizado, ejecutamos preventDefault sobre ese evento//
        const form = event.target //Declaramos form, que será igual al objetivo del evento. En este caso, el objetivo del evento es el formulario creado. ej--> elemento form html al que le hemos dado submit//
        const formData = {} //Declaramos formData, que se corresponderá a los datos del formulario. Se declara como un objeto vacío que se irá rellenando con la iteración del siguiente for//

        inputsArray.forEach(input => { //Hacemos una iteración con forEach sobre inputsArray, en base al input//
            const fieldName = input.inputId //Declaramos fielName, y asignamos que es la id del input recorrido con forEach//
            const value = form[input.inputId].value //Declaramos value, y asginamos que devuelve el valor de id del input recorrido por forEach en el formulario//
            formData[fieldName] = value //Se asigna el valor del campo de entrada al fielName de formData//
        })

        loadFonts()
        callback(formData) //Se ejecuta el callback pasandole formData//
    })

    return formContainer //Devolvemos formContainer//
}

export const createHomePage = () => { //Exportamos y creamos createHombePage. La función permite crear la página home//
    const homeContainer = createContainer('homeContainer') //Declaramos homeContainer (contenedor de la página home), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    let loggedUserId //Declaramos variable loggedUserId, que recogerá los datos del usuario que ha hecho login, y en un princpio, la declaramos vacía, ya que dependiendo de si el almacenamiento es local o en sesión se añadairá a uno u otro (if de más abajo)//

    if (localStorage.id) { //El if nos indica que, si la id se encuentra en localStorage (almacenamiento local)//
        loggedUserId = JSON.parse(localStorage.getItem('id')) //Declaramos que la id del usuario que ha logueado se quedará almacenado en el local de la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia JSONparse permite transformar el resultado en formato json a formato javascript//
    } else { //Si el if no se cumple, y por tanto, si la id se encuentra sessionStorage (almacenamiento en la sesion)//
        loggedUserId = JSON.parse(sessionStorage.getItem('id')); //Declaramos que la id del usuario que ha logueado se quedará almacenado en la sesion de la base de datos de juguete (devtools/aplications/sessionstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia JSONparse permite transformar el resultado en formato json a formato javascript//
    }

    const usersJson = localStorage.users //Declaramos usersJson, que serán los usuarios que se registren, y que quedarán almacenados en la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia//
    const users = JSON.parse(usersJson) //Transformar el resultado en formato JSON a formato javascript// 

    const userLogged = users ? users.find(function (_user) { return _user.id === loggedUserId }) : undefined //Declaramos userLogged, que permitirá comprobar, con ternarios, si el usuario se encuentra en la comprobación facilitada//

    if (!userLogged) { //El if nos indica que si el usuario no se encuentra previamente registrado//
        alert('Create an account first') //Nos arroja un alert con el siguiente mensaje//
        return navigateToRegister(currentView) //Navegamos a la página de registro desde la página actual//
    }

    const loggedUserUsername = userLogged.userName //Declaramos loggedUserUserName, que se corresponderá al usuario logeado en base a su nombre de usuario//
    const homeImg = document.createElement('img') //Declaramos homeImg (imagen de homePage), y le asignamos el valor de documento html como imagen ('img')//
    homeImg.src = 'Logo.jpg' //Añadimos la raíz de esta imagen (en este caso, esta añadida a la propia carpeta de la app)//
    homeImg.className = 'homeImg' //Añadimos la clase css y le asignamos el nombre landingImg (en index.css se continúa el desarrollo de estilos)//
    const homeMsg = createTextContainer('h1', `Welcome, ${loggedUserUsername}`, 'homeMsg') //Declaramos welcomeText, que se corresponderá al mensaje de bienvenida una vez se acceda a la página home//
    const menuDropContainer = createContainer('menuDropContainer') //Declaramos menuDropContainer, que será el contenedor del menú desplegable que contendrá los elementos que se mostrarán al pulsar menuButton//

    const menuButton = createButton(loggedUserUsername[0].toUpperCase(), 'menuButton', () => { //Declaramos la variable menuButton, que tendrá como texto la primera letra puesta en mayúsculas del usuario logueado. Este botón tendrá la función de desplegar los elementos contenidos en menuDropContainer//
        if (menuDropContainer.style.display === 'none' || menuDropContainer.style.display === '') { //El if valida el estado de menuDropContainer. La idea es parametrizarlo en display 'none' desde css, y cuando se active el botón, haría el cambio a flex y se mostraría con los estilos asignados// 
            menuDropContainer.style.display = 'flex' //menuDropContainer se renderiza con categoría flex//
        } else { //Si no se produce ninguna condición del if, por tanto, el menuDropContainer está renderizado//
            menuDropContainer.style.display = 'none' //Lo borramos de pantalla//
        }
    })

    const profileButton = createButton('Profile', 'profileButton', () => { //Declaramos profileButton, para crear el botón de perfil de usuario. La función es un alert, ya que el renderizado de esa página aún no está realizado//
        alert('Ir al perfil, página no renderizada')
    })

    const settingsButton = createButton('Settings', 'settingsButton', () => { //Declaramos settingsButton, para crear el botón de ajustes del usuario. La función es un alert, ya que el renderizado de esa página aún no está realizado//
        alert('Ir a ajustes, página no renderizada')
    });

    const logoutButton = createButton('Logout', 'logoutButton', () => { //Declaramos logoutButton (que será el botón para salir de la página home, y deslogar el usuario), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los estilos, y la pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
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

    const objectTitleSendMsg = { label: 'Title your post', inputType: 'textTitle', inputPlaceholder: 'Enter your title', inputId: 'title', isRequired: true } //Declaramos objectTitleSendMsg, que será el objeto que contenga el titulo del post que se quiera añadir//
    const objectBodySendMsg = { label: 'Write your post', inputType: 'textarea', inputPlaceholder: 'Enter your msg', inputId: 'msg', isRequired: true } //Declaramos objectBodySendMsg, que será el cuerpo donde el usuario añada el mensaje que quiere enviar. Esto dará problemas, pero más tarde validaremos el textarea para solucionarlo// //

    const sendMsgForm = createForm([objectTitleSendMsg, objectBodySendMsg], 'Post your Msg', () => { //Declaramos sendMsgForm, para crear el formulario de creación de mensaje//
        sendMsgForm.addEventListener('submit', (event) => { //Declaro en primer lugar que sendMsgForm reaccionará al submit (no encuentro mejor forma de hacerlo)//
            event.preventDefault() //Previniendo los comportamientos predeterminados del formulario//
        })
        const title = document.getElementById('title').value //Declaramos title, que contendenrá, gracias a la función getElementById, la id del título del post//
        const msg = document.getElementById('msg').value //Declaramos msg, que contendrá, gracias a la función getElementById, la id del mensaje que se escriba//
        const date = new Date() //Declaramos date, que será la fecha exacta en la que el usuario mandó el mensaje a localStorage//
        storeMsg(loggedUserId, title, msg, date) //Ejecutamos la función de almacenamiento de mensaje en base al userMsg//
        document.getElementById('title').value = '' //Despues de ejecutar la funcion storeMsg, limpiamos el campo de titulo//
        document.getElementById('msg').value = '' //Despues de ejecutar la funcion storeMsg, limpiamos el campo de msg//
        viewMessages() //Ejecutamos la función viewMessages para mostrar el mensaje enviado en userMsgForm//
    })
    sendMsgForm.className = 'sendMsgForm' //Damos un nombre de clase para dar estilos al formulario desde Css//

    const objectBodyUserMsg = { label: 'Posts of community', inputType: 'div', inputPlaceholder: '', inputId: 'postcommunity', isRequired: false } //Declaramos objectBodyUserMsg, que contendrá los mensajes escritos por los usarios desde sendMsgForm. Esto dará problemas, pero más tarde validaremos el textarea para solucionarlo//
    const userMsgForm = createForm([objectBodyUserMsg], 'Answer', () => { }) //Declaramos userMsgForm, para crear el formulario donde se visualizarán los mensajes enviados por los usuarios desde sendMsgForm. La función se declara vacía, ya que a posteriori la asignaremos con un adEventListener// 
    userMsgForm.addEventListener('submit', (event) => { //Declaramos el addEventListener sobre el submit de userMsgForm//
        event.preventDefault(); //Prevenir el comportamiento por defecto del formulario//
        alert('Contestar mensaje, aún no desarrollado') //Se ejecuta un alert indicando la función que realizaría el submit (no desarrollado aún)//
    })
    userMsgForm.className = 'userMsgForm' //Damos un nombre de clase para dar estilos al formulario desde Css//


    const inputElementMsg = document.getElementById('msg') //Declaramos inputElementMsg, para comenzar con las validaciones, con idea de forzar que el input pase a ser un textarea//
    if (inputElementMsg && objectBodySendMsg.inputType === 'textarea') { //El if nos indica que si inputElementMsg y el tipo de input del objeto objectBodySendMsg son exactamente iguales a textarea//
        const textareaElementMsg = document.createElement('textarea') //Declaramos textareaElementMsg, y la creamos como documento HTML textarea//

        textareaElementMsg.id = inputElementMsg.id //Estas igualdades permiten asignar las caracteristicas de los input a textarea//
        textareaElementMsg.placeholder = inputElementMsg.placeholder //Estas igualdades permiten asignar las caracteristicas de los input a textarea//
        textareaElementMsg.required = inputElementMsg.required //Estas igualdades permiten asignar las caracteristicas de los input a textarea//

        inputElementMsg.parentNode.replaceChild(textareaElementMsg, inputElementMsg) //Con parentNode accedemos al nodo padre de los inputs, es decir, userMsgForm, para decirle que remplace los inputElementPost por textAreaElementPost//
    }

    const inputElementPost = document.getElementById('postcommunity') //Declaramos inputElementPost, para comenzar con las validaciones, con idea de asignar la categoría div a todas las variables con esa id (este será el contenedor de todos los mensajes)//
    if (inputElementPost && objectBodyUserMsg.inputType === 'div') { //El if nos indica que si inputElementPost y el tipo de input del objeto objectBodyUserMsg son exactamente iguales a un div//
        const divElementPost = document.createElement('div') //Declaramos variable divElementPost y lo creamos como div//
        divElementPost.id = inputElementPost.id //Declaramos que la id de divElementPost es igual a la id de inputElementPost//
        divElementPost.className = 'divElementPost' //Declaramos nombre de clase para dar estilos//
        inputElementPost.parentNode.replaceChild(divElementPost, inputElementPost) //Con parentNode accedemos al nodo padre de los inputs, es decir, userMsgForm, para decirle que remplace los inputElementPost por divElementPost//
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

    loadFonts()
    viewMessages() //Ejecutamos la función viewMessages para mostrar todos los mensajes almacenados actualmente//

    return homeContainer //Devolvemos homeContainer//
}
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//

import { navigateToHome } from './6navigation.mjs'
import { currentView } from './1logics.mjs'

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN EL TRATAMIENTO DE DATOS, YA SEA CREACIÓN, ALMACENAMIENTO O COMPARACIÓN DE LOS MISMOS. DEBE COLOARSE EN CUARTA POSICIÓN DEL INDICE HTML, YA QUE, TRAS LOS RENDERIZADOS, EJECUTARÁ UNA SERIE DE LÓGICAS PARA LA CREACIÓN DE USUARIOS Y LOGEO DE USUARIOS//
//******************************************************************************************************************************************************************************************//
export const registerUser = (registerData) => { //Exportamos y creamos registerUser. La función permite crear el registro del usuario, en base a los datos de registro ej.-->registerData = {'email': '', 'password': '', 'confirmation-password': ''}//
    if (!registerData['email'] && !registerData['password'] && !registerData['confirmation-password']) { //El if nos indica que si no se rellena el campo de email, contraseña y confirmación de contraseña ej-->!registerData['email'] => registerData['email'] === undefined && registerData['email'] === null//
        alert('Register Data Incomplete') //Nos arroja un alert que nos indica que los datos están incompletos//
        return //Al producirse esto, nos salimos de la función//
    }
    if (registerData['password'] !== registerData['confirmation-password']) { //El if nos indica que si el campo de contraseña es diferente al campo de confirmar contraseña//
        alert('Password and confirmation password are not the same') //Nos arroja un alert que nos indica que las contraseñas no son coincidentes//
        return //Al producirse esto, nos salimos de la función//
    }

    const usersJson = localStorage.getItem('users') //Declaramos usersJson, que serán los usuarios que se registren, y que quedarán almacenados en la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia//

    let users //Declaramos variable users, donde se irán almacenando los usuarios registrados. De esta variable beberá la anterior variable usersJson para poder hacer las comprobaciones de si el usario no está registrado (y por ende, se cree la cuenta nueva) o de estarlo, pasar a página de home//
    if (!usersJson) { //El if nos dice, que si al hacer la comprobación no está registrado el usuario//
        users = [] //Se almacena en la variable users//
    } else { //Y si ocurre lo contrario, es decir, que sí existe en la base de datos//
        users = JSON.parse(usersJson) //Transformar el resultado en formato json a formato javascript// 
    }

    const doesUserExist = users.some(_user => { return _user.email === registerData['email'] }) //Declaramos doesUserExist, que nos permitirá comprobar la existencia (o no) del usuario que pretende registrarse. Some permite comprobar si alguno de los elementos cumple la condición indicada, en base a la función proporcionada//
    if (doesUserExist) { //El if nos indica que, si el usuario existe//
        alert('this mail is alredy in use') //Nos lanza un alert indicando que el usuario ya existe//
        return //Si se cumple el if, nos salimos de la función//
    }

    const userName = registerData['email'].split('@')[0] //Declaramos variable userName, que será el nombre que adoptará el sistema para el usuario registrado. Mediante split, dividimos la dirección de mail en dos partes de un mismo array, partiendo desde el arroba (y haciéndolo desaparecer), y seleccionamos el elemento 0, es decir, la primera posición de ese array. En este caso, sería todo lo anterior al @//
    const userCreated = { email: registerData['email'], password: registerData['password'], userName, id: Date.now() } //Declaramos userCreated, que serán los datos almacenados del registro del usuario. Constará de su email, su contraseña, su nombre de usuario (declarado arriba) y "trampeamos con id:Date.now(), para asignar una id especifica para ese usuario"

    users.push(userCreated) //Con este push lo que hacemos es empujar los datos de userCreated a la variable users previamente declarada//
    localStorage.users = JSON.stringify(users) //Asignamos a nuestra base de datos de usuarios el valor de JSON.stringify sobre los usuarios, básicamente transformamos de javascript a Json//
    sessionStorage.id = userCreated.id //Almacenamos en sessionStorage el id del usuario que se acaba de registrar y/o logear//

    navigateToHome(currentView) //La función navigateToHome permite navegar hasta la página de home, a traves de la vista actual (currentView)
}

export const loginUser = (loginData) => { //Exportamos y creamos loginUser. La función permite crear el login del usuario, en base a los datos de registro ej.-->loginData = {'email': '', 'password': ''}//
    const usersJson = localStorage.getItem('users') //Declaramos usersJson, que serán los usuarios que se registren, y que quedarán almacenados en la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia//
    const users = JSON.parse(usersJson) //Declaramos users, que transformará el resultado en formato json a formato javascript//
    const userLoginCheckout = users ? users.find(function (_user) { return _user['email'] === loginData['email'] }) : undefined //Declaramos variable userLoginCheckout, que permitirá comprobar, con ternarios, si el usuario se encuentra en la comprobación facilitada//

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

export const storeMsg = (loggedUserUserId, title, msg, date) => { //Exportamos y creamos storeMSg. La función permitira almacenar un mensaje en localStorage, basado en el nombre del usuario, titulo, mensaje y fecha de creación//
    if (!title || !msg) { //El if nos indica que si no hay título o no hay mensaje//
        alert('All fields are required. The message has not been stored') //Se ejecuta un alert indicando que el mensaje no se ha almacenado//
        return //Nos salimos de la función//
    } else { //Si no se cumple el if, es decir, hay titulo y mensaje//
        const objectUserMsg = { userId: loggedUserUserId, title: title, msg: msg, date: date.toLocaleString() } //Declaramos objectUserMsg, que contendrá la id del usuario, titulo, mensaje y fecha(utilizamos toLocaleString para formatear la fecha y que sea legible//
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [] //Declaramos storeMessages, que contendrá los mensajes cojidos de localStorage (hay que hacer la conversión con JSON.parse). Si no los hay, se ejecutará un array vacío//
        storedMessages.push(objectUserMsg); //Pusheamos, o lo que es lo mismo, añadimos objectUserMsg a storeMessages//
        localStorage.setItem('messages', JSON.stringify(storedMessages)); //Y añadimos a localStorage el mensaje (hay que hacer la conversión con JSON.stringify)
        alert('Message stored successfully.') //Se ejecuta un alert indicando que el mensaje se ha almacenado//
    }
}

export const viewMessages = () => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [] //Declaramos storeMessages, que contendrá los mensajes cojidos de localStorage (hay que hacer la conversión con JSON.parse) Si no los hay, se ejecutará un array vacío//
    const postCommunityMsgContainer = document.getElementById('postcommunity') //Declaramos postCommunityMsgContainer, que contendrá todos los elementos de la id postcommunity//
    const users = JSON.parse(localStorage.getItem('users')) || [] //Declaramos users, y la traemos haciendo el cambio de JSON  JS desde localStorage. Si no hay usuarios registrados, nos traemos un array vacío//

    postCommunityMsgContainer.innerHTML = '' //Limpiamos el contenedor antes de agregar los mensajes//

    storedMessages.forEach(message => { //Iteramos cada mensaje almacenado//
        const messageDiv = document.createElement('div') //Declaramos messageDiv, y lo creamos como div (servirá de contenedor para el mensaje)
        messageDiv.className = 'message' //Asignamos nombre de clase para dar estilos//

        const user = users.find(_user => _user.id === message.userId) //Declaramos user, que contendrá la búsqueda del nombre del usuario actualizado usando la ID almacenada en el mensaje//
        const userName = user ? user.userName : 'Unknown User' //Declaramos userName. Si no se encuentra el usuario preguntando con ternarios, mostramos Unknown User//

        const userDiv = document.createElement('div') //Declaramos userDiv//
        userDiv.className = 'message-user' //Asignamos nombre de clase para dar estilos//
        userDiv.textContent = `User: ${userName}` //Indicamos que su contenido será el nombre del usuario actualizado//
        messageDiv.appendChild(userDiv) //Añadimos userDiv a messageDiv//

        const titleDiv = document.createElement('div') //Declaramos variable titleDiv//
        titleDiv.className = 'message-title' //Asignamos nombre de clase para dar estilos//
        titleDiv.textContent = `Title: ${message.title}` //Indicamos que su contenido será el título del mensaje//
        messageDiv.appendChild(titleDiv) //Añadimos titleDiv a a messageDiv//

        const msgDiv = document.createElement('div') //Declaramos variable msgDiv//
        msgDiv.className = 'message-text' //Asignamos nombre de clase para dar estilos//
        msgDiv.textContent = `Message: ${message.msg}` //Indicamos que su contenido será el mensaje escrito por el usuario//
        messageDiv.appendChild(msgDiv) //Añadimos msgDiv a messageDiv//

        const dateDiv = document.createElement('div') //Declaramos variable dateDiv//
        dateDiv.className = 'message-date' //Asignamos nombre de clase para dar estilos//
        dateDiv.textContent = `Date: ${message.date}` //Indicamos que su contenido será la fecha en la que se generó el mensaje//
        messageDiv.appendChild(dateDiv) //añadimos dateDiv a messageDiv//

        postCommunityMsgContainer.appendChild(messageDiv) //Añadimos messageDiv a postComunityMsgContainer//
    })
}
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//

import { body, currentView } from './1logics.mjs' //Importamos el body y la página actual//
import { createContainer, createTextContainer, createButton, createImgButton, createForm } from './3containers.mjs' //Importamos todos los creadores de contenedores//
import { registerUser, loginUser } from './4data.mjs' //Importamos las funciones de registro y logueo//
import { navigateToRegister, navigateToLogin, navigateToHome, navigateToLanding } from './6navigation.mjs' //Importamos las funciones de navegación//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN RENDERIZADOS DE LAS DISTINAS PÁGINAS DE NUESTRA WEB. DEBE SER COLOCADO EN QUINTO LUGAR DEL ÍNDICE HTML, YA QUE, EL REDERIZADO DEPENDERÁ DE SI LAS LÓGICAS SON CORRECTAS, Y DEPENDIENDO DEL TRATAMIENTO DE LOS DATOS, RENDERIZARÁ UNA PÁGINA U OTRA//
//******************************************************************************************************************************************************************************************//
export const renderLandingPage = () => { //Exportamos y creamos renderLandingPage. La función permite renderizar el Landing page, es decir, la primera página que se mostrará al acceder a la web//
    const landingContainer = createContainer('landingContainer'); //Declaramos landingContainer (contenedor de la página principal), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    const landingMsg = createTextContainer('h3', 'Welcome to your social developer network', 'landingMsg') //Declaramos la landingMsg (mensaje de la página principal, y le asignamos la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado de menor tamaño), el texto y los estilos//
    const landingImg = document.createElement('img') //Declaramos landingImg (imagen de landingPage), y le asignamos el valor de documento html como imagen ('img')//
    landingImg.src = 'Logo.jpg' //Añadimos la raíz de esta imagen (en este caso, esta añadida a la propia carpeta de la app)//
    landingImg.className = 'landingImg' //Añadimos la clase css y le asignamos el nombre landingImg (en index.css se continúa el desarrollo de estilos)//

    const joinButton = createButton('Join In!', 'buttonJoin', function () { navigateToRegister(landingContainer) }) //Declaramos joinButton (que será el botón para acceder), y le asignamos el valor de la función createButton. Entre paréntesis agregamos el texto, los estilos, y le pasamos la función de la página a la que queramos ir, en base a la página en la que nos encontramos//

    landingContainer.appendChild(landingImg) //Añadimos al contenedor de la página principal, la imágen de la página principal//
    landingContainer.appendChild(landingMsg) //Añadimos al contenedor de la página principal, el mensaje de bienvenida//
    landingContainer.appendChild(joinButton) //Añadimos al contenedor de la página principal, el botón para unirse//

    body.appendChild(landingContainer); //Añadimos el contenedor de la página principal al body//

    return landingContainer //Devolvemos landingContainer//
}

export const renderRegisterPage = () => { //Exportamos y creamos renderRegisterPage. La función permite renderizar el registerPage, es decir, la página de registro//
    const registerContainer = createContainer('registerForm'); //Declaramos registerContainer (contenedor de la página de registro), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    const registerTitle = createTextContainer('h1', 'REGISTER', 'title'); //Declaramos registerTitle (título de la página de registro), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
    const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true } //Declaramos objectEmail, que contendrá los campos correspondientes al input de email//
    const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true } //Declaramos objectPassword, que contendrá los campos corespondientes al input de contraseña//
    const objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true } //Declaramos objectConfirmPassword, que contendrá los campos correspondientes al input de confirmar contraseña//
    const registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser) //Declaramos registerForm, que se corresponde al formulario de registro. Llamamos al función createForm y le introducimos los objetos que queremos que se rendericen, así como el submit (en este caso Register) y el callback, que será llamando a la función registerUser//
    const toLoginButton = createButton('Go to login', 'buttonGoToLogin', () => { navigateToLogin(registerContainer) }) //Declaramos toLoginButton (que será el botón para acceder a la página de logeo), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los estilos, y le pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    const toLandingButton = createImgButton('img', 'imgButton', () => { navigateToLanding(registerContainer) }) //Declaramos toLandingButton (que será el botón acceder a la página de landing), y le asignamos el valor de la función createImgButton. Entre paréntesis, agregamos el texto, los estilos, y la pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    const registerMsg = createTextContainer('h4', 'Have you an account?', 'registerMsg')

    registerContainer.appendChild(toLandingButton) //Añadimos toLandingButton a registerContainer//
    registerContainer.appendChild(registerTitle) //Añadimos registerTitle a registerContainer//
    registerContainer.appendChild(registerForm) //Añadimos registerForm a registerContainer//
    registerContainer.appendChild(registerMsg) //Añadimos registerMsg a registerContainer/
    registerContainer.appendChild(toLoginButton) //Añadimos toLoginButton a registerContainer//

    body.appendChild(registerContainer) //Añadimos registerContainer al body//

    return registerContainer //Devolvemos registerContainer//
}

export const renderLoginpage = () => { //Exportamos y creamos renderLoginPage. La función permite renderizar la loginPage, es decir, la página de login//
    const loginContainer = createContainer('loginForm'); //Declaramos loginContainer (contenedor de la página de login), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    const loginTitle = createTextContainer('h1', 'LOGIN', 'title'); //Declaramos loginTitle (título de la página de login), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
    const objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true } //Declaramos objectEmail, que contendrá los campos correspondientes al input de email//
    const objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true } //Declaramos objectPassword, que contendrá los campos corespondientes al input de contraseña//
    const objectRememberMe = { label: 'Remember me', inputType: 'checkbox', inputId: 'rememberme', isRequired: false } //Declaramos objectRememberMe, que contendrá la checkbox para recordar el incio de sesión//
    const loginForm = createForm([objectEmail, objectPassword, objectRememberMe], 'Login', loginUser) //Declaramos loginForm, que se corresponde al formulario de login. Llamamos al función createForm y le introducimos los objetos que queremos que se rendericen, así como el submit (en este caso Login) y el callback, que será llamando a la función loginUser//
    const toRegisterButton = createButton('Register now!', 'buttonGoToRegister', () => { navigateToRegister(loginContainer) }) //Declaramos toRegisterButton (que será el botón para acceder a la página de registro), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los extilos, y le pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    const toLandingButton = createImgButton('img', 'imgButton', () => { navigateToLanding(loginContainer) }) //Declaramos toLandingButton (que será el botón acceder a la página de landing), y le asignamos el valor de la función createImgButton. Entre paréntesis, agregamos el texto, los estilos, y la pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    const loginMsg = createTextContainer('h4', 'You don`t have an account?', 'loginMsg')

    loginContainer.appendChild(toLandingButton) //Añadimos toLandingButton a loginContainer//
    loginContainer.appendChild(loginTitle) //Añadimos loginTitle a loginContainer//
    loginContainer.appendChild(loginForm) //Añadimos loginForm a loginContainer//
    loginContainer.appendChild(loginMsg) //Añadimos loginMsg a loginContainer//
    loginContainer.appendChild(toRegisterButton) //Añadimos toRegisterButton a loginContainer//

    body.appendChild(loginContainer) //Añadimos loginContainer al body//

    return loginContainer //Devolvemos loginContainer//
}

export const renderHomePage = () => { //Exportamos y creamos renderHomePage. La función permite renderizar el Home page, es decir, la página de home//
    const homePage = createHomePage() //Declaramos homePage, que será la propia página de home, y se ejecutará mediante la función createHomePage//

    body.appendChild(homePage) //Añadimos homePage al body//
}
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//

import { body, currentView } from './1logics.mjs' //Importamos el body y la página actual//
import { renderLandingPage, renderRegisterPage, renderLoginpage } from './5rendered.mjs' //Importamos todas las funciones que involucran el renderizado de las distintas páginas//
import { createHomePage } from './3containers.mjs' //Importamos la funcion createHomePage//
//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN NAVEGACIÓN ENTRE LOS DISTINTOS RENDERIZADOS DE NUESTRA WEB. DEBE SER COLOCADO EN SEXTO LUGAR DEL ÍNDICE HTML, YA QUE, LA NAVEGACIÓN DEPENDERÁ DE SI LOS RENDERIZADOS ESTÁN CORRECTOS Y SON FUNCIONALES//
//******************************************************************************************************************************************************************************************//
export const navigateToLanding = (previousView) => { //Exportamos y creamos navigateToLanding. La función permite navegar al landingPage, es decir, la primera página que se mostrará al acceder a la web.Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta// 
    const landingView = renderLandingPage() //Declaramos landingView, que contendrá la vista de la página Landing//

    body.replaceChild(landingView, previousView)
}

export const navigateToRegister = (previousView) => { //Exportamos y creamos navigateToRegister. La función permite navegar al registerPage, es decir, la página de registro. Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta//
    const registerView = renderRegisterPage() //Declaramos registerView, que contendrá la vista de la página Register//
    currentView = registerView //Asignamos el valor de la vista actual (registerView) a la variable currentView//
    body.replaceChild(registerView, previousView) //Añadimos el contenedor de la página de registro al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por registerView//
}

export const navigateToLogin = (previousView) => { //Exportamos y creamos navigateToLogin. La función permite navegar a el Login page, es decir, la página de login. Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta//
    const loginView = renderLoginpage() //Declaramos loginView, que contendrá la vista de la página Login//
    currentView = loginView //Asignamos el valor de la vista actual (loginView) a la variable currentView//
    body.replaceChild(loginView, previousView) //Añadimos el contenedor de la página de login al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por loginView//
}

export const navigateToHome = (previousView) => { //Exportamos y creamos navigateToHome. La función permite navegar a el Home page, es decir, la página home. Entre paréntises, se introduce el comando previousView, que nos servirá de guía para eliminar el rederizado de la página anterior cuando se renderice esta//
    const homeView = createHomePage() //Declaramos homeView, que será la vista de la página Home// 
    currentView = homeView //Asignamos el valor de la vista actual (homeView) a la variable currentView//

    body.replaceChild(homeView, previousView) //Añadimos el contenedor de la página home al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por homeView//
}
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//

import { renderHomePage, renderLandingPage } from './5rendered.mjs' //Importamos funciones de renderizado de página home y página landing//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN LA EJECUCIÓN DE LA PÁGINA WEB. DEBE SER COLOCADO EN ÚLTIMO LUGAR DEL ÍNDICE HTML, YA QUE POR SI MISMO, NO PODRÍA REALIZAR NADA SI NO BEBE DE LOS ANTERIORES DATOS//
//******************************************************************************************************************************************************************************************//
sessionStorage.id || localStorage.id ? renderHomePage() : renderLandingPage() //Ejecutamos la función de renderLandingPage, pero primero, preguntamos con ternarios si hay algún usuario que esté logueado en este momento. De ser hay, renderiza la página home//
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//