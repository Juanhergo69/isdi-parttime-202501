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

        let inputElement //Creamos el input sin valor asignado, validaremos si se trata de un textarea o un checkbox//
        if (input.inputType === 'textarea') { //Si el tipo del input es un textarea//
            inputElement = document.createElement('textarea') //Definimos el input como textarea//
            inputElement.className = 'textarea' //Asignamos nombre de clase para dar estilos//
        } else if (input.inputType === 'div') { //Si el if no se cumple, y por tanto no es textarea, pero si el input es un div//
            inputElement = document.createElement('div') //Definimos el input como div//
            inputElement.className = 'divElementPost' //Asignamos nombre de clase para dar estilos//
        } else { //Si el if y el else if no se cumplen, y por tanto, no se trata ni de un textarea ni de un div//
            inputElement = document.createElement('input') //Definimos el input como input//
            inputElement.type = input.inputType //Asignamos el tipo del input en base al tipo del input que se ha iterado con forEach//
        }

        inputElement.id = input.inputId;

        if (input.inputType !== 'checkbox') { //Si el tipo del input es diferente a una checkbox//
            inputElement.placeholder = input.inputPlaceholder || '' //Asignamos el placeholder del input en base al placeholder del input iterado con forEach. Si no hay input asignado, se genera vacío//
        } else if (input.inputType === 'checkbox') { //Si el if no se cumple, y por tanto es una checkbox//
            inputElement.className = 'checkbox' //Asignamos el nombre de clase para la checkbox para dar estilos//
        }

        inputElement.required = input.isRequired //El input recibe las mismas caracteristas de isRequired que el input iterado con forEach//

        formContainer.appendChild(label) //Añadimos label a formContainer//
        formContainer.appendChild(inputElement) //añadimos inputElement a formContainer//
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
    sendMsgForm.style.display = 'none' //Asignamos que el estilo de display de sendMsgForm es none, con idea de ocultarlo (la siguiente validación se encargará de cambiar el display de este formulario)//

    const homeImgContainer = document.createElement('div') //Declaramos homeImgContainer, que servirá de contenedor de la imagen de home, y además tendrá dentro toogleSendMsgFormButton (para que se renderice justo debajo de la imagen)//
    homeImgContainer.className = 'homeImgContainer' //Asignamos nombre de clase para dar estilos//

    const toggleSendMsgFormButton = createButton('New Post', 'toggleSendMsgFormButton', () => { //Declaramos toggleSendMsgButton, que se encargará de mostrar u ocultar sendMsgForm//
        if (sendMsgForm.style.display === 'none' || sendMsgForm.style.display === '') { //El if nos indica que si el display de sendMsgForm es none o está vacío (es decir, es nada)//
            sendMsgForm.style.display = 'flex' //Asignamos el display de sendMsgForm como flex (para mostrarlo)//
            userMsgForm.classList.remove('centered') //Al mostrarse sendMsgForm, se elimina el centrado en pantalla de userMsgForm//
            userMsgForm.style.marginLeft = '0'//Restablecemos el margen izquierdo de userMsgForm//
        } else { //Si el if no ocurre, y por tanto, el display de sendMsgForm no es none o no está vacío//
            sendMsgForm.style.display = 'none' //Asignamos el display de sendMsgForm como none (para ocultarlo)//
            userMsgForm.classList.add('centered')//Al ocultarse sendMsgForm, se añade la clase de centrado en pantalla para userMsgForm//
        }
    })

    homeImgContainer.appendChild(homeImg) //Añadimos homeImg a homeImgContainer//
    homeImgContainer.appendChild(toggleSendMsgFormButton) //Añadimos toggleSendMsgFormButton a homeImgContainer//

    const objectBodyUserMsg = { label: 'Posts of community', inputType: 'div', inputPlaceholder: '', inputId: 'postcommunity', isRequired: false } //Declaramos objectBodyUserMsg, que contendrá los mensajes escritos por los usarios desde sendMsgForm. Esto dará problemas, pero más tarde validaremos el textarea para solucionarlo//
    const userMsgForm = createForm([objectBodyUserMsg], 'Answer', () => { }) //Declaramos userMsgForm, para crear el formulario donde se visualizarán los mensajes enviados por los usuarios desde sendMsgForm. La función se declara vacía, ya que a posteriori la asignaremos con un adEventListener// 
    userMsgForm.addEventListener('submit', (event) => { //Declaramos el addEventListener sobre el submit de userMsgForm//
        event.preventDefault(); //Prevenir el comportamiento por defecto del formulario//
        alert('Contestar mensaje, aún no desarrollado') //Se ejecuta un alert indicando la función que realizaría el submit (no desarrollado aún)//
    })
    userMsgForm.className = 'userMsgForm centered' //Damos un nombre de clase para dar estilos al formulario desde Css, dandole el centrado en pantalla inicialmente//

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

    homeContainer.appendChild(homeImgContainer) //Añadimos homeImgContainer a homeContainer//
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