import { renderHomePage, renderLandingPage } from './5rendered.mjs' //Importamos funciones de renderizado de página home y página landing//

//******************************************************************************************************************************************************************************************//
//EN ESTE ARCHIVO SE AGLUTINAN TODAS LAS FUNCIONES QUE INVOLUCRAN LA EJECUCIÓN DE LA PÁGINA WEB. DEBE SER COLOCADO EN ÚLTIMO LUGAR DEL ÍNDICE HTML, YA QUE POR SI MISMO, NO PODRÍA REALIZAR NADA SI NO BEBE DE LOS ANTERIORES DATOS//
//******************************************************************************************************************************************************************************************//
sessionStorage.id || localStorage.id ? renderHomePage() : renderLandingPage() //Ejecutamos la función de renderLandingPage, pero primero, preguntamos con ternarios si hay algún usuario que esté logueado en este momento. De ser hay, renderiza la página home//
//**********************************************************************************************************************************************************************************************//
//**********************************************************************************************************************************************************************************************//
