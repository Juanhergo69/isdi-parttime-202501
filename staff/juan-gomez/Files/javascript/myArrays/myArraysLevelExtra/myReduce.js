//Método Reduce//
////El metodo reduce permite iterar en todos los elementos de un array, y reducir todos los elementos a un único valor a través de 2 parámetros: Un callback que recibe 4 argumentos: acumulador (valor acumulador que se construye con cada iteración), valor actual (valor de cada elemento iterado), indice (es opcional, y marca la posición de cada elemento iterado) y array (el array sobre el que se está haciendo la iteración). El segundo parámetro es el valor incial, que se corresponde al valor incial con el que empieza el acumulador. El útil para hacer operaciones matemáticas con números, o para concatenar, contar la longitud, o contar la frecuencia de caracteres en strings de texto.//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let numbers = [15, 30, 60, 120, 240] //Declaramos variable con array original//
let testNumbers = [15, 30, 60, 120, 240] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO REDUCE//
const reductorFuncion = (acumulator, actualValue) => { //Declaramos reductorFunction, que nos servirá como función reductora de nuestro array. En este caso, la usaré para sumar, pero, modificando esta función con la reducción deseada, no es necesario modificar la estructura de la función manual//
    return acumulator + actualValue
}

const myReduce = (array, initialValue) => { //La función permitiría realizar un reduce sobre un array, aplicando una función reductora, y devolviendo el array como un único valor//
    let acumulator //Declaramos acumulator como elemento indefinido//
    if (initialValue !== undefined) { //El if nos indica que, si se ingresa un valor incial//
        acumulator = initialValue //El acumulador comenzará con ese valor incial//
    } else { //Si el if no se cumple, y por tanto, no se ha ingresado ningún valor incial//
        acumulator = array[0] //El acumulador comenzará con la primera posición del array como valor inicial//
    }

    const initialIndex = initialValue !== undefined ? 0 : 1 //Declaramos initalIndex, que, preguntando con ternarios, nos asegura en qué posición del índice comenzará a iterar el siguiente for. Explicación: si el valor inicial es distino a indefinido, empezará desde la primera posición. Si el valor incial es indefinido, empezará a iterar desde la segunda posición//

    for (let i = initialIndex; i < array.length; i++) { //El for itera todos los elementos del array, empezando desde el índice inical generado//
        acumulator = reductorFuncion(acumulator, array[i]) //El acumulador asume la función reductora, y la aplica a todos los elementos iterados del array//
    }

    return acumulator //Devolvemos el acumulador//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNumbers.reduce((acumulator, actualValue) => acumulator + actualValue, 0)//Declaramos la primera variable de control, donde aplicaremos el reduce sobre el array original. Devolvería la suma de los números, en este caso, 465//
const controlResult2 = myReduce(numbers, 0) //Declaramos la segunda variable de control, donde aplicaremos el reduce sobre el array original. Devolvería la suma de los números, en este caso, 465//
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
console.log(numbers) //Devuelve en consola el array original//
console.log(testNumbers) //Devuelve en consola el array de test//
console.log(controlResult1) //Devuelve en consola la suma de los números, en este caso, 465//
console.log(controlResult2) //Devuelve en consola la suma de los números, en este caso, 465//
//***************************************************************************************************************************************************************//