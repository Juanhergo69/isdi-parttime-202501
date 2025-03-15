//******************************************************************************************************************************************************************************************//
//AQUÍ SE IMPORTAN TODOS LOS ELEMENTOS NECESARIOS DE OTROS ARCHIVOS PARA EL CORRECTO FUNCIONAMIENTO DEL CÓDIGO ALOJADO EN ESTE ARCHIVO//
//******************************************************************************************************************************************************************************************//
import { body } from './1state.mjs' //Importamos el body//
import { loadFonts, renderPage } from './2utils.mjs'; //Importamos las fuentes y la función de renderizado de páginas//
import { createContainer, createTextContainer, createButton, createImgButton, createForm, createHomePage } from './3containers.mjs' //Importamos todas las funciones que crean un contenedor//
import { registerUser, loginUser } from './4data.mjs' //Importamos las funciones de registro y logeo//
import { navigateToRegister, navigateToLogin, navigateToLanding } from './6navigation.mjs' //Importamos las funciones que permiten la navegación//
//******************************************************************************************************************************************************************************************//
//******************************************************************************************************************************************************************************************//

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

    loadFonts() //Ejecutamos las fuentes//
    return renderPage(landingContainer, [landingImg, landingMsg, joinButton]) //Devolvemos la función renderPage, incluyendo todos los elementos a renderizar//
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

    loadFonts() //Ejecutamos las fuentes//
    return renderPage(registerContainer, [toLandingButton, registerTitle, registerForm, registerMsg, toLoginButton]) //Devolvemos la función renderPage, incluyendo todos los elementos a renderizar//
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

    loadFonts() //Ejecutamos las fuentes//
    return renderPage(loginContainer, [toLandingButton, loginTitle, loginForm, loginMsg, toRegisterButton]) //Devolvemos la función renderPage, incluyendo todos los elementos a renderizar//
}

export const renderHomePage = () => { //Exportamos y creamos renderHomePage. La función permite renderizar el Home page, es decir, la página de home//
    const homePage = createHomePage() //Declaramos homePage, que será la propia página de home, y se ejecutará mediante la función createHomePage//
    body.appendChild(homePage) //Añadimos homePage al body//

    loadFonts() //Ejecutamos las fuentes//
    return homePage //Devolvemos homePage//
}
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//
