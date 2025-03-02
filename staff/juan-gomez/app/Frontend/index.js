var body = document.body; //Traemos el body al archivo Js//
var currentView //Creamos variable currentView como indefinida, será la página de renderizado en la que nos encontremos actualmente. Se irá asignando por cada renderizado//

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
        inputElement.placeholder = input.inputPlaceholder //Continuamos asinando a inputElemento el placeholder, que será aquello que sirva de guía para que el usuario sepa que debe escribir ahí. Será la id del placeholder sobre el input//
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

            formData[fieldName] = value; //Asignamos a formData, en base al nombre del campo, el valor iterado en el for. ej-->formData = {'email': 'patata@mail.com'}//
        }

        callback(formData) //Llamamos a la respuesta (callback) de los datos del formulario.
    })

    return formContainer //Devolvemos formContainer//

}

function registerUser(registerData) { //La función permite crear el registro del usuario, en base a los datos de registro ej.-->registerData = {'email': '', 'password': '', 'confirmation-password': ''}//
    if (!registerData['email'] && !registerData['password'] && !registerData['confirmation-password']) { //El if nos indica que si no se rellena el campo de email, contraseña y confirmación de contraseña ej-->!registerData['email'] => registerData['email'] === undefined && registerData['email'] === null//
        alert('Register Data Incomplete') //Nos arroja un alert que nos indica que los datos están incompletos//
        return //Al producirse esto, nos salimos de la función//
    }
    if (registerData['password'] !== registerData['confirmation-password']) { //El if nos indica que si el campo de contraseña es diferente al campo de confirmar contraseña//
        alert('Password and confirmation password are not the same') //Nos arroja un alert que nos indica que las contraseñas no son coincidentes//
        return //Al producirse esto, nos salimos de la función//
    }

    //Mejoras a considerar: Asignar longitud mínima de contraseña, introducir mínimo una letra mayúscula en la contraseña, validar que el mail no esta en uso, etc//

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

    sessionStorage.id = userLoginCheckout.id ////Almacenamos en sessionStorage el id del usuario que se acaba de registrar y/o logear//

    navigateToHome(currentView)
}

function createHomePage() { //La función permite crear la página home//
    var homeContainer = createContainer('')  //Declaramos la variable homeContainer (contenedor de la página home), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var loggedUserId = JSON.parse(sessionStorage.getItem('id')); //Declaramos variable users, que transformará el resultado en formato json a formato javascript, realizando la comprobación de si el usario está almacenado en la sessionStorage//
    var usersJson = localStorage.getItem('users') //Declaramos variable usersJson, que serán los usuarios que se registren, y que quedarán almacenados en la base de datos de juguete (devtools/aplications/localstorage sobre nuestro index html) getItem permite "cojer" aquel elemento parametrizado dentro del paréntesis para usarlo de referencia//
    var users = JSON.parse(usersJson) //Transformar el resultado en formato json a formato javascript// 

    var userLogged = users ? users.find(function (_user) { return _user.id === loggedUserId }) : undefined //Declaramos variable userLogged, que permitirá comprobar, con ternarios, si el usuario se encuentra en la comprobación facilitada//

    if (!userLogged) { //El if nos indica que si el usuario no se encuentra previamente registrado//
        alert('Create an account first') //Nos arroja un alert con el siguiente mensaje//
        return renderRegisterPage();
    }

    var loggedUserUsername = userLogged.userName //Declaramos la variable loggedUserUserName, que se corresponderá al usuario logeado en base a su nombre de usuario//
    var welcomeText = createTextContainer('h1', `Welcome, ${loggedUserUsername}`, 'welcomeMsg') //Declaramos la variable welcomeText, que se corresponderá al mensaje de bienvenida una vez se acceda a la página home//
    welcomeText.className = 'welcomeMsg'
    var logoutButton = createButton('Logout', '', function () { sessionStorage.removeItem('id'); navigateToLogin(homeContainer) }) //Declaramos la variable logoutButton (que será el botón para salir de la página home, y deslogar el usuario), y le asignamos el valor de la función createButton. Entre paréntesis, agregamos el texto, los estilos, y la pasamos la función de la página a la que queremos ir, en base a la página en la que nos encontramos//
    logoutButton.className = 'logoutButton'

    homeContainer.appendChild(welcomeText) //Añadimos welcomeText a homeContainer//
    homeContainer.appendChild(logoutButton) //Añadimos logoutButton a homeContainer//
    body.appendChild(homeContainer) //Añadimos homeContainer al body//

    return homeContainer //Devolvemos homeContainer//
}
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//


