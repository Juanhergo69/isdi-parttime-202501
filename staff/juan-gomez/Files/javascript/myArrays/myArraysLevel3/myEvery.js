//Método Every//
//El método every permite verificar si todos los parámetros de un array cumplen una misma condición. Retorna un booleano, es decir true o false. Si hay un elemento que no cumpla la condición, automáticamente devuelve false, por lo que para que devuelva true, todos los elementos deben cumplirla//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO EVERY//
const myEvery = (array, callback) => { //La función realizaría un every de forma manual, sobre un array y con un callback por determinar//
    for (let i = 0; i < array.length; i++) { //El for itera todos los elementos del array//
        if (!callback(array[i], i, array)) { //El if nos indica que, si el callback no se produce en ningún elemento del índice del array, en el propio índice, o en el propio array//
            return false //Devuelve false//
        }
    }
    return true //Devolvemos true, siempre y cuando el anterior if no se cumpla//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.every(name => name.length > 3) //Declaramos primera variable de control, donde realizamos el every sobre el array de testeo, con el callback a ejecutar (en este caso, sobre la longitud de cada elemento). Devolvería un booleano, en este caso true, dado que todos los elementos tienen más de tres caracteres//
const controlResult2 = myEvery(names, name => name.length > 3) //Declaramos la segunda variable de control, donde aplicaremos el every sobre el array original, con el callback a ejecutar (en este caso, sobre la longitud de cada elemento), a través de nuestra función manual. Devolvería un booleano, en este caso true, dado que todos los elementos tienen más de tres caracteres//
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
console.log(controlResult1) //Devuelve en consola un booleano, en este caso true, dado que todos los elementos tienen más de tres caracteres//
console.log(controlResult2) //Devuelve en consola un booleano, en este caso true, dado que todos los elementos tienen más de tres caracteres//
//***************************************************************************************************************************************************************//