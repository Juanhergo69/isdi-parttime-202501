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


