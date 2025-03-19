//Método Fill//
//El método fill añade un elemento en un array existente, permitiendo elegir la posiciones, donde se quiere incluir. Los elementos que ocupaban esas posiciones son sustitudos por el elmento que se incluya. No considera la última posición marcada, sustiuye hasta la justamente anterior. Se indica primero el elemento que se quiere añadir, a continuación se indica la posición de inicio, y finalmente, la posición de fin//
//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO FILL//
const myFill = (array, fill, start = 0, end = array.length) => { //La función realizaría un fill de forma manual, añadiendo un elemento entre una posición incio y una posición final, y sustituyendo los elementos que ocupen esas posiciones//
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    for (let i = start; i < end; i++) { //El for itera los elementos que se encuentran desde la posición start y la posición end//
        array[i] = fill //Indicamos que el valor del indice del array iterado es fill (el elemento a insertar en esas posiciones)//
    }
    return array //Devolvemos el valor del array//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.fill('Copito', 0, 2) //Declaramos primera variable de control, donde realizamos el fill de testeo sobre el array de testeo. Devolvería el array con el fill incluido entre la posición 0 y la posición 2//
const controlResult2 = myFill(names, 'Copito', 0, 2) //Declaramos la segunda variable de control, donde aplicaremos el concat original sobre el array original, a través de nuestra función manual. Devolvería el array con el fill incluido entre la posición 0 y la posición 2//
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//VALIÉNDONOS DE LA FUNCION CONSOLE.ASSERT, REALIZAMOS POR DOS VÍAS LAS COMPROBACIONES PERTINENTES, PARA AVERIGUAR SI AMBOS TEST SON SUPERADOS, O SI POR CONTRA, DEBEMOS MODIFICARLOS//
console.assert(controlResult1 === controlResult2, 'ambos controles devuelven lo mismo. El código es correcto')

for (let i = 0; i < controlResult1.length; i++) { //El for itera todos los elementos de la longitud de controlResult1//
    console.assert(controlResult1[i] === controlResult2[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); //Con este assert comprobamos los índices de controlResult1 y de controlResult2. Si son iguales, no lanzará ningún mensaje, pero si hay diferencias en algúna posición, las arrojaría en el mensaje escrito en consola//
}
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//POR ÚLTIMO, REALIZAMOS LOS CONSOLE LOG DE CADA UNO DE LOS PARÁMETROS (NAMES, TESTNAMES, CONTROLRESULT1 Y CONTROLRESULT2, PARA COMPROBAR QUE NOS ARROJAN EN CONSOLA//
console.log(names) //Devuelve en consola el array original//
console.log(testNames) //Devuelve en consola el array de test//
console.log(controlResult1) //Devuelve en consola el array con el fill incluido entre la posición 0 y la posición 2//
console.log(controlResult2) //Devuelve en consola el array con el fill incluido entre la posición 0 y la posición 2//
//***************************************************************************************************************************************************************//