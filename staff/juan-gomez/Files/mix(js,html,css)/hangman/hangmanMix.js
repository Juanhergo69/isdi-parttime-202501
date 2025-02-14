//Aquí comienza toda la parte de código Javascript del juego//

var hangmanWords = ['ukelele', 'trompeta', 'boniato', 'cangrejo', 'mastodonte'] //Generar array de palabras aleatorias//
var hangmanWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)] //Generar función que aletoriza la palabra seleccionada según el array anterior//
var storeWordArray = generateStoreWordArray(hangmanWord) //Almacena la palabra con entrecomillado//
var storeWord = '' //Almacena la palabra en un string (sin entrecomillado)//
var lifesInStock = 5 //Vidas disponibles para superar el juego//
var usedLetters = [] //Almacena las letras que ya se han utilizado por input del usuario//
var allAlphabetLetters = 'abcdefghijklmnñopqrstuvwxyz' //Letras del abecedario en mínusculas//
var allAlphabetLettersUpper = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ' //Letras del abecedario en mayúsuculas//
storeWordArraytoString() //Transforma el array en un string (para quitar las "comas")

function generateStoreWordArray(_hangmanWord) { //Esta función genera el storeWordArray por primera vez (con guiones)//
    var temporalStoreWordArray = []
    for (var i = 0; i < _hangmanWord.length; i++) { //El for lo genera de inicio (solo guiones y espacios si es necesario)//
        if (_hangmanWord[i] === ' ') {
            temporalStoreWordArray[temporalStoreWordArray.length] = ' '
        } else {
            temporalStoreWordArray[temporalStoreWordArray.length] = '-'
        }
    }
    return temporalStoreWordArray
}

function storeWordArraytoString() { //Esta función permite pasar storeWordArray a formato string, de forma que desaparezcan las comas entre las letras//
    storeWord = ''
    for (var i = 0; i < storeWordArray.length; i++) {
        storeWord += storeWordArray[i]
    }
}

function dataInputCheck(letter) { //Esta función valida el input del usuario//
    if (letter.length !== 1 || letter.trim() === ' ' || !isNaN(letter)) {
        alert('Try to input a single letter. Numbers and spaces void are not allowed.')
        return
    }

    for (var i = 0; i < allAlphabetLetters.length; i++) { //El for itera el abecedario para comprobar que el input del usuario es una letra, y pasarlo a minúscula si es necesario//
        if (letter === allAlphabetLetters[i] || letter === allAlphabetLettersUpper[i]) { //El if compara el input con la posición del abecedario, y si hay coincidencia, devuelve la letra en minúscula//
            for (var j = 0; j < usedLetters.length; j++) {
                if (usedLetters[j] === allAlphabetLetters[i]) { //El if compara si la letra del input del usuario ya se ha jugado//
                    alert('You are repeating letters')
                    return allAlphabetLetters[i]
                }
            }
            usedLetters[usedLetters.length] = allAlphabetLetters[i] //Añadimos la letra ya jugada al array de usedLetters//
        }
    }
    return
}

function selectedLetterCheck(letter) { //Esta funcion comprueba si la letra esta en hangmanWord, y si no, resta una vida//
    var letterInWord = false
    for (var i = 0; i < hangmanWord.length; i++) { //El for itera la palabra para comprar si la letra escogida está en la palabra//
        if (letter === hangmanWord[i]) {
            letterInWord = true
            storeWordArray[i] = letter
        }
    }
    if (letterInWord === false) {
        lifesInStock--
    } else {
        storeWordArraytoString() //Después de las comprobaciones, actualizar el string.
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

function gameOn(letter) { //Esta función decide como empieza y como acaba el juego//
    if (lifesInStock === 0) {
        alert('Game is over, you have no lifes')
    }
    var inputCheck = dataInputCheck(letter)
    if (inputCheck != undefined) {
        selectedLetterCheck(inputCheck) //Si la letra esta dentro de la palabra, se actualiza storeWordArray//
        cleanInterface() //se limpia la interfaz de la ronda anterior//
        renderInterface() //se genera la interfaz de la nueva ronda//
    }
}

function resetGame() { //Esta función resetea todas las variables del juego//
    hangmanWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)]
    storeWordArray = generateStoreWordArray(hangmanWord)
    storeWordArraytoString()
    lifesInStock = 5
    usedLetters = []
}

