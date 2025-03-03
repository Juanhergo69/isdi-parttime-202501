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