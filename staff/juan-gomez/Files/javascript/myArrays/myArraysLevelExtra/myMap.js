//Método Map//
//El método map permite iterar todos los elementos de un array, aplicando en cada uno de los elementos un callback, y devolviendo todos los elementos con el callback aplicado a un nuevo array//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO MAP//
const myMap = (array, callback) => { //La función permitiría realizar un map sobre un array, aplicando un callback sobre cada elemento de ese array, y devolviendo un nuevo array de los elementos con el callback aplicado//
    const mappedArray = [] //Declaramos mappedArray, que contendrá los elementos del array con el callback aplicado//
    for (let i = 0; i < array.length; i++) { //El for itera sobre cada elemento del array//
        mappedArray.push(callback(array[i])) //Añadimos a mappedArray los elementos del array con el callback aplicado//
    }
    return mappedArray//Devolvemos mappedArray//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.map(name => name.toUpperCase())//Declaramos la primera variable de control, donde aplicaremos el map sobre el array original, con el callback a ejecutar (en este caso, poner todos los nombres en mayúsculas). Devolvería Juan, Diana, Sonia y Marta en mayúsculas en un nuevo array//
const controlResult2 = myMap(names, (name => name.toUpperCase())) //Declaramos la segunda variable de control, donde aplicaremos el map sobre el array original, con el callback a ejecutar (en este caso, poner todos los nombres en mayúsculas). Devolvería Juan, Diana, Sonia y Marta en mayúsculas en un nuevo array//
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//VALIÉNDONOS DE LA FUNCION CONSOLE.ASSERT, REALIZAMOS POR DOS VÍAS LAS COMPROBACIONES PERTINENTES, PARA AVERIGUAR SI AMBOS TEST SON SUPERADOS, O SI POR CONTRA, DEBEMOS MODIFICARLOS//
const comparingArrays = (array1, array2) => { //La función permite hacer una comprobación de dos array diferentes en base a su longitud//
    if (array1.length !== array2.length) return false //El if nos indica que si las longitudes son diferentes, los arrays no son iguales, y por tanto, nos devuelve false//
    for (var i = 0; i < array1.length; i++) { //El for itera un indice en base a la longitud del array1//
        if (array1[i] !== array2[i]) return false; //El if nos indica que si hay algún indice diferente dentro de los indices de array1 y array2, los array no son igual, y por tanto, nos devuelve false//
    }
    return true //Devolvemos true si no se produce ninguno de los dos casos anteriores, y por tanto, encontramos que la longitud de los dos array es igual//
}

console.assert(comparingArrays(controlResult1, controlResult2), 'ambos controles devuelven lo mismo. El código es correcto') //La función permite hacer la comparación de la longitud de los dos arrays//
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//POR ÚLTIMO, REALIZAMOS LOS CONSOLE LOG DE CADA UNO DE LOS PARÁMETROS (NAMES, TESTNAMES, CONTROLRESULT1 Y CONTROLRESULT2, PARA COMPROBAR QUE NOS ARROJAN EN CONSOLA//
console.log(names) //Devuelve en consola el array original//
console.log(testNames) //Devuelve en consola el array de test//
console.log(controlResult1) //Devuelve en consola Juan, Diana, Sonia y Marta en mayúsculas en un nuevo array//
console.log(controlResult2) //Devuelve en consola Juan, Diana, Sonia y Marta en mayúsculas en un nuevo array//
//***************************************************************************************************************************************************************//