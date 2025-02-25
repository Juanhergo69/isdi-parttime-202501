//Método IndexOf//
//El método indexOf recorre el array desde la primera posición, y comprueba si el elemento que se comanda entre paréntesis se encuentra en el array, y de estarlo, indica la posición en la que se encuentra. Si hay varios elementos en el array con el mismo parámetro, solo considera el primero localizado. Si el elemento no se encuentra en el array, devolvería -1//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
var names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
var testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO INDEXOF//
function myIndexOf(array, element) { //La función realizaría un indexOf de forma manual, en base a un array y un elemento a rastrear//
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    for (var i = 0; i < array.length; i++) { //El for itera los elementos del array//
        if (array[i] === element) { //Para posteriormente, decirnos, si algún parámetro del índice de array es justamente el elemento a rastrear//
            return [i] //Nos devuelve el índice de posición de ese parámetro, porque el elemento se encuentra en el array//
        } else { //Y si se produce el caso contrario, es decir, que ningún elemento del array coincide con el elemento a rastrear//
            return -1 //Nos devuelve -1, porque el elemento no se encuentra en el array//
        }
    }
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
var controlResult1 = testNames.indexOf('Juan') //Declaramos primera variable de control, donde realizamos el indexOf sobre el array de testeo, con el elemento a rastrear. Devolvería la posición 0, dado que el elemento a rastrear 'Juan', se encuentra dentro del array de testeo//
var controlResult2 = myIndexOf(names, 'Juan') //Declaramos la segunda variable de control, donde aplicaremos el indexOf sobre el array original, con el elemento a rastrear, a través de nuestra función manual. Devolvería la posición 0, dado que el elemento a rastrear 'Juan', se encuentra dentro del array original//
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//VALIÉNDONOS DE LA FUNCION CONSOLE.ASSERT, REALIZAMOS POR DOS VÍAS LAS COMPROBACIONES PERTINENTES, PARA AVERIGUAR SI AMBOS TEST SON SUPERADOS, O SI POR CONTRA, DEBEMOS MODIFICARLOS//
console.assert(controlResult1 === controlResult2, 'ambos controles devuelven lo mismo. El código es correcto')

for (var i = 0; i < controlResult1.length; i++) { //El for itera todos los elementos de la longitud de controlResult1//
    console.assert(controlResult1[i] === controlResult2[i], `la posición ${i} es diferente en ambos arrays. ${testNames[i]} !== ${names[i]}`); //Con este assert comprobamos los índices de controlResult1 y de controlResult2. Si son iguales, no lanzará ningún mensaje, pero si hay diferencias en algúna posición, las arrojaría en el mensaje escrito en consola//
}
//***************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//POR ÚLTIMO, REALIZAMOS LOS CONSOLE LOG DE CADA UNO DE LOS PARÁMETROS (NAMES, TESTNAMES, CONTROLRESULT1 Y CONTROLRESULT2, PARA COMPROBAR QUE NOS ARROJAN EN CONSOLA//
console.log(names) //Devuelve en consola el array original//
console.log(testNames) //Devuelve en consola el array de test//
console.log(controlResult1) //Devuelve en consola la posición 0, dado que el elemento a rastrear 'Juan', se encuentra dentro del array de testeo//
console.log(controlResult2) //Devuelve en consola la posición 0, dado que el elemento a rastrear 'Juan', se encuentra dentro del array original//
//***************************************************************************************************************************************************************//