//**********************************************************************************************************************************************************************************************//
//CREAMOS FUNCIONES DE RENDERIZADO DE CADA UNA DE LAS PÁGINAS QUE CONTENDERÁ NUESTRA PÁGINA WEB//
//**********************************************************************************************************************************************************************************************//
function renderLandingPage() { //La función permite renderizar el Landing page, es decir, la primera página que se mostrará al acceder a la web//
    var landingContainer = createContainer(''); //Declaramos la variable landingContainer (contenedor de la página principal), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var landingTitle = createTextContainer('h1', 'SM Developers', 'title'); //Declaramos la variable landingTitle (título de la página principal), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
    var landingMsg = createTextContainer('h3', 'Welcome to your social developer network', 'landingMsg') //Declaramos la variable landingMsg (mensaje de la página principal, y le asignamos la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado de menor tamaño), el texto y los estilos//
    var landingImg = document.createElement('img') //Declaramos variable landingImg (imagen de landingPage), y le asignamos el valor de documento html como imagen ('img')//
    landingImg.src = 'Logo.jpg' //Añadimos la raíz de esta imagen (en este caso, esta añadida a la propia carpeta de la app)//
    landingImg.className = 'landingImg' //Añadimos la clase css y le asignamos el nombre landingImg (en index.css se continúa el desarrollo de estilos)//

    var joinButton = createButton('JOIN IN!', 'buttonJoin', function () { navigateToRegister(landingContainer) }) //Declaramos la variable joinButton (que será el botón para acceder), y le asignamos el valor de la función createButton. Entre paréntesis agregamos el texto, los estilos, y le pasamos la función de la página a la que queramos ir, en base a la página en la que nos encontramos//

    landingContainer.appendChild(landingTitle) //Añadimos al contenedor de la página principal, el título de la página principal//
    landingContainer.appendChild(landingMsg) //Añadimos al contenedor de la página principal, el mensaje de bienvenida//
    landingContainer.appendChild(joinButton) //Añadimos al contenedor de la página principal, el botón para unirse//
    landingContainer.appendChild(landingImg)

    body.appendChild(landingContainer); //Añadimos el contenedor de la página principal al body//

    return landingContainer //Devolvemos landingContainer//
}

function navigateToLanding(previousView) { //La función permite navegar al landingPage, es decir, la primera página que se mostrará al acceder a la web.Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta// 
    var landingView = renderLandingPage()

    body.replaceChild(landingView, previousView)
}

function renderRegisterPage() { //La función permite renderizar el registerPage, es decir, la página de registro//
    var registerContainer = createContainer('registerForm'); //Declaramos la variable registerContainer (contenedor de la página de registro), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var registerTitle = createTextContainer('h1', 'Register', 'title'); //Declaramos la variable registerTitle (título de la página de registro), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
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

function navigateToRegister(previousView) { //La función permite navegar al registerPage, es decir, la página de registro. Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta//
    var registerView = renderRegisterPage() //Declaramos variable registerView, que será la vista de la página de registro y le asignamos el valor de la función de renderizado de la página de registro (renderRegisterPage)//
    currentView = registerView //Asignamos el valor de la vista actual (registerView) a la variable currentView//
    body.replaceChild(registerView, previousView) //Añadimos el contenedor de la página de registro al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por registerView//
}

function renderLoginpage() { //La función permite renderizar la loginPage, es decir, la página de login//
    var loginContainer = createContainer('loginForm'); //Declaramos la variable loginContainer (contenedor de la página de login), y le asignamos el valor de la funcion createContainer. Entre paréntesis, agregaremos los estilos (style) que queramos que tenga//
    var loginTitle = createTextContainer('h1', 'Login', 'title'); //Declaramos la variable loginTitle (título de la página de login), y le asignamos el valor de la función createTextContainer. Entre paréntesis, agregaremos el tag (que será un encabezado), el texto y los estilos//
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true } //Declaramos el objeto objectEmail, que contendrá los campos correspondientes al input de email//
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true } //Declaramos el objeto objectPassword, que contendrá los campos corespondientes al input de contraseña//
    var loginForm = createForm([objectEmail, objectPassword], 'Login', loginUser) //Declaramos variable loginForm, que se corresponde al formulario de login. Llamamos al función createForm y le introducimos los objetos que queremos que se rendericen, así como el submit (en este caso Login) y el callback, que será llamando a la función loginUser//
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

function navigateToLogin(previousView) { //La función permite navegar a el Login page, es decir, la página de login. Entre paréntesis, se introduce el comando previousView, que nos servirá de guía para eliminar el renderizado de la página anterior cuando se renderice esta//
    var loginView = renderLoginpage() //Declaramos variable loginView, que será la vista de la página de login y le asignamos el valor de la función de renderizado de la página de login (renderLoginPage)//
    currentView = loginView //Asignamos el valor de la vista actual (loginView) a la variable currentView//
    body.replaceChild(loginView, previousView) //Añadimos el contenedor de la página de login al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por loginView//
}

function renderHomePage() { ////La función permite renderizar el Home page, es decir, la página de home//
    var homePage = createHomePage() //Declaramos la variable homePage, que será la propia página de home, y se ejecutará mediante la función createHomePage//

    body.appendChild(homePage) //Añadimos homePage al body//
}

function navigateToHome(previousView) { //La función permite navegar a el Home page, es decir, la página home. Entre paréntises, se introduce el comando previousView, que nos servirá de guía para eliminar el rederizado de la página anterior cuando se renderice esta//
    var homeView = createHomePage() //Declaramos variable homeView, que será la vista de la página de home y le asignamos el valor de la función de renderizado de la página de home (renderHomePage)//
    currentView = homeView //Asignamos el valor de la vista actual (homeView) a la variable currentView//

    body.replaceChild(homeView, previousView) //Añadimos el contenedor de la página home al body, utilizando la función replaceChild, y anotamos que la previousView (anterior renderizado), sea sustituido por homeView//
}

sessionStorage.id ? renderHomePage() : renderLandingPage() //Ejecutamos la función de renderLandingPage, pero primero, preguntamos con ternarios si hay algún usuario que esté logueado en este momento. De ser hay, renderiza la página home//
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//
