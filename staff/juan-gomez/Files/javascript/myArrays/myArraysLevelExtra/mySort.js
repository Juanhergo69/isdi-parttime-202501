//Método Sort//
//El metodo sort permite iterar en todos los elementos de un array, y ordenarlos alfabéticamente si no se comanda una función de comparación. Convierte todos los elementos en strings, independientemente que sean texto o números, por lo que, para poder hacer una ordenación lógica de números, debe si o si hacerse una función de comparación. Modifica el array original//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let people = [{ name: 'Juan', age: 34 }, { name: 'Diana', age: 31 }, { name: 'Sonia', age: 11 }, { name: 'Marta', age: 2 }, { name: 'Matusalen', age: 10000000000 }] //Declaramos variable con array de objetos original//
let testPeople = [{ name: 'Juan', age: 34 }, { name: 'Diana', age: 31 }, { name: 'Sonia', age: 11 }, { name: 'Marta', age: 2 }, { name: 'Matusalen', age: 10000000000 }] //Declaramos variable de test con los elementos del array de objetos original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO SORT//
const compareByAge = (a, b) => a.age - b.age //Declaramos compareByAge, que nos servirá como función comparadora de nuestro array. En este caso, la usaré para ordenar las edades por orden ascendente, pero, modificando esta función con la comparación deseada, no es necesario modificar la estructura de la función manual//

const mySort = (array, compareFunction) => { //La función permitiría hacer un sort de forma manual, aplicando una función comparadora, y devolviendo el array original ordenado según la comparación//
    for (let i = 0; i < array.length - 1; i++) { //El for externo permite iterar los elementos del array hasta el penúltimo elemento//
        for (let j = 0; j < array.length - 1 - i; j++) { //El for interno permite iterar los elementos del array, hasta el elemento no ordenado, con idea de poder intercambiarlos si están en el orden incorrecto//
            if (compareFunction(array[j], array[j + 1]) > 0) { //El if nos indica, que, si al aplicar la función comparadora, el elemento adyacente iterado es superior al siguiente elemento adyacente. Esto significa que array[j] debe ir colocado después de array[j + 1]//
                const temp = array[j] //Declaramos temp, que almacenará los elementos adyacentes iterados//
                array[j] = array[j + 1] //Declaramos que el elemento adyacente iterado es igual al siguiente elemento adyacente iterado (intercambiamos sus posiciones)//
                array[j + 1] = temp //Declaramos que el siguiente elemento adyacente iterado es igual a temp (intercambiamos sus posiciones)//
            }
        }
    }
    return array //Devolvemos el array//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testPeople.sort((a, b) => a.age - b.age)//Declaramos la primera variable de control, donde aplicaremos el sort sobre el array original. Devolvería los elementos del array ordenados por edad, en orden ascendente (más joven --> más viejo)//
const controlResult2 = mySort(people, compareByAge) //Declaramos la segunda variable de control, donde aplicaremos el reduce sobre el array original. Devolvería los elementos del array ordenados por edad, en orden ascendente (más joven --> más viejo)//
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
console.log(people) //Devuelve en consola el array original ordenado, ya que sort modifica el array original//
console.log(testPeople) //Devuelve en consola el array de test ordenado, ya que sort modifica el array original//
console.log(controlResult1) //Devuelve en consola los elementos del array ordenados por edad, en orden ascendente (más joven --> más viejo)//
console.log(controlResult2) //Devuelve en consola los elementos del array ordenados por edad, en orden ascendente (más joven --> más viejo)//
//***************************************************************************************************************************************************************//
