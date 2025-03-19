//Método Filter//
//El método filter permite filtrar un array existente, al cual, al pasarle un callback, todos los elementos que cumplan el callback serán añadidos a un nuevo array//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO FILTER//
const myFilter = (array, callback) => { //La función permitiría realizar un filter sobre un array, aplicando un callback sobre cada elemento de ese array, para comprobar si alguno de ellos cumple con el callback//
    const filteredArray = [] //Declaramos filteredArray, que contendrá los elementos que hayan pasado el filter//
    for (let i = 0; i < array.length; i++) { //El for itera sobre cada elemento del array//
        if (callback(array[i], i, array)) { //El if nos indica que si algún elmento pasa el callback//
            filteredArray.push(array[i]) //Añadimos a filteredArray el índice del array que ha cumplido el callback//
        }
    }
    return filteredArray //Devolvemos filteredArray//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.filter(name => name.length > 4)//Declaramos la primera variable de control, donde aplicaremos el filter sobre el array original, con el callback a ejecutar (en este caso, filtrar los elementos cuya longitud sea mayor a 4). Devolvería Diana, Sonia y Marta en un nuevo array, ya que estos elementos contienen una longitud superior a 4//

const controlResult2 = myFilter(names, (name) => { //Declaramos la segunda variable de control, donde aplicaremos el filter sobre el array original, con el callback a ejecutar (en este caso, filtrar los elementos cuya longitud sea mayor a 4). Devolvería Diana, Sonia y Marta en un nuevo array, ya que estos elementos contienen una longitud superior a 4//
    return name.length > 4
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
console.log(controlResult1) //Devuelve en consola Diana, Sonia y Marta en un nuevo array, ya que estos elementos contienen una longitud superior a 4//
console.log(controlResult2) //Devuelve en consola Diana, Sonia y Marta en un nuevo array, ya que estos elementos contienen una longitud superior a 4//
//***************************************************************************************************************************************************************//