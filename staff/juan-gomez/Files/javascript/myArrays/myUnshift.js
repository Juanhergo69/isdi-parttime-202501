//Método Unshift//
//El método unshift añade a la primera posición del array, aquello que se comanda entre paréntesis//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
var names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
var testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
var nameToUnshift = 'Loli' //Declaramos variable de aquello que queremos añadir sobre nuestro array//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO UNSHIFT// (Toda esta función está sacada de Google, necesito explicación para comprenderla)
function myUnshift(array, ...elements) { //La función realizaría un unshift de forma manual, sobre un array//
    var updateLength = array.length + elements.length //Declaramos variable de actualización de nueva longitud del array//
    for (var i = updateLength - 1; i >= elements.length; i--) { //El for itera a la inversa los elementos del array, desplazándolos hacia la derecha, para dejar hueco a los elementos que se quieran añadir al principio del array//
        array[i] = array[i - elements.length] //Se indica que el indice del array es igual al indice del array, menos la longitud de los elementos a añadir en primera posición//
    }
    for (var j = 0; j < elements.length; j++) { //El for itera los elementos de nueva incoporación, para posteriormente añadirlos al array//
        array[j] = elements[j]; //Se indica que el nuevo indice del array es igual al indice de los elementos de nueva icorporación//
    }
    return updateLength //Devolvemos la actualización de la longitud del array//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
var controlResult1 = testNames.unshift(nameToUnshift) //Declaramos primera variable de control, donde realizamos el unshift sobre el array de testeo. Devolvería la longitud del array//
var controlResult2 = myUnshift(names, nameToUnshift) //Declaramos la segunda variable de control, donde aplicaremos el unshift sobre el array original, a través de nuestra función manual. Devolvería la longitud del array//
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//VALIÉNDONOS DE LAS FUNCION CONSOLE.ASSERT, REALIZAMOS POR DOS VÍAS LAS COMPROBACIONES PERTINENTES, PARA AVERIGUAR SI AMBOS TEST SON SUPERADOS, O SI POR CONTRA, DEBEMOS MODIFICARLOS//
console.assert(controlResult1 === controlResult2, 'ambos controles devuelven lo mismo. El código es correcto')

for (var i = 0; i < names.length; i++) { //Con este método, el for itera todos los elementos de la longitud del array original//
    console.assert(testNames[i] === names[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); //Con este assert comprobamos los índices del array original y del array test. Si son iguales, no lanzará ningún mensaje, pero si hay diferencias en algúna posición, las arrojaría en el mensaje escrito en consola//
}
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//POR ÚLTIMO, REALIZAMOS LOS CONSOLE LOG DE CADA UNO DE LOS PARÁMETROS (NAMES, TESTNAMES, CONTROLRESULT1 Y CONTROLRESULT2, PARA COMPROBAR QUE NOS ARROJAN EN CONSOLA//
console.log(names) //Devuelve en consola el array original, más el nombre que hemos añadido en primera posición (Loli)//
console.log(testNames) //Devuelve en consola el array de test, más el nombre que hemos añadido en primera posición (Loli), de forma coincidente con el array original//
console.log(controlResult1) //Devuelve en consola la longitud del array de test, en este caso, serían 5 elementos después de realizar el unshift//
console.log(controlResult2) //Devuelve en consola la longitud del array original, en este caso, serían 5 elementos después de realizar el unshift, de forma coincidente con el array de test// 
//***************************************************************************************************************************************************************//






