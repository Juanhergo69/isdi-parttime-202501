import { body, currentView } from './1state.mjs' //Importamos el body y la página actual//
import { renderLandingPage, renderRegisterPage, renderLoginpage, renderHomePage } from './5rendered.mjs' //Importamos todas las funciones que impliquen renderizados//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN NAVEGACIÓN ENTRE LOS DISTINTOS RENDERIZADOS DE NUESTRA WEB. DEBE SER COLOCADO EN SEXTO LUGAR DEL ÍNDICE HTML, YA QUE, LA NAVEGACIÓN DEPENDERÁ DE SI LOS RENDERIZADOS ESTÁN CORRECTOS Y SON FUNCIONALES//
//******************************************************************************************************************************************************************************************//
export const navigateTo = (renderFunction) => { //Exportamos y creamos navigateTo, que servirá como función general para la navegación. Permitirá eliminar la anterior vista para renderizar la siguiente//
    while (body.firstChild) { //El while nos indica, que, mientras exista una página renderizada//
        body.removeChild(body.firstChild) //Esa página se eliminará del body//
    }
    const newView = renderFunction() //Declaramos newView, que se corresponderá a la siguiente página a renderizar//
    currentView = newView //Asignamos a newView el parámetro currentView (página actual)//
    body.appendChild(newView) //Añadimos newView al body//
}

export const navigateToLanding = () => navigateTo(renderLandingPage) //Exportamos y creamos navigateToLanding, asignando hacia donde navegamos (renderLandingPage)//
export const navigateToRegister = () => navigateTo(renderRegisterPage) //Exportamos y creamos navigatetoRegister, asignando hacia donde navegamos (renderRegisterPage)//
export const navigateToLogin = () => navigateTo(renderLoginpage) //Exportamos y creamos navigateToLogin, asignando hacia donde navegamos (renderLoginPage)//
export const navigateToHome = () => navigateTo(renderHomePage) //Exportamos y creamos navigateToHome, asignando hacia donde navegamos (createHomePage)//
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//