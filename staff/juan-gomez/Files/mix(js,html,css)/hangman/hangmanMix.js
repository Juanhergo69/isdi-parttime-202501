//Lógica del juego
var words = ['tyrion', 'eddard', 'melissandre', 'jon', 'daenerys', 'cersei', 'jaime', 'robb', 'viserys', 'barristan', 'tywin', 'arya', 'sansa', 'drogon', 'viserion', 'rhaegal', 'drogo', 'petyr', 'varys', 'stannis', 'margaery', 'roose', 'ramsay', 'davos', 'rickon', 'robert'] //Se generan los nombres a adivinar//
var word = words[Math.floor(Math.random() * words.length)]; //Se genera aletoriedad en la selección del nombre a adivinar//
var guessedWordArray = generateGuessedWordArray(word); //Se genera el array de la palabra a adivinar//
var guessedWord = ''; //Almacena el patrón de la palabra pero en un string//
var lifes = 5; //Vidas disponibles//
var playedLetters = []; //Array vacío que contendrá las letras usadas por el jugador//
var alphabet = 'abcdefghijklmnñopqrstuvwxyz' //String que contiene todas las letras en mínusculas (Servirá para recorrerlas en un for y determinar la posición de la letra seleccionada por el jugador)//
var alphabetUpper = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ' //String que contiene todas las letras en mayúsculas (Servirá para recorrerlas en un for y determinar la posición de la letra seleccionada por el jugador)//
guessedWordToString(); //completa el guessedWord (string) solo con guiones

function validateInputLetter(letter) { //La función valida el input del usuario. Si no es un sólo carácter, o es un número, alertará de que no es correcto//
    if (letter.length !== 1 || letter === ' ' || !isNaN(letter)) { //compruebo que la letra es solo un caracter (o un numero)
        alert('For Rhllor!!! Put only letters. Numbers or space void are not allowed.')
        return;
    }

    /*iterar abecedario para comprobar que el caracter es una letra, y pasarlo a minuscula si hace falta*/
    for (var i = 0; i < alphabet.length; i++) {
        if (letter === alphabet[i] || letter === alphabetUpper[i]) { //comparo la misma posición en alfabeto en minusculas y en mayusculas y si hay una coincidencia, me salgo de la función devolviendo la letra en minuscula
            //comprobar si esa letra ya se ha jugado
            for (var j = 0; j < playedLetters.length; j++) { //comprobar si la letra se había jugado antes
                if (playedLetters[j] === alphabet[i]) {
                    alert('For the Ancient Gods!!! You have already tried this letter.');
                    return alphabet[i]
                }
            }
            playedLetters[playedLetters.length] = alphabet[i] //pusehamos al array de played letters la letra jugada
            return alphabet[i]
        }
    }
    return;
}

function checkLetterIncluded(letter) { //actualiza guessedWord si la letra esta en word y si no resta una vida
    var isLetterInWord = false //partimos de la idea de que la letra no esta en la palabra a adivinar
    for (var i = 0; i < word.length; i++) { //iteramos la palabra para ver si contiene la letra 
        if (letter === word[i]) {
            isLetterInWord = true //cambiamos la variable que partia de la idea de que la letra no esta, porque sí que esta
            guessedWordArray[i] = letter
        }
    }
    if (isLetterInWord === false) { //en caso de que la letra no este, resta una vida
        lifes--
    } else {
        guessedWordToString() //actualizar el string para asegurarme de poder detectar la victoria
    }
}

function generateGuessedWordArray(_word) { // genera el guessedWordArray por primera vez (con guiones)
    var tempArr = []
    for (var i = 0; i < _word.length; i++) { //esto lo genera de inicio (solo guiones y espacios si hacen falta)
        if (_word[i] === ' ') {
            tempArr[tempArr.length] = ' '
        } else {
            tempArr[tempArr.length] = '-'
        }
    }
    return tempArr;
}

function guessedWordToString() { //función para pasar el array a string
    guessedWord = ''
    for (var i = 0; i < guessedWordArray.length; i++) {
        guessedWord += guessedWordArray[i]
    }
}

function playGame(letter) {
    if (lifes <= 0) {
        alert('For the New Gods!!! You can not play anymore, you are dead')
        return;
    }
    var validatedLetter = validateInputLetter(letter)
    if (validatedLetter !== undefined) {
        checkLetterIncluded(validatedLetter) //guessedWordArray se actualiza si la letra esta dentro
        //limpiamos la interfaz (porque tiene la info de la ronda anterior)
        cleanInterface();
        //renderizamos la interfaz de nuevo, con la info de la ronda actual
        renderInterface();
    }
}

//Resetea todas las variables necesarias para el juego
function resetGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedWordArray = generateGuessedWordArray(word);
    guessedWordToString();
    lifes = 5;
    playedLetters = [];
}

