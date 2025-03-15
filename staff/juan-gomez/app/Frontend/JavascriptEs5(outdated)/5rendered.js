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