// Aquí termina toda la parte de código Javascript del juego //

//**************************************************************************//

// Aquí empieza toda la parte del renderizado a HTML, combinado con estilos CSS//

var body = document.body //Generamos variable body para comenzar a trabajar//
var hangmanWordContainer //Generamos variable para el contenedor de la palabra a adivinar//
var lifesInStockContainer //Generamos variable para el contenedor de las vidas disponibles//
var letterFormContainer //Generamos variable para el contendor de la letra//
var playAgainButton //Generamos variable para el contenedor del botón "jugar de nuevo"//
var userFeedbackContainer //Generamos variable para el contenedor de "casilla" para hacer input//
var usedLetterContainer //Generamos variable para el contenedor de las letras ya usadas//
var gameTitle = document.createElement('h1') //Generar variable de nombre de juego//
gameTitle.textContent = 'HANGMAN' //Generar nombre del juego//


body.style.display = 'flex' //Generamos estilo de disposición del body//
body.style.flexDirection = 'column' //Generamos estilo de dirección del body// 
body.style.alignItems = 'center' //Generamos estilo de alineación del body//
body.style.gap = '2rem'; //Generamos estilo de separación del body//
gameTitle.style.textAlign = 'center' //Generamos estilo de alineación para el título del juego//

body.appendChild(gameTitle) //Añadimos el título del juego al body//

function renderLetterForm() { //Esta funcion permite crear el contenedor del formulario del input del jugador y el botón de envío de input//
    letterFormContainer = document.createElement('form') //Creamos el formulario para las letra//
    letterFormContainer.style.display = 'flex' //Generamos estilo de disposición del formulario//
    letterFormContainer.style.flexDirection = 'row' //Generamos estilo de dirección del formulario//
    letterFormContainer.style.width = '100%' //Generamos estilo de anchura para el formulario//
    letterFormContainer.style.gap = '0.5rem' //Generamos estilo de separación del formulario//
    letterFormContainer.style.justifyContent = 'center' //Generamos estilo de justificar contenido para el formulario//

    var letterInput = document.createElement('input') //Generamos variable de input para el usuario//
    letterInput.type = 'text' //Generamos la categoría del input del jugador//
    letterInput.minLength = 1 //Generamos longitud mínima para el input del jugador//
    letterInput.maxLength = 1 //Generamos longitud máxima para el input del jugador//
    letterInput.required = true //Generamos requerimiento de input para el jugador//
    letterInput.id = 'letter' //Generamos identificacion del input del juegador//
    letterInput.style.width = '2rem' //Generamos estilo de anchura para el input del jugador//

    var submitButton = document.createElement('input') //Generamos variable de botón de envío de input//
    submitButton.type = 'submit' //Generamos la categoría del botón de envío de input//

    letterFormContainer.appendChild(letterInput) //Añadimos input del jugador al formulario//
    letterFormContainer.appendChild(submitButton) //Añadimos botón de envío de input al formulario//
    body.appendChild(letterFormContainer) //Añadimos el formulario (con todo lo anterior añadido) al body//
}