//Empezamos a manejar el renderizado a html
var body = document.body; //---> nos traemos el body
var wordContainer;
var lifesContainer;
var letterFormContainer;
var playAgainButton;
var userFeedbackContainer;
var playedLettersContainer;

//Estilos del body
body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.alignItems = 'center'
body.style.gap = '2rem';

//Creamos el titulo y le damos estilos
var gameTitle = document.createElement('h1');
gameTitle.textContent = 'GAME OF THRONES: HANGMAN GAME';
gameTitle.style.textAlign = 'center';
gameTitle.style.color = 'white';
gameTitle.style.fontSize = '70px'


//Añadimos el titulo al body
body.appendChild(gameTitle);

//Añadir al DOM el formulario que permite jugar una letra
function renderLetterForm() {
    //Creamos el formulario para la letra
    letterFormContainer = document.createElement('form');
    //estilizamos el form
    letterFormContainer.style.display = 'flex';
    letterFormContainer.style.flexDirection = 'row';
    letterFormContainer.style.width = '100%';
    letterFormContainer.style.gap = '3rem';
    letterFormContainer.style.justifyContent = 'center';

    var letterInput = document.createElement('input');
    letterInput.type = 'text';
    letterInput.minLength = 1;
    letterInput.maxLength = 1;
    letterInput.required = true;
    letterInput.id = 'letter';
    letterInput.style.width = '3rem'
    letterInput.style.borderColor = 'black'

    var submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.style.backgroundColor = 'white';
    submitButton.style.borderColor = 'black';
    submitButton.style.fontSize = '20px';




    letterFormContainer.appendChild(letterInput);
    letterFormContainer.appendChild(submitButton);

    //Añadimos el form al body
    body.appendChild(letterFormContainer)
}

function renderPlayAgainButton() {
    playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.style.width = '7rem';
    playAgainButton.style.borderColor = 'black';
    playAgainButton.style.backgroundColor = 'white';


    body.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', function (event) {
        event.preventDefault();
        resetGame();
        alert('reseting game')
        cleanInterface();
        renderInterface();
    })
}

function renderWordContainer() {
    wordContainer = document.createElement('div'); //Creamos el contenedor de las letras o cuadrados vacíos//
    wordContainer.style.width = '100%'; //Añadimos estilos//
    wordContainer.style.display = 'flex'; //Más estilos//
    wordContainer.style.flexDirection = 'row'; //Más estilos//
    wordContainer.style.gap = '0.5rem'; //Más estilos//
    wordContainer.style.justifyContent = 'center'; //Más estilos//

    for (var i = 0; i < guessedWordArray.length; i++) { //El for crea cada cuadradito para espacio vacío sin adivinar, se irá rellenando conforme se acierten letras//
        var letterSquare = document.createElement('div');
        //le damos estilos
        letterSquare.style.height = "6rem";
        letterSquare.style.width = "6rem";
        letterSquare.style.border = "2px dashed white"
        letterSquare.style.display = "flex";
        letterSquare.style.justifyContent = "center"
        letterSquare.style.alignItems = "center"
        if (guessedWordArray[i] !== '-') {
            var letterContainer = document.createElement('b');
            letterContainer.style.fontSize = '30px';
            letterContainer.textContent = guessedWordArray[i].toUpperCase();
            letterSquare.style.border = "2px solid green"
            letterSquare.style.backgroundColor = "green"
            letterSquare.appendChild(letterContainer)
        }
        wordContainer.appendChild(letterSquare) //Añadimos el cuadradito de letras al contenedor de letras//
    }
    //Añadimos los contenedores al body
    body.appendChild(wordContainer)
}

function renderLifesContainer() {
    //Creamos un contenedor para los iconos que representan vidas
    lifesContainer = document.createElement('div');
    //Añadir estilos
    lifesContainer.style.width = '100%';
    lifesContainer.style.display = 'flex';
    lifesContainer.style.flexDirection = 'row';
    lifesContainer.style.gap = '1rem';
    lifesContainer.style.justifyContent = 'center';

    //Creamos un iconito para cada vida que queda
    /* Añadir icono de google icons
        <span class="material-symbols-outlined">
            favorite
        </span>
    */
    for (var i = 0; i < 5; i++) {
        if (i < lifes) {
            var lifeIcon = document.createElement('span');
            lifeIcon.textContent = 'favorite';
            lifeIcon.className = 'material-symbols-outlined';
            lifeIcon.style.color = 'red';
            //Lo añadimos al contenedor
            lifesContainer.appendChild(lifeIcon)
        } else {
            var lifeIcon = document.createElement('span');
            lifeIcon.textContent = 'skull'
            lifeIcon.className = 'material-symbols-outlined';
            lifeIcon.style.color = 'lightgrey'
            //Lo añadimos al contenedor
            lifesContainer.appendChild(lifeIcon)
        }

    }

    //Añadimos los contenedores al body
    body.appendChild(lifesContainer)
}

