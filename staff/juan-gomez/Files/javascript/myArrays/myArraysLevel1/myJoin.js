//Método Join//
//El método join transforma todos los elementos de array en un string, y pone entre cada parámetro un separador determinado//

//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO JOIN//
const myJoin = (separator, array) => { //La función realizaría un join de forma manual, en base a un array y un elemento separador//
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    let join = '' //Declaramos variable join, que almacenará cada espacio entre elementos del array//
    for (let i = 0; i < array.length; i++) { //El for itera todos los elementos del array//
        if (i > 0) { //El if indica que, si el indice supera la primera posición//
            join += separator //Se añade separator (elemento separador) al join (espacio entre elementos del string). El operando += permite hacer un concat a elementos de un string//
        }
        join += array[i] //Se añade join al índice del array//
    }
    return join //Devolvemos join//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.join('+') //Declaramos primera variable de control, donde realizamos el join sobre el array de testeo, con el elemento separador a introducir. Devolvería el array en un string, con todos los elementos separados con un '+'//
const controlResult2 = myJoin('+', names) //Declaramos la segunda variable de control, donde aplicaremos el join sobre el array original, con el elemento separador a introducir, a través de nuestra función manual. Devolvería el array en un string, con todos los elementos separados con un '+'//
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
console.log(controlResult1) //Devuelve en consola el array en un string, con todos los elementos separados con un '+'//
console.log(controlResult2) //Devuelve en consola el array en un string, con todos los elementos separados con un '+'//
//***************************************************************************************************************************************************************//







