//El ejercicio consta de comprobar los diferentes métedos de modificación y comprobación de un array//
//Se deben probar cada uno de los comandos y comprender que hace cada uno de ellos//
//Al lado de cada línea de código describiré la función que ejecuta cada uno de ellos//


var names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Primer array sobre el que trabajo//
var names2 = ['Juanjo', 'Francisco', 'David', 'Marco'] //Segundo array sobre el que trabajo//
var names3 = ['Josefina', 'Manolo', ['Lorenzo', 'Catalina', ['Romeo', 'Carlos']]] //Tercer array sobre el que trabajo//

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
//Level 1 COMPLETED//
var push = names.push('Copito') //El método push añade a la última posición del array aquello que se comanda entre paréntesis//
console.log(push)
console.log(names)

var pop = names.pop() //El método pop elimina la última posición del array//
console.log(pop)
console.log(names)

var shift = names.shift() //El método shift elimina la primera posición del array//
console.log(shift)
console.log(names)

var unshift = names.unshift('Loli') //El método unshift añade en la primera posición del array aquello que se comanda entre paréntesis//
console.log(unshift)
console.log(names)

var concat = names.concat(names2) //El método concat une dos arrays diferentes en uno solo. Funciona de forma similar a la función appendChild de html. Siempre sigue el orden lógico, es decir, empezará por al array names, y continuará con el array names 2//
console.log(concat)
console.log(names.concat(names2))

var includes = names.includes('Paula') //El método includes permite verificar si determinado parámetro se encuentra (o no) dentro del array sobre el que se hace referencia. Arroja un booleano, es decir, true o false// 
var includes2 = names2.includes('Marco') //El ejemplo de arriba muestra un caso de booleano false, mientras que el ejemplo de esta linea, arroja un booleano true//
console.log(includes)
console.log(includes2)

var indexOf = names.indexOf('Sonia') //El método indexOf recorre el array desde la primera posición, y comprueba si el elemento que se comanda entre paréntesis se encuentra en el array, y de estarlo, indica la posición en la que se encuentra. Si hay varios elementos en el array con el mismo parámetro, solo considera el primero localizado//
var indexOf2 = names2.indexOf('Macarena') //El ejemplo de arriba muestra un parámetro que se encuentra en el array, concretamente, en la posición 1 (según las líneas de código previamente escritas). El ejemplo de esta línea, arrojaría valor -1, ya que este parámetro no se encuentra en el array//
console.log(names.includes('Sonia'))
console.log(names2.includes('Macarena'))

var lastIndexOf = names.lastIndexOf('Segismundo') //El método lastindexOf recorre el array desde la última posición, y comprueba si el elemento que se comanda entre paréntesis se encuentra en el array, y de estarlo, indica la posición en la que se encuentra. Si hay varios elementos en el array con el mismo elemento, solo considera el primero localizado. Si el elemento no se encuentra en el array, devolvería -1.
var lastIndexOf2 = names2.lastIndexOf('David') //El ejemplo de arriba arrojará un valor -1, ya que ese elemento no se encuentra en el array. El ejemplo de esta línea muestra un elemento que se encuentra en el array, concretamente la posición 2 (según las líneas de código previamente escritas)//
console.log(lastIndexOf)
console.log(lastIndexOf2)

var reverse = names.reverse() //El metodo reverse cambia las posiciones de todos los elementos del array, a un estado estricamente contrario. Es decir, da la vuelta al array//
console.log(reverse)

var join = names.join(" + ") //El metodo join permite unir en una cadena los diferentes elementos de un array, utilizando distintos métodos de separación. En este caso, utlizará el array names, y separaré cada uno de los parámetos con un espacio, un + y otro espacio//
console.log(join)

var slice = names.slice(0, 2) //El metodo slice permite extraer elementos de un array existente. La primera posición introducida, será el punto de partida de la extracción. La segunda posición introducida, será el punto final de la extracción (considerará hasta la posición justamente anterior a esta segunda posición introducida)//
console.log(slice)
//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
//Level 2 COMPLETED//
var splice = names2.splice(0, 2, 'Zacarías') //El método splice El metodo splice permite generar un índice interno sobre el que se empiecen a eliminar párametros en un array ya existente. El primer dígito indica el punto de partida para empezar la consideración. El segundo dígito marca cuantas posiciones desde el índice se eliminan, y a continuación, se pueden añadir parámetros que se añadirán a continuación del índice interno generado.  Es importante considerar que la última posición no entra dentro de la eliminación, se eliminaría hasta la posición justamente anterior a esta//
console.log(splice)
console.log(names2)

var fill = names2.fill('Jonás', 0, 2) //El método fill añade un elemento en un array existente, permitiendo elegir la posiciones, donde se quiere incluir. Los elementos que ocupaban esas posiciones son sustitudos por el elmento que se incluya. No considera la última posición marcada, sustiuye hasta la justamente anterior. Se indica primero el elemento que se quiere añadir, a continuación se indica la posición de inicio, y finalmente, la posición de fin//
console.log(fill)
console.log(names2)
//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
//Level 3 (NOTHING AT THE MOMENT)//
var forEach

var some

var every

var find

var findIndex

var filter
//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
//Level 4 (FLAT COMPLETED, MAP, REDUCE AND SORT NOT COMPLETED//
var flat = names3.flat(2) //El metodo flat permite desanidar un array con varios elementos anidados. Si hay varios array anidados y subanidados, y no se marca ningún ningún número entre paréntesis, sólo desanidará el primer anidado. El número introducido se corresponde a la profundidad (nivel de desanidado) al que se quiere llegar (díficil de explicar, fácil de entender viéndolo)//
console.log(flat)
console.log(names3)

var map

var reduce

var sort
//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/




