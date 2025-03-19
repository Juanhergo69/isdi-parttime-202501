//Método Pop//
//El método pop elimina la última posición del array//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO POP//
const myPop = (array) => { //La función realizaría un pop de forma manual, sobre un array//
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    var pop = array[array.length - 1] //Declaramos variable pop, que nos indica que es igual a la longitud del array menos la última posición//
    array.length-- //Restamos la última posición a la lóngitud del array//
    return pop //Devolvemos el valor de pop//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.pop() //Declaramos primera variable de control, donde realizamos el pop sobre el array de testeo. Devolvería el elemento que hemos eliminado del array de test, en este caso, la palabra Marta//
const controlResult2 = myPop(names) //Declaramos la segunda variable de control, donde aplicaremos el pop sobre el array original, a través de nuestra función manual. Devolvería el elemento que hemos eliminado del array original, en este caso, la palabra Juan//
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
console.log(names) //Devuelve en consola el array original, menos el nombre que hemos quitado (Marta)//
console.log(testNames) //Devuelve en consola el array de test, menos el nombre que hemos quitado (Marta), de forma coincidente con el array original//
console.log(controlResult1) //Devuelve en consola el elemento que hemos eliminado del array de test, en este caso, la palabra Marta//
console.log(controlResult2) //Devuelve en consola el elemento que hemos eliminado del array original, en este caso, la palabra Marta, de forma coincidente con el array de test// 
//***************************************************************************************************************************************************************//