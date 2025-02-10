//El ejercicio consta de comprobar los diferentes métedos de modificación y comprobación de un array//
//Se deben probar cada uno de los comandos y comprender que hace cada uno de ellos//
//Al lado de cada línea de código describiré la función que ejecuta cada uno de ellos//


var names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Primer array sobre el que trabajo//
var names2 = ['Juanjo', 'Francisco', 'David', 'Marco'] //Segundo array sobre el que trabajo//
var names3 = ['Josefina', 'Manolo', ['Lorenzo', 'Catalina', ['Romeo', 'Carlos']]] //Tercer array sobre el que trabajo//

//Level 1//

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

var concat = names.concat(names2) //El método concat une dos arrays diferentes en uno solo. Siempre sigue el orden lógico, es decir, empezará por al array names, y continuará con el array names 2//
console.log(concat)
console.log(names.concat(names2))

var includes = names.includes('Paula') //El método includes permite verificar si determinado parámetro se encuentra (o no) dentro del array sobre el que se hace referencia. Arroja un booleano, es decir, true o false// 
var includes2 = names2.includes('Marco') //El ejemplo de arriba muestra un caso de booleano false, mientras que el ejemplo de esta linea, arroja un booleano true//
console.log(includes)
console.log(includes2)

var indexOf = names.indexOf('Sonia') //El método indexOf recorre el array desde la primera posición, y comprueba si el elemento que se comanda entre paréntesis se encuentra en el array, y de estarlo, indica la posición en la que se encuentra. Si hay varios elementos en el array con el mismo elemento, solo considera el primero localizado//
var indexOf2 = names2.indexOf('Macarena') //El ejemplo de arriba muestra un parámetro que se encuentra en el array, concretamente, en la posición 1 (según las líneas de código previamente escritas). El ejemplo de esta línea, arrojaría valor -1, ya que este parámetro no se encuentra en el array//
console.log(names.includes('Sonia'))
console.log(names2.includes('Macarena'))

var lastIndexOf = names.lastIndexOf('Segismundo') //El método lastindexOf recorre el array desde la última posición, y comprueba si el elemento que se comanda entre paréntesis se encuentra en el array, y de estarlo, indica la posición en la que se encuentra. Si hay varios elementos en el array con el mismo elemento, solo considera el primero localizado//
var lastIndexOf2 = names2.lastIndexOf('David') //El ejemplo de arriba arrojará un valor -1, ya que ese elemento no se encuentra en el array. El ejemplo de esta línea muestra un elemento que se encuentra en el array, concretamente la posición 2 (según las líneas de código previamente escritas)//
console.log(lastIndexOf)
console.log(lastIndexOf2)

var reverse = names.reverse() //El metodo reverse cambia las posiciones de todos los elementos del array, a un estado estricamente contrario. Es decir, da la vuelta al array//
console.log(reverse)

var join = names.join(" + ") //El metodo join permite unir en una cadena los diferentes elementos de un array, utilizando distintos métodos de separación. En este caso, utlizará el array names, y separaré cada uno de los parámetos con un espacio, un + y otro espacio//
console.log(join)

var slice = names.slice(0, 2) //El metodo slice permite extraer elementos de un array existente. Mucho ojo, porque empezará a extraer desde el primer dígito de posición impuesto, pero, del último digito de posición impuesto, sólo extraerá hasta la posición justamente anterior a este dígito.
console.log(slice)

//Level 2//

var splice = names2.splice(0, 2, 'Zacarías') //El metodo splice permite generar un índice interno sobre el que se empiecen a considerar párametros en un array ya existente. El primer dígito indica el punto de partida para empezar la consideración. El segundo dígito marca cuantas posiciones desde el índice se eliminan, y a continuación, se pueden añadir parámetros que se añadirán a continuación del índice interno generado//
console.log(splice)
console.log(names2)

var fill = names2.fill('Jonás', 0, 2) //El metodo fill permite sustituir elementos de un array, indicando en primer lugar lo que se quiere añadir, y luego, marcando la posición "desde" (primer dígito de posición) hasta la posición "hasta" (segundo dígito de posición)//
console.log(fill)
console.log(names2)

var flat = names3.flat(2) //El metodo flat permite desanidar un array con varios elementos anidados. Si hay varios array anidados, y no se marca ningún ningún número entre paréntesis, sólo desanidará el primer anidado.
console.log(flat)
console.log(names3)

//Level 3//

var forEach
var some
var every
var find
var findIndex

//Level 4//

var map
var filter
var reduce
var sort




