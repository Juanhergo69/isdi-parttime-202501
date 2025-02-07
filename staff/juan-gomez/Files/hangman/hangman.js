//Tratar de desarrollar programa basado en el juego del ahorcado.
//Crear variable para preguntar si se quiere o no jugar (question). Si se decide no jugar,el juego se cierra.
//Generar variable del nombre que se desea adivinar (hangmanWord)
//Generar variable de almacenamiento para el patrón de la palabra adivinada hasta ahora (en un array vacío []) (storeWordArray).
//Generar variable de almacenamiento para el patrón de la palabra adivinada hasta ahora (en un string vacío '') (storeWord).
//Generar variable de vidas (5), que se reducirán con cada fallo cometido (lifesInStock).
//Generar variable abecedario, que servirá de guía para reconocer los inputs del jugador (allAlphabetLetters).
/*Generar variable abecedario en mayúsculas, que servirá de guía para reconocer los inputs en mayúsculas del jugador (allAlphabetLettersUpper),
y permitir la transformación a Minus si el input introducido es Mayus.*/
/*Generar un for que represente con guiones las letras de la palabra que se debe adivinar 
(con esto generamos un array que tiene "," entre cada guión).*/
/*Crear una función que transforme storeWordArray a un string (storeWordArraytoString)
(con esto conseguimos que no aparezcan las comas típicas del array entre los guiones)*/
/*Crear una función que cribe el input de parámetros, en este caso, queremos que sólo reconozca una letra, (dataInputCheck)
da igual que sea mayúscula y minúscula. Todo lo demás, es decir, espacios vacíos o números, debe reconocerlos como error
y lanzar un mensaje de que se está equivocando de parámetros. Si el jugador introduce un número o un espacio vacío,
lanzará el mensaje de error y la función parará. Si introduce una letra, pasará a un for de reconocimiento, donde comprará la letra 
elegida con el abeceario, y en el caso de introducir una letra mayúsucula se transforme en minúscula;
(el código presenta un error cuando se ingresa 0, no lo reconoce como número)*/
/*Crear una funcion de checkeo y actualización de storeWord, donde compararemos si la letra elegida por el usuario está o no (selectedLetterCheck)
en hangmanWord.*/
/*Crear un while donde se especifiquen las condiciones en las que el juego continuará funcionando. En este caso, queremos que el juego continue 
mientras que no se adivine la palabra, o que el contador de vidas no sea 0.*/
//Crear un if donde se indique, que si se pierden todas las vidas, se acaba la partida//
/*Crear varios if donde se indique, que si se aciertan todas las letras, el juego se gana. Dependiendo del total de vidas (lifesInStore) 
que queden disponibles, lanzará un mensaje diferente*/

var question = confirm('Do you want play a game?')
var hangmanWord = 'esternocleidomastoideo'
var storeWordArray = []
var storeWord = ''
var lifesInStock = 5
var allAlphabetLetters = 'abcdefghijklmnñopqrstuvwxyz'
var allAlphabetLettersUpper = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'

function storeWordArraytoString() {
    storeWord = ''
    for (var i = 0; i < storeWordArray.length; i++) {
        storeWord += storeWordArray[i]
    }
}
function dataInputCheck(letter) {
    if (letter.length !== 1 || letter.trim() === ' ' || !isNaN(letter)) {
        alert('Try to input a single letter. Numbers and spaces void are not allowed.')
        lifesInStock--
        return
    }
    for (var i = 0; i < allAlphabetLetters.length; i++) {
        if (letter === allAlphabetLetters[i] || letter === allAlphabetLettersUpper[i]) {
            return allAlphabetLetters[i]
        }
    }
    return
}
function selectedLetterCheck(letter) {
    var letterInWord = false
    for (var i = 0; i < hangmanWord.length; i++) {
        if (letter === hangmanWord[i]) {
            letterInWord = true
            storeWordArray[i] = letter
        }
    }
    if (letterInWord === false) {
        lifesInStock--
    }
}
for (var i = 0; i < hangmanWord.length; i++) {
    if (hangmanWord[i] === ' ') {
        storeWordArray[storeWordArray.length] = ' '
    } else {
        storeWordArray.push('-')
    }
}
storeWordArraytoString()
if (question) {
    alert('Welcome to Hangman game')
} else {
    alert('Ok, worse for you')
}
while (storeWord !== hangmanWord && lifesInStock !== 0 && question !== false) {
    var playerLetter = prompt(`Can you guess the word?: \n ${storeWord} \n You have ${lifesInStock} lifes`)
    if (playerLetter === null) {
        lifesInStock = 0
        alert('Bye bye. Come back any time.')
    } else {
        var selectedLetter = dataInputCheck(playerLetter)
        if (selectedLetter !== undefined) {
            selectedLetterCheck(selectedLetter)
            storeWordArraytoString()
        }

    }
}
if (lifesInStock === 0) {
    alert('You lose the game, try again if you dare')
}
if (storeWord === hangmanWord && lifesInStock === 5) {
    alert(`Congratulations, you win! You did it perfectly. \n The word was: ${hangmanWord}`)
}
if ((storeWord === hangmanWord && lifesInStock === 4) || lifesInStock === 3) {
    alert(`Congratulations, your win! You play well, but not perfect. \n The word was: ${hangmanWord}`)
}
if ((storeWord === hangmanWord && lifesInStock === 2) || lifesInStock === 1) {
    alert(`Congratulations, you win! You won by miracle. \n The word was: ${hangmanWord}`)
}



