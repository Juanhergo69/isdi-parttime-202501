var body = document.body; //Traemos el body al archivo Js//

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


//**********************************************************************************************************************************************************************************************//
//CREAMOS FUNCIONES COMUNES QUE SERÁN REUTILIZADAS CONTINUAMENTE. ESTO PERMITE DESARROLLAR CON CLARIDAD Y NO ALARGAR INNECESARIAMENTE EL CÓDIGO. ESTAS FUNCIONES SERÁN LLAMADAS SEGÚN SE PRECISE//
//**********************************************************************************************************************************************************************************************//
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
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//


//**********************************************************************************************************************************************************************************************//
//CREAMOS FUNCIONES DE RENDERIZADO DE CADA UNA DE LAS PÁGINAS QUE CONTENDERÁ NUESTRA PÁGINA WEB//
//**********************************************************************************************************************************************************************************************//
function renderLanding() { //La función permite renderizar el Landing page, es decir, la primera página que se mostrará al acceder a la web//
    var landingContainer = createContainer(''); //Declaramos la variable landingContainer (contenedor de la página principal), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var landingTitle = createTextContainer('h1', 'SM Developers', 'title');  //Declaramos la variable landingTitle (título de la página principal), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
    var joinButton = createButton('JOIN IN!', 'buttonJoin', function () { navigateToRegister(landingContainer) }) //Declaramos la variable joinButton (que será el botón para acceder), y le asignamos el valor de la función createButton. Entre paréntesis agregamos el texto, los estilos, y le pasamos la función de la página a la que queramos ir, en base a la página en la que nos encontramos//

    landingContainer.appendChild(landingTitle); //Añadimos al contenedor de la página principal, el título de la página principal//
    landingContainer.appendChild(joinButton); //Añadimos al contenedor de la página principal, el botón para unirse//

    body.appendChild(landingContainer); //Añadimos el contenedor de la página principal al body//
}

function navigateToRegister(previousView) { //La función permite renderizar el Register page, es decir, la página de registro. Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta//
    var registerContainer = createContainer(''); //Declaramos la variable registerContainer (contenedor de la página de registro), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var registerButtonContainer = createContainer(''); //Declaramos la variable registerButtonContainer (contenedor de los botones de la página de registro), y le asignamos el valor de la función createButtonContainer. Entre paréntesis, agregamos los estilos (styles) que queramos que tenga//
    var registerTitle = createTextContainer('h1', 'Register', 'title'); //Declaramos la variable registerTitle (título de la página de registro), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
    var registerButton = createButton('Register', 'buttonRegister', function () { alert('not rendered yet') }) //Declaramos la variable registerButton (que será el botón para acceder al formulario de registro), y le asignamos el valor de la función createButton. Entre paréntesis agregamos el texto, los estilos, y le pasamos la función de la página a la que queramos ir, en base a la página en la que nos encontramos (en este caso está incompleto, no ha creado la función de renderizado del formulario de registro//
    var toLoginButton = createButton('Go to login', 'buttonGoToLogin', function () { navigateToLogin(registerContainer) }) //Declaramos la variable toLoginButton (que será el botón para acceder a la página de logeo), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los extilos, y le pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    registerButtonContainer.style.display = 'flex'; //Añadimos estilos al contenedor de los botones de la página de registro//
    registerButtonContainer.style.flexDirection = 'row'; //Añadimos estilos al contenedor de los botones de la página de registro//
    registerButtonContainer.style.justifyContent = 'center'; //Añadimos estilos al contenedor de los botones de la página de registro//
    registerButtonContainer.style.gap = '2rem'; //Añadimos estilos al contenedor de los botones de la página de registro//

    registerButtonContainer.appendChild(registerButton); //Añadimos al contenedor de los botones de la página de registro, el botón de registro//
    registerButtonContainer.appendChild(toLoginButton); //Añadimos al contenedor de los botones de la página de registro, el botón de login//
    registerContainer.appendChild(registerTitle); //Añadimos al contenedor de la página de registro, el título de la página de registro//
    registerContainer.appendChild(registerButtonContainer); //Añadimos al contenedor de la página de registro, el contenedor de los botones de la página de registro//

    body.replaceChild(registerContainer, previousView) //Añadimos el contenedor de la página de registro al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por registerContainer//
}

function navigateToLogin(previousView) { //La función permite renderizar el Login page, es decir, la página de login. Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta//
    var loginContainer = createContainer(''); //Declaramos la variable loginContainer (contenedor de la página de logeo), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var loginButtonContainer = createContainer(''); //Declaramos la variable loginButtonContainer (contenedor de los botones de la página de login) y le asignamos el valor de la función createButtonContainer. Entre paréntesis, agregamos los estilos (styles) que queramos que tenga//
    var loginTitle = createTextContainer('h1', 'Login', 'title'); //Declaramos la variable loginTitle (título de la página de logeo), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
    var loginButton = createButton('Login', 'buttonGoToLogin', function () { alert('not rendered yet') }) //Declaramos la variable loginButton (que será el botón para acceder al formulario de logeo), y le asignamos el valor de la función createButton. Entre paréntesis agregamos el texto, los estilos, y le pasamos la función de la página a la que queramos ir, en base a la página en la que nos encontramos (en este caso está incompleto, no ha creado la función de renderizado del formulario de logeo//
    var toRegisterButton = createButton('Go to register', 'buttonRegister', function () { navigateToRegister(loginContainer) }) //Declaramos la variable toRegisterButton (que será el botón para acceder a la página de registro), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los extilos, y le pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    loginButtonContainer.style.display = 'flex'; //Añadimos estilos al contenedor de los botones de la página de login//
    loginButtonContainer.style.flexDirection = 'row'; //Añadimos estilos al contenedor de los botones de la página de login//
    loginButtonContainer.style.justifyContent = 'center'; //Añadimos estilos al contenedor de los botones de la página de login//
    loginButtonContainer.style.gap = '2rem'; //Añadimos estilos al contenedor de los botones de la página de login//

    loginButtonContainer.appendChild(loginButton); //Añadimos al contenedor de los botones de la página de login, el botón de login//
    loginButtonContainer.appendChild(toRegisterButton); //Añadimos al contenedor de los botones de la página de login, el botón de registro//
    loginContainer.appendChild(loginTitle); //Añadimos al contenedor de la página de la página de login, el título de la página de login//
    loginContainer.appendChild(loginButtonContainer); //Añadimos al contenedor de la página de login, el contenedor de los botones de la página de login//

    body.replaceChild(loginContainer, previousView) //Añadimos el contenedor de la pagina de login al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por loginContainer//
}

renderLanding() //Ejecutamos la función de renderLanding//
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//