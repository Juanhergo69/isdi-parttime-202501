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

