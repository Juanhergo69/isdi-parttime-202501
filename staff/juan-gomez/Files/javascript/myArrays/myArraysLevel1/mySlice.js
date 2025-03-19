//Método Slice//
////El metodo slice permite extraer elementos de un array existente. La primera posición introducida, será el punto de partida de la extracción. La segunda posición introducida, será el punto final de la extracción (considerará hasta la posición justamente anterior a esta segunda posición introducida)//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO SLICE//
const mySlice = (array, firstindex, lastindex) => { //La función realizaría un slice de forma manual, en base a un array y un primer índice de extracción y un segundo índice de extracción(los elementos entre los dos índices serán los que se extraerán)//
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    var slice = [] //Declaramos variable slice, que almacenará cada elemento extraido en un array//
    for (var i = firstindex; i < lastindex; i++) { //El for itera todas las posiciones desde el primer índice de extracción hasta el último índice de extracción//
        slice.push(array[i]) //Se añaden los elementos iterados en for a la variable slice (alternativamente, puedo rescatar la función de myPush para hacerlo de forma manual)//
    }
    return slice //Devolvemos slice//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.slice(1, 3) //Declaramos primera variable de control, donde realizamos el slice sobre el array de testeo, con el índice de posiciones de las extracciones a realizar. Devolvería un array con los nombres 'Diana' y 'Sonia'//
const controlResult2 = mySlice(names, 1, 3) //Declaramos la segunda variable de control, donde aplicaremos el slice sobre el array original, con el índice de posiciones de las extracciones a realizar, a través de nuestra función manual. Devolvería un array con los nombres 'Diana' y 'Sonia//
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
console.log(controlResult1) //Devuelve en consola un array con los nombres 'Diana' y 'Sonia'//
console.log(controlResult2) //Devuelve en consola un array con los nombres 'Diana' y 'Sonia'//
//***************************************************************************************************************************************************************//