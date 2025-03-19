//Método Find//
//El metodo find itera los elementos de un array y pasa un callback. El primer elemento iterado que cumpla la función del callback, será devuelto. Si no cumple ningún elemento con el callback, devolvería undefined//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO FIND//
const myFind = (array, callback) => { //La función permitiría realizar un find sobre un array, aplicando un callback sobre cada elemento de ese array, para comprobar si alguno de ellos cumple con el//
    for (let i = 0; i < array.length; i++) { //El for itera sobre cada elemento del array//
        if (callback(array[i], i, array)) { //El if nos indica que si algún elmento pasa el callback//
            return array[i] //Devolvemos esa posición del array//
        }
    }
    return undefined //Si no hay ningún elemento que pase el callback, devolvemos undefined//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.find((name) => { //Declaramos la primera variable de control, donde aplicaremos el find sobre el array original, con el callback a ejecutar (en este caso, devolver si algún elemento empieza por la letra 'S'. Devolvería Sonia, ya que es el primer elemento del array que empieza por 'S'//
    return name.startsWith('S')
})
const controlResult2 = myFind(names, (name) => { //Declaramos la segunda variable de control, donde aplicaremos el find sobre el array original, con el callback a ejecutar (en este caso, devolver si algún elemento empieza por la letra 'S'). Devolvería Sonia, ya que es el primer elemento del array que empieza por 'S'//
    return name.startsWith('S')
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
console.log(controlResult1) //Devuelve en consola Sonia, ya que es el primer elemento del array que empieza por 'S'//
console.log(controlResult2) //Devuelve en consola Sonia, ya que es el primer elemento del array que empieza por 'S'//
//***************************************************************************************************************************************************************//