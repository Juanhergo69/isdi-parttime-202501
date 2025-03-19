//Método Reverse//
//El método reverse cambia las posiciones de todos los elementos del array, a un estado estricamente contrario. Es decir, da la vuelta al array//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO JOIN//
const myReverse = (array) => { //La función realizaría un reverse de forma manual, en base a un array//
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    let reverse = [] //Declaramos variable reverse, que almacenará cada elemento extraido en un array//
    for (let i = array.length - 1; i >= 0; i--) { //El for itera todas las posiciones del array, desde la última posición a la primera//
        reverse.push(array[i]) //Se añaden los elementos iterados en el for a la variable reverse (alternativamente, puedo rescatar la función de myPush para hacerlo de forma manual)//
    }
    return reverse //Devolvemos reverse//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.reverse() //Declaramos primera variable de control, donde realizamos el reverse sobre el array de testeo. Devolvería un array con los elementos ordenados del revés//
const controlResult2 = myReverse(names) //Declaramos la segunda variable de control, donde aplicaremos el reverse sobre el array original. Devolvería un array con los elementos ordenados del revés//
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
console.log(testNames) //Devuelve en consola el array de test. Curiosamente, esto no ocurre, devuelve el array testNames con el reverse aplicado//
console.log(controlResult1) //Devuelve en consola un array con los elementos ordenados del revés//
console.log(controlResult2) //Devuelve en consola un array con los elementos ordenados del revés//
//***************************************************************************************************************************************************************//