//El ejercicio consta de comprobar los diferentes métedos de modificación y comprobación de un array//
//Se deben probar cada uno de los comandos y comprender que hace cada uno de ellos//
//Al lado de cada línea de código describiré la función que ejecuta cada uno de ellos//

let names = ['Juan', 'Diana', 'Sonia', 'Marta'] //Primer array sobre el que trabajo//
let names2 = ['Juanjo', 'Francisco', 'David', 'Marco'] //Segundo array sobre el que trabajo//
let names3 = ['Josefina', 'Manolo', ['Lorenzo', 'Catalina', ['Romeo', 'Carlos']]] //Tercer array sobre el que trabajo//
let numbers = [15, 30, 60, 120, 240] //Cuarto array sobre el que trabajo//
let people = [{ name: 'Juan', age: 34 }, { name: 'Diana', age: 31 }, { name: 'Sonia', age: 11 }, { name: 'Marta', age: 2 }, { name: 'Matusalen', age: 10000000000 }] //Quinto array sobre el que trabajo//

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
//Level 1 COMPLETED//
const push = names.push('Copito') //El método push añade a la última posición del array aquello que se comanda entre paréntesis//
console.log(push)
console.log(names)

const pop = names.pop() //El método pop elimina la última posición del array//
console.log(pop)
console.log(names)

const shift = names.shift() //El método shift elimina la primera posición del array//
console.log(shift)
console.log(names)

const unshift = names.unshift('Loli') //El método unshift añade en la primera posición del array aquello que se comanda entre paréntesis//
console.log(unshift)
console.log(names)

const concat = names.concat(names2) //El método concat une dos arrays diferentes en uno solo. Funciona de forma similar a la función appendChild de html. Siempre sigue el orden lógico, es decir, empezará por al array names, y continuará con el array names 2//
console.log(concat)
console.log(names.concat(names2))

const includes = names.includes('Paula') //El método includes permite verificar si determinado parámetro se encuentra (o no) dentro del array sobre el que se hace referencia. Arroja un booleano, es decir, true o false// 
let includes2 = names2.includes('Marco') //El ejemplo de arriba muestra un caso de booleano false, mientras que el ejemplo de esta linea, arroja un booleano true//
console.log(includes)
console.log(includes2)

const indexOf = names.indexOf('Sonia') //El método indexOf recorre el array desde la primera posición, y comprueba si el elemento que se comanda entre paréntesis se encuentra en el array, y de estarlo, indica la posición en la que se encuentra. Si hay letios elementos en el array con el mismo parámetro, solo considera el primero localizado//
let indexOf2 = names2.indexOf('Macarena') //El ejemplo de arriba muestra un parámetro que se encuentra en el array, concretamente, en la posición 1 (según las líneas de código previamente escritas). El ejemplo de esta línea, arrojaría valor -1, ya que este parámetro no se encuentra en el array//
console.log(names.includes('Sonia'))
console.log(names2.includes('Macarena'))

const lastIndexOf = names.lastIndexOf('Segismundo') //El método lastindexOf recorre el array desde la última posición, y comprueba si el elemento que se comanda entre paréntesis se encuentra en el array, y de estarlo, indica la posición en la que se encuentra. Si hay letios elementos en el array con el mismo elemento, solo considera el primero localizado. Si el elemento no se encuentra en el array, devolvería -1.
const lastIndexOf2 = names2.lastIndexOf('David') //El ejemplo de arriba arrojará un valor -1, ya que ese elemento no se encuentra en el array. El ejemplo de esta línea muestra un elemento que se encuentra en el array, concretamente la posición 2 (según las líneas de código previamente escritas)//
console.log(lastIndexOf)
console.log(lastIndexOf2)

const reverse = names.reverse() //El metodo reverse cambia las posiciones de todos los elementos del array, a un estado estricamente contrario. Es decir, da la vuelta al array//
console.log(reverse)

const join = names.join(" + ") //El metodo join permite unir en una cadena los diferentes elementos de un array, utilizando distintos métodos de separación. En este caso, utlizará el array names, y separaré cada uno de los parámetos con un espacio, un + y otro espacio//
console.log(join)

