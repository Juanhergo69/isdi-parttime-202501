//Método Push//
//El método push añade a la última posición del array, aquello que se comanda entre paréntesis//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
let nameToPush = 'Copito' //Declaramos variable de aquello que queremos añadir sobre nuestro array con el método push//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO PUSH//
const myPush = (array, elementToPush) => { //La función realizaría un push de forma manual, sobre un array, indicando el elemento que se quiera añadir//
    if (array.length === 0 && elementToPush === '') return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), y el elemento a añadir está vacío (es decir, nada), nos devuelve indefinido (undifined)//

    array[array.length] = elementToPush //Esta línea de código nos dice, que sobre la última posición del array, en base a su longitud, añadirá el elemento que se quiera añadir//
    return elementToPush //Devolvemos el elemento que se quiere añadir al array//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.push(nameToPush) //Declaramos primera variable de control, donde realizamos el push de aquello que queremos añadir, sobre el array de testeo. Devolvería la longitud del array//
const controlResult2 = myPush(names, nameToPush) //Declaramos la segunda variable de control, donde aplicaremos el push sobre el array original, a través de nuestra función manual. Devolvería el elemento que hemos añadido al array original, en este caso, la palabra Copito//
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//VALIÉNDONOS DE LA FUNCION CONSOLE.ASSERT, REALIZAMOS POR DOS VÍAS LAS COMPROBACIONES PERTINENTES, PARA AVERIGUAR SI AMBOS TEST SON SUPERADOS, O SI POR CONTRA, DEBEMOS MODIFICARLOS//
console.assert(controlResult1 === controlResult2, 'ambos controles devuelven lo mismo. El código es correcto')

for (let i = 0; i < controlResult1.length; i++) { //El for itera todos los elementos de la longitud de controlResult1//
    console.assert(controlResult1[i] === controlResult2[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); //Con este assert comprobamos los índices de controlResult1 y de controlResult2 test. Si son iguales, no lanzará ningún mensaje, pero si hay diferencias en algúna posición, las arrojaría en el mensaje escrito en consola//
}
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//POR ÚLTIMO, REALIZAMOS LOS CONSOLE LOG DE CADA UNO DE LOS PARÁMETROS (NAMES, TESTNAMES, CONTROLRESULT1 Y CONTROLRESULT2, PARA COMPROBAR QUE NOS ARROJAN EN CONSOLA//
console.log(names) //Devuelve en consola el array original, más el nombre que hemos añadido (Copito)//
console.log(testNames) //Devuelve en consola el array de test, más el nombre que hemos añadido (Copito), de forma coincidente con el array original//
console.log(controlResult1) //Devuelve en consola la longitud del array de test, en este caso, serían 5 elementos después de realizar el push//
console.log(controlResult2) //Devuelve en consola el elemento que se ha añadido al array, en este caso, la palabra Copito// 
//***************************************************************************************************************************************************************//