function renderUserFeedback() {
    if (lifes <= 0) { //mensaje de derrota
        userFeedbackContainer = document.createElement('div')
        var loseMsg = document.createElement('h2');
        loseMsg.textContent = `The ancienct wrath of Valyria falls on you. You dead!`;
        loseMsg.style.color = 'red';
        loseMsg.style.textAlign = 'center'
        userFeedbackContainer.appendChild(loseMsg);
    } else { //En caso opuesto: msj victoria
        userFeedbackContainer = document.createElement('div')
        var winMsg = document.createElement('h2');
        winMsg.textContent = `The Faith of the Seven bless you. You guessed the world!`;
        winMsg.style.color = 'green';
        winMsg.style.textAlign = 'center'
        userFeedbackContainer.appendChild(winMsg);
    }

    body.appendChild(userFeedbackContainer)
}

function renderPlayedLettersContainer() {
    playedLettersContainer = document.createElement('div');
    playedLettersContainer.style.display = 'flex';
    playedLettersContainer.style.flexDirection = 'column'

    var playedLettersTitle = document.createElement('h2');
    playedLettersTitle.textContent = 'You already tried:';
    playedLettersTitle.style.fontSize = '30px';
    playedLettersTitle.style.color = 'white';
    playedLettersTitle.style.textAlign = 'center';

    playedLettersContainer.appendChild(playedLettersTitle);


    var letterSquaresContainer = document.createElement('div');
    letterSquaresContainer.style.display = 'flex';
    letterSquaresContainer.style.flexWrap = 'wrap';
    letterSquaresContainer.style.gap = '0.5rem';

    for (var i = 0; i < playedLetters.length; i++) {
        var letterContainer = document.createElement('b');
        letterContainer.style.fontSize = '30px';
        letterContainer.style.height = "6rem";
        letterContainer.style.width = "6rem";
        letterContainer.style.border = "2px solid slategray"
        letterContainer.style.display = "flex";
        letterContainer.style.justifyContent = "center"
        letterContainer.style.alignItems = "center"
        letterContainer.style.backgroundColor = "lightgray"
        letterContainer.style.textAlign = 'center';
        letterContainer.textContent = playedLetters[i].toUpperCase()
        letterSquaresContainer.appendChild(letterContainer)
    }

    playedLettersContainer.appendChild(letterSquaresContainer)

    body.appendChild(playedLettersContainer)
}


//Genera la interfaz visual del juego
function renderInterface() {
    renderWordContainer();
    renderLifesContainer();


    //En caso de que se haya perdido/ganado: añadir mensaje de derrota/victoria
    if (lifes <= 0 || guessedWord === word) {
        renderUserFeedback();
        renderPlayAgainButton();
    } else { //En caso de que ninguna de las dos anteriores añadiriamos el formulario
        renderLetterForm();
    }

    if (playedLetters.length > 0) renderPlayedLettersContainer();
}

//Limpia y elimnina todo lo relativo a la interfaz del juego
function cleanInterface() {
    body.removeChild(wordContainer);
    body.removeChild(lifesContainer);
    if (letterFormContainer) body.removeChild(letterFormContainer);
    if (playAgainButton) body.removeChild(playAgainButton);
    if (userFeedbackContainer) body.removeChild(userFeedbackContainer);
    if (playedLettersContainer) body.removeChild(playedLettersContainer);
    wordContainer = undefined;
    lifesContainer = undefined;
    letterFormContainer = undefined;
    playAgainButton = undefined;
    userFeedbackContainer = undefined;
    playedLettersContainer = undefined;
}

//TODO añadir mensaje de "ese input no" cuando alguien intente pasar numeros o algo incorrecto


//Renderizamos la interfaz la primera vez que entra el usuario a la pagina
renderInterface()

//función nativa de js que "escucha" la interacción del usuario con la interfaz.
// En este caso detecta cuando alguien pulsa un botón submit. El event es el form donde este ese botón submit,
// por eso podemos traernos "letter", porque tenemos un input con un id "letter"
addEventListener('submit', function (event) {
    event.preventDefault();
    var letterValue = event.target.letter.value;
    playGame(letterValue)
    //event.stopImmediatePropagation() --> sirve para no llamar al mismo tipo de evento varias veces
})

var gotimg = document.createElement('img')
gotimg.src = 'https://i.tribune.com.pk/media/images/HD-wallpaper-game-of-thrones-the-iron-throne-prett1728982405-0/HD-wallpaper-game-of-thrones-the-iron-throne-prett1728982405-0.jpg'
gotimg.style.zIndex = -1;
gotimg.style.position = 'absolute';
gotimg.style.top = '0px'
gotimg.style.height = '100%'
gotimg.style.width = '100%'
body.appendChild(gotimg)