const slice = names.slice(0, 2) //El metodo slice permite extraer elementos de un array existente. La primera posición introducida, será el punto de partida de la extracción. La segunda posición introducida, será el punto final de la extracción (considerará hasta la posición justamente anterior a esta segunda posición introducida)//
console.log(slice)
//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
//Level 2 COMPLETED//
const splice = names2.splice(0, 2, 'Zacarías') //El método splice El metodo splice permite generar un índice interno sobre el que se empiecen a eliminar párametros en un array ya existente. El primer dígito indica el punto de partida para empezar la consideración. El segundo dígito marca cuantas posiciones desde el índice se eliminan, y a continuación, se pueden añadir parámetros que se añadirán a continuación del índice interno generado.  Es importante considerar que la última posición no entra dentro de la eliminación, se eliminaría hasta la posición justamente anterior a esta//
console.log(splice)
console.log(names2)

const fill = names2.fill('Jonás', 0, 2) //El método fill añade un elemento en un array existente, permitiendo elegir la posiciones, donde se quiere incluir. Los elementos que ocupaban esas posiciones son sustitudos por el elmento que se incluya. No considera la última posición marcada, sustiuye hasta la justamente anterior. Se indica primero el elemento que se quiere añadir, a continuación se indica la posición de inicio, y finalmente, la posición de fin//
console.log(fill)
console.log(names2)
//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
//Level 3 COMPLETED//
const forEach = names.forEach((name, index, array) => { //El metodo forEach permite iterar todos los elementos de un array, y aplicar a cada uno de ellos un callback//
    console.log(`Name: ${name}, Index: ${index}, Array: ${array}`)
})

const some = names.some((name) => { //El metodo some itera los elementos de un array y pasa un callback. Si alguno de los elementos iterados cumple la función del callback, devolvería true. Si no cumple ningún elemento con el callback, devolvería false//
    return name.startsWith('S')
})
console.log(some)

const every = names.every(name => name.length > 3) //El método every permite comprobar a través de un callback una determinada condición de todos los elementos del array. Devuelve un booleano, es decir, true o false. Si hay un sólo elemento que no cumpla la condición, el resultado de every siempre sera false//
console.log(every)
console.log(names)

const find = names.find((name) => { //El método find permite comprobar a través de un callback una determinada condición de todos los elementos del array. El primer elemento que cumpla esta condición será el que será devuelvo. Si no hay elementos que cumplan la condición, devolverá undefined//
    return name.startsWith('S')
})
console.log(find)

const findIndex = names.findIndex((name) => { //El método findIndex permite comprobar a través de un callback a una determinada condición de todos los elementos del array. El índice del primer elemento que cumpla esta condición será el será devuelto. Si no hay elementos que cumplan con la condición, devolverá -1 (índice inexistente)//
    return name.startsWith('S')
})
console.log(findIndex)

const filter = names.filter(name => name.length > 4) //El método filter permite filtrar un array existente, al cual, al pasarle un callback, todos los elementos que cumplan el callback serán añadidos a un nuevo array//
console.log(filter)
//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/

//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
//Level 4 COMPLETED//
const flat = names3.flat(2) //El metodo flat permite desanidar un array con letios elementos anidados. Si hay letios array anidados y subanidados, y no se marca ningún ningún número entre paréntesis, sólo desanidará el primer anidado. El número introducido se corresponde a la profundidad (nivel de desanidado) al que se quiere llegar (díficil de explicar, fácil de entender viéndolo)//
console.log(flat)
console.log(names3)

const map = names.map(name => name.toUpperCase()) //El método map permite iterar todos los elementos de un array, aplicando en cada uno de los elementos un callback, y devolviendo todos los elementos con el callback aplicado a un nuevo array//
console.log(map)

const reduce = numbers.reduce((acumulator, actualValue) => acumulator + actualValue, 0) //El metodo reduce permite iterar en todos los elementos de un array, y reducir todos los elementos a un único valor a través de 2 parámetros: Un callback que recibe 4 argumentos: acumulador (valor acumulador que se construye con cada iteración), valor actual (valor de cada elemento iterado), indice (es opcional, y marca la posición de cada elemento iterado) y array (el array sobre el que se está haciendo la iteración). El segundo parámetro es el valor incial, que se corresponde al valor incial con el que empieza el acumulador. El útil para hacer operaciones matemáticas con números, o para concatenar, contar la longitud, o contar la frecuencia de caracteres en strings de texto.//
console.log(reduce)

const sort = people.sort((a, b) => a.age - b.age) //El metodo sort permite iterar en todos los elementos de un array, y ordenarlos alfabéticamente si no se comanda una función de comparación. Convierte todos los elementos en strings, independientemente que sean texto o números, por lo que, para poder hacer una ordenación lógica de números, debe si o si hacerse una función de comparación. Modifica el array original//
console.log(sort)
console.log(people)
//****************************************************************************************************************************************************************************************************************************************************************************************************************************************/




