//Método Shift//
//El método shift elimina la primera posición del array//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
var names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
var testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO SHIFT//
function myShift(array) { //La función realizaría un shift de forma manual, sobre un array//
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    var shift = array[0] //Declaramos la variable shift, que contendrá el primer elemento del array//
    for (var i = 0; i < array.length; i++) { //El for itera todos los elementos del array//
        array[i] = array[i + 1]; //Desplaza los elementos hacia la izquierda (mirado en Google, no termino de comprenderlo bien)//
    }
    array.length = array.length - 1 //Reducimos la longitud del array en 1, eliminando el último elemento (mirado en Google, no termino de comprenderlo bien//
    return shift //Devolvemos la primera posición del array//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
var controlResult1 = testNames.shift() //Declaramos primera variable de control, donde realizamos el shift sobre el array de testeo. Devolvería el elemento que hemos eliminado del array de test, en este caso, la palabra Juan//
var controlResult2 = myShift(names) //Declaramos la segunda variable de control, donde aplicaremos el shift sobre el array original, a través de nuestra función manual. Devolvería el elemento que hemos eliminado del array original, en este caso, la palabra Juan//
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//VALIÉNDONOS DE LA FUNCION CONSOLE.ASSERT, REALIZAMOS POR DOS VÍAS LAS COMPROBACIONES PERTINENTES, PARA AVERIGUAR SI AMBOS TEST SON SUPERADOS, O SI POR CONTRA, DEBEMOS MODIFICARLOS//
console.assert(controlResult1 === controlResult2, 'ambos controles devuelven lo mismo. El código es correcto')

for (var i = 0; i < controlResult1.length; i++) { //Con este método, el for itera todos los elementos de la longitud de controlResult1//
    console.assert(controlResult1[i] === controlResult2[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); //Con este assert comprobamos los índices del array original y del array test. Si son iguales, no lanzará ningún mensaje, pero si hay diferencias en algúna posición, las arrojaría en el mensaje escrito en consola//
}
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//POR ÚLTIMO, REALIZAMOS LOS CONSOLE.LOG DE CADA UNO DE LOS PARÁMETROS (NAMES, TESTNAMES, CONTROLRESULT1 Y CONTROLRESULT2, PARA COMPROBAR QUE NOS ARROJAN EN CONSOLA//
console.log(names) //Devuelve en consola el array original, menos el nombre que hemos quitado (Juan)//
console.log(testNames) //Devuelve en consola el array de test, menos el nombre que hemos quitado (Juan), de forma coincidente con el array original//
console.log(controlResult1) //Devuelve en consola el elemento que hemos eliminado del array de test, en este caso, la palabra Juan//
console.log(controlResult2) //Devuelve en consola el elemento que hemos eliminado del array original, en este caso, la palabra Juan, de forma coincidente con el array de test// 
//***************************************************************************************************************************************************************//