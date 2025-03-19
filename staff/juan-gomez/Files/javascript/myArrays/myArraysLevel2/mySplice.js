//Método Splice//
//El método splice permite generar un índice interno sobre el que se empiecen a eliminar párametros en un array ya existente. El primer dígito indica el punto de partida para empezar la consideración. El segundo dígito marca cuantas posiciones desde el índice se eliminan, y a continuación, se pueden añadir parámetros que se añadirán a continuación del índice interno generado. Es importante considerar que la última posición no entra dentro de la eliminación, se eliminaría hasta la posición justamente anterior a esta//
//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable con array original//
let testNames = ['Juan', 'Diana', 'Sonia', 'Marta'] //Declaramos variable de test con los elementos del array original//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO SPLICE//
const mySplice = (array, start, end, ...splice) => { //La función realizaría un splice de forma manual, generando un índice que eliminaría los parámetros ubicados entre entre star y end, y con posibilidad de añadir elementos a continuación de esas posiciones (splice). Ponemos tres puntos sobre splice para dejar la puerta abierta a la inclusión de varios elementos//
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    let deletedElements = [] //Declaramos variable deletedElements, que contendrá el array de los elementos que van a ser eliminados del array//
    for (let i = start; i < end; i++) { //El for itera los elementos que se encuentran desde la posición start y la posición end//
        deletedElements.push(array[start + i]) //Añadimos a deletedElements el array incluyendo la suma de start + el índice recorrido. La intención es retener el recorrido de las posiciones recorridas para eliminarlas del array ya existente//
    }
    if (end !== splice.length) { //El if nos indica, que si la posición end no es igual a la longitud de los elementos que se quieren añadir al array//
        let counterPositions = splice.length - end //Declaramos variable counterPositions (contador de posiciones), que será la resta de la longitud de los elementos que se quieren añadir al array menos la posición end//
        if (counterPositions > 0) { //El if nos indica que si el contador de posiciones es superior a 0 (es decir, hay más elementos para agregar que eliminar)//
            for (let i = array.length - 1; i >= start + end; i--) { //Iteramos con un for a la inversa para desplazar hacia la derecha todos los elementos restantes del array, indicando el índice es la longitud del array - 1, y que este este es mayor o igual a la suma de las posiciones star y end//
                array[i + counterPositions] = array[i]; //Y declaramos que el array basado en el indice, sumado al contador de posiciones, es igual al índice del array//
            }
        } else { //Si el if no ocurre, y por contra el contador de posiciónes es igual o inferior a 0 (es decir, hay menos elementos para agregar que eliminar)//
            for (let i = start + end; i < array.length; i++) { //Iteramos con un for para desplazar hacia la izquierda todos los elementos restantes del array, indicando que el índice es la suma de las posiciónes star y end, y que estas son inferiores a la longitud del array//
                array[i + counterPositions] = array[i] //Y declaramos que el array basado en el indice sumado al contador de posiciones, es igual al indice del array
            }
            array.length += counterPositions; //Añadimos a la longitud del array el contador de posiciones (el operando += funcionaría como un push aplicado a strings)
        }
    }
    // Insertar los nuevos elementos
    for (let i = 0; i < splice.length; i++) { //El for itera todos los elementos considerados en la variable splice (elementos que se quieren añadir al array tras la eliminación de los anteriores). La intención es retener este recorrido para añadir los nuevos elementos al array//
        array[start + i] = splice[i] //Y declaramos que el array basado en la suma de la posición star más el índice, es igual al índice de splice//
    }
    return deletedElements //Devolvemos deletedElements//
}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
const controlResult1 = testNames.splice(0, 2, 'Copito') //Declaramos primera variable de control, donde realizamos el splice de testeo sobre el array de testeo. Devolvería los elementos eliminados con el metodo splice (en este caso, Juan (posición 0) hasta Sonia (sin incluirla en la eliminación, posición 2)//
const controlResult2 = mySplice(names, 0, 2, 'Copito') //Declaramos la segunda variable de control, donde aplicaremos el splice original sobre el array original, a través de nuestra función manual. Devolvería los elementos eliminados con el metodo splice (en este caso, Juan (posición 0) hasta Sonia (sin incluirla en la eliminación, posición 2)//
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
console.log(names) //Devuelve en consola el array original, modificado con el método splice (en este caso, eliminado a Juan (posición 0) hasta Sonia (sin incluirla en la eliminación, posición 2), y añadiendo Copito desde la primera posición//
console.log(testNames) //Devuelve en consola el array de test, modificado con el método splice (en este caso, eliminando a Juan (posición 0) hasta Sonia (sin incluirla en la eliminación, posición 2), y añadiendo Copito desde la primera posición//
console.log(controlResult1) //Devuelve en consola los elementos eliminados del array de test con el método splice (en este caso, Juan (posición 0) hasta Sonia (sin incluirla en la eliminación, posición 2)//
console.log(controlResult2) //Devuelve en consola los elementos eliminados del array original con el método splice(en este caso, Juan (posición 0) hasta Sonia (sin incluirla en la eliminación, posición 2)//
//***************************************************************************************************************************************************************//