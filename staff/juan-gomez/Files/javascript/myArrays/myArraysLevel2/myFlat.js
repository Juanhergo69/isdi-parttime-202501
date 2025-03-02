//Método Flat//
//El metodo flat permite desanidar un array con varios elementos anidados. Si hay varios array anidados y subanidados, y no se marca ningún ningún número entre paréntesis, sólo desanidará el primer anidado. El número introducido se corresponde a la profundidad (nivel de desanidado) al que se quiere llegar (díficil de explicar, fácil de entender viéndolo)//
//Procedimiento de comprobación TDD//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES A CONSIDERAR PARA REALIZAR LAS COMPROBACIONES//
var names = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán']], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta'] //Declaramos variable con array original//
var testNames = ['Juan', ['Francisco', 'Loli', ['Dante', 'Germán']], 'Diana', ['Gonzalo', 'Angel', ['María', 'David']], 'Sonia', ['Lidia, Tere', ['Amira', 'Telma']], 'Marta']  //Declaramos variable de test con los elementos del array original//
console.log(testNames)
console.log(controlResult1) //Devuelve en consola el array desanidado hasta la profundidad indicada (en este caso, solo desanidaría el primer anidado))//
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS UNA FUNCIÓN QUE REALIZARÍA, DE MANERA MANUAL, EL MÉTODO FLAT//
function myFlat(array, depthIndex = 1) { //La función realizaría un flat de forma manual, generando un índice de profundidad que desanidaría los subarrays generados (hijos) dentro del array padre (el que los contiene a todos los subarrays) Declaramos depthIndex con valor 1 para que, de no introducirse datos, desanide hasta el primero anidado//
    if (array.length === 0) return undefined //El if nos indica que si la longitud del array es 0 (es decir, no hay nada), nos devuelve indefinido (undifined)//

    //Estoy bloqueado y pilladisimo con esta función, pedir ayuda a Flors. He revisado por google y se utilizan parámetros que no hemos tocado y que por ende, no comprendo//

}
//**************************************************************************************************************************************************************//

//***************************************************************************************************************************************************************//
//DECLARAMOS LAS VARIABLES DE CONTROL PARA REALIZAR LAS COMPROBACIONES//
var controlResult1 = testNames.flat() //Declaramos primera variable de control, donde realizamos el flat de testeo sobre el array de testeo. Devolvería el array desanidado hasta la profundidad indicada (en este caso, solo desanidaría el primer anidado)//
var controlResult2 = myFlat(names,) //Declaramos la segunda variable de control, donde aplicaremos el flat original sobre el array original, a través de nuestra función manual (no desarrollada aún)//
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
console.log(controlResult1) //Devuelve en consola el array desanidado hasta la profundidad indicada (en este caso, solo desanidaría el primer anidado))//
console.log(controlResult2) //No sé que devuelve en consola, no soy capaz de desarrollar esta función manual//
//***************************************************************************************************************************************************************//