function renderPlayAgainButton() { //Esta función permite crear el contenedor del botón para jugar de nuevo//
    playAgainButton = document.createElement('button') //Generamos el botón de jugar de nuevo//
    playAgainButton.textContent = 'Play Again' //Generamos el texto que tendrá contenido el botón de jugar de nuevo//
    playAgainButton.style.width = '7rem' //Generamos el estilo de anchura del botón de jugar de nuevo//

    body.appendChild(playAgainButton) //Añadimos el botón de jugar de nuevo al body//
    playAgainButton.addEventListener('click', function (event) { //Añadimos un addEventListener para que el juego reaccione a determinada acción//
        event.preventDefault() //En este caso, queremos evitar cualquier comportamiento de consola que reinicie nuestra partida, por lo que comandamos preventDefault, para evitar que actúe de forma predeterminada//
        resetGame() //Llamamos a la función para resetear el juego//
        alert('Reseting game') //Mensaje indicando que se resetea el juego //
        cleanInterface() //Llamamos a la función para limpiar la interfaz//
        renderInterface() //Llamamos a la función para generar de nuevo la interfaz//
    })
}

function renderWordContainer() { //Esta función permite crear el contenedor de las letras (o cuadros vacíos) de la palabra a adivinar//
    wordContainer = document.createElement('div') //Generamos el contenedor de letras o huecos//
    wordContainer.style.display = 'flex' //Generamos estilo de disposición del contenedor de letras o huecos//
    wordContainer.style.width = '100%' //Generamos estilo de anchura para el contenedor de letras o huecos//
    wordContainer.style.flexDirection = 'row' //Generamos estilo de dirección del contenedor de letras o huecos//
    wordContainer.style.gap = '0.5rem' //Generamos estilo de separación del contenedor de letras o huecos//
    wordContainer.style.justifyContent = 'center' //Generamos estilo de justificar contenido para el contenedor de letras o huecos//

    for (var i = 0; i < storeWordArray.length; i++) { //El for itera para crear cada cuadradito de cada letra que conforma la palabra a adivinar//
        var letterSquare = document.createElement('div') //Generamos el hueco de cada una de las letras que conforma la palabra a adivinar//
        letterSquare.style.height = '2rem' //Generamos estilo de altura para el cuadradito//
        letterSquare.style.width = '2rem' //Generamos estilo de anchura para el cuadradito//
        letterSquare.style.border = '2px dashed slategray' //Generamos estilo de borde para el cuadradito//
        letterSquare.style.display = 'flex' //Generamos estilo de disposición del cuadradito//
        letterSquare.style.justifyContent = 'center' //Generamos estilo de justificar contenido del cuadradito//
        letterSquare.style.alignItems = 'center' //Generamos estilo de alineación del cuadradito//
        if (storeWordArray[i] !== '-') { //El if nos dice que, si, según el indice del array de la palabra, lo que encuentra no es un guión....//
            var letterContainer = document.createElement('b') //Entonces, generará la letra en negrita(b) dentro del contenedor//
            letterContainer.textContent = storeWordArray[i].toUpperCase() //Y además, la generará en mayúsculas//
            letterSquare.style.border = "2px solid green" //Y además, cambiará el borde del cuadrito a verde//
            letterSquare.style.backgroundColor = "solid green" //Y además, cambiará el fondo del cuadradito a verde//
            letterSquare.appendChild(letterContainer)

        }
        wordContainer.appendChild(letterSquare) //Añadimos el hueco que ocupa cada letra, y sus condiciones, al contenedor de letras o huecos//
    }

    body.appendChild(wordContainer) //Añadimos el contenedor de letras o huecos al body//

}

function renderLifesContainer() { //Esta función permite crear los iconos de las vidas disponibles//
    lifesContainer = document.createElement('div') //Generamos el contenedor de las vidas//
    lifesContainer.style.display = 'flex' //Generamos estilo de disposición del contenedor de vidas//
    lifesContainer.flexDirection = 'row' //Generamos estilo de dirección del contenedor de vidas//
    lifesContainer.style.width = '100%' //Generamos estilo de anchura para el contenedor de vidas//
    lifesContainer.style.gap = '1rem' //Generamos estilo de separación del contenedor de vidas//
    lifesContainer.style.justifyContent = 'center' //Generamos estilo de justificar contenido para el contenedor de vidas//
}

//Añadimos icono de nuestra elección en el HTML (ver Html para ubicar)//






