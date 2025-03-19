//Método ForEach//
//El método forEach permite aplicar un callback sobre cada elemento de un array.//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO FOREACH//
const myForEach = (array, callback) => { //La función permitiría realizar un forEach sobre un array, aplicando un callback sobre cada elemento de ese array//
    for (let i = 0; i < array.length; i++) { //El for itera sobre cada elemento del array//
        callback(array[i], i, array) //Aplicamos el callback sobre el cada elemento iterado en el array, sobre el índice y sobre el array//
    }
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.forEach((name, index, array) => { //Declaramos la primera variable de control, donde aplicaremos el forEach sobre el array original, con el callback a ejecutar (en este caso, mostrar el nombre de la posición, la posición y el array completo). Devolvería todos los nombres del array, indicando la posición que ocupan en el mismo, así como el array completo//
    console.log(`Name: ${name}, Index: ${index}, Array: ${array}`)
})
const controlResult2 = myForEach(names, (name, index, array) => { //Declaramos la segunda variable de control, donde aplicaremos el forEach sobre el array original, con el callback a ejecutar (en este caso, mostrar el nombre de la posición, la posición y el array completo), a través de nuestra función manual. Devolvería todos los nombres del array, indicando la posición que ocupan en el mismo, así como el array completo//
    console.log(`Name: ${name}, Index: ${index}, Array: ${array}`)
})
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
console.log(controlResult1) //Devuelve en consola todos los nombres del array, indicando la posición que ocupan en el mismo, así como el array completo//
console.log(controlResult2) //Devuelve en consola todos los nombres del array, indicando la posición que ocupan en el mismo, así como el array completo//
//***************************************************************************************************************************************************************//