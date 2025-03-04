//Método Flat//
//El metodo flat permite desanidar un array con varios elementos anidados. Si hay varios array anidados y subanidados, y no se marca ningún ningún número entre paréntesis, sólo desanidará el primer anidado. El número introducido se corresponde a la profundidad (nivel de desanidado) al que se quiere llegar (díficil de explicar, fácil de entender viéndolo). Si se introduce Infinity entre paréntesis, desanidará todos los array anidados//
//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
var names = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán']], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta'] //Declaramos variable con array original//
var testNames = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán']], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta']  //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO FLAT//
function myFlat(array, depthIndex = 1) {
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    if (depthIndex <= 0) { //El if nos indica que si la profundidad es menor o igual a 0, devuelve una copia del array original//
        var arrayCopy = [] //Declaramos variable arrayCopy como array vacío, y se rellenará según la iteración del for que sigue a continuación//
        for (var i = 0; i < array.length; i++) { //El for itera todos los elementos del array//
            arrayCopy[i] = array[i] //Para a continuación añadir todos los elementos iterados al arrayCopy//
        }
        return arrayCopy //Develvemos arrayCopy
    }
    var actualArray = [] //Declaramos variable actualArray como array vacío, y se rellenará según la siguiente iteración//
    for (var i = 0; i < array.length; i++) { //El for itera todos los elementos del array//
        actualArray[i] = array[i] //Y rellenamos actualArray con el resultado de la iteración del array//
    }

    var isInfinity = depthIndex === Infinity //Declaramos variable isInfinity, y le asiganmos el valor de que el índice de profunidad es igual a Infinity (no como conepcto, si no como la totalidad de los anidados, es decir, debe ser considerado como número de la totalidad de anidados)//
    var nestingArray = true //Declaramos variable nestingArray como true para poder entrar en el bucle while. Según comprobaciones siguientes, verificaremos si existen o no anidaciones en el array//

    while ((isInfinity && nestingArray) || (!isInfinity && depthIndex > 0)) {//El while se continuará ejectuando, mientras que isInfinity sea true y existan anidaciones, o también en el caso de que isInfinity sea false y que el índice de profundidad sea mayor a 0//
        nestingArray = false //Declaramos que nestingArray es false, con idea de reiniciar las iteraciones//
        var tempArray = [] //Declaramos variable tempArray como array vacío, y se rellenerá según las comprobaciones y condiciones siguientes//
        for (var i = 0; i < actualArray.length; i++) { //El for itera un índice basado en la longitud de actualArray//
            if (actualArray[i] !== null && actualArray[i].constructor === Array) { //El if nos indica, que si el indice recorrido de actualArray es distinto a null (también valdría undefinded), y que además, es reconocido por el comando .constructor como un Array//
                for (var j = 0; j < actualArray[i].length; j++) {//Iteramos con con un for un nuevo índice basado en la longitud del índice de actualArray//
                    tempArray[tempArray.length] = actualArray[i][j] //Y rellenamos la longitud de tempArray con la iteración de los 2 índices recorridos de actualArray//
                }
                nestingArray = true //Declaramos que nestingArray es true, con idea de marcar que aún hay anidaciones en el array//
            } else { //Si el if no se produce, y lo que se produce es que actualArray no contiene un Array//
                tempArray[tempArray.length] = actualArray[i] //Rellenamos la longitud de tempArray con el índice iterado de actualArray//
            }
        }
        actualArray = tempArray //Con esta igualdad actualizamos el valor de actualArray, asignando el valor de tempArray para el siguiente índice de profundidad//
        if (!isInfinity) { //El if nos indica que si el indice de profundidad no es Infinity//
            depthIndex-- //Reducimos el contador del indice de profundidad//
        }
    }
    return actualArray //Devolvemos actualArray//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
var controlResult1 = testNames.flat(1) //Declaramos primera variable de control, donde realizamos el flat de testeo sobre el array de testeo. Devolvería el array desanidado hasta la profundidad indicada (en este caso, solo desanidaría el primer anidado)//
var controlResult2 = myFlat(names, 1) //Declaramos la segunda variable de control, donde aplicaremos el flat original sobre el array original, a través de nuestra función manual (no desarrollada aún)//
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//VALIÉNDONOS DE LA FUNCION CONSOLE.ASSERT, REALIZAMOS POR DOS VÍAS LAS COMPROBACIONES PERTINENTES, PARA AVERIGUAR SI AMBOS TEST SON SUPERADOS, O SI POR CONTRA, DEBEMOS MODIFICARLOS//
function comparingArrays(array1, array2) { //La función permite hacer una comprobación de dos array diferentes en base a su longitud//
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
console.log(controlResult1) //Devuelve en consola el array de test desanidado hasta la profundidad indicada (en este caso, solo desanidaría el primer anidado)//
console.log(controlResult2) //Devuelve en consola el array original desanidado hasta la profundidad indicada (en este caso, solo desanidaría el primer anidado), utilizando nuestra función manual//
//***************************************************************************************************************************************************************//