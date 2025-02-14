var choices = ['Piedra', 'Papel', 'Tijera']; //Creamos variables a escoger por el usuario//

function compareChoices(_choice) { //Creamos función para comparar la elección del usuario y la elección de la Cpu//  
    var cpuChoices = choices[Math.floor(Math.random() * choices.length)] //Declaramos la variable de elección de la Cpu, con factor de aletoriedad//
    if (_choice === cpuChoices) { //Comparamos todas las posibilidades de juego//
        alert('Empate!')
    } else if (_choice === 'Piedra' && cpuChoices === 'Tijera') {
        alert('Ganas!')
    } else if (_choice === 'Piedra' && cpuChoices === 'Papel') {
        alert('Pierdes!')
    } else if (_choice === 'Papel' && cpuChoices === 'Piedra') {
        alert('Ganas!')
    } else if (_choice === 'Papel' && cpuChoices === 'Tijera') {
        alert('Pierdes!')
    } else if (_choice === 'Tijera' && cpuChoices === 'Papel') {
        alert('Ganas!')
    } else if (_choice === 'Tijera' && cpuChoices === 'Piedra') {
        alert('Pierdes!')
    }
}


var body = document.body; //Creamos el body//
body.style.display = 'flex'; //Le damos estilos//
body.style.flexDirection = 'column'; //Más estilos//
body.style.alignItems = 'center'; //Más estilos//

var gameTitle = document.createElement('h1'); //Creamos título del juego//
gameTitle.textContent = 'Piedra, Papel o Tijera'; //Damos un nombre al título del juego//
gameTitle.style.textAlign = 'center'; //Le damos estilos//

body.appendChild(gameTitle); //Añadimos el título del juego al body//

var tijeraimg = document.createElement('img') //Se añade imagen para tijera//
tijeraimg.src = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/123.png' //Ruta de la imagen//
tijeraimg.style.position = 'absolute'; //Añadimos estilos//
tijeraimg.style.marginTop = '450px'; //Añadimos estilos//
tijeraimg.style.marginRight = '-1200px'; //Añadimos estilos//

body.appendChild(tijeraimg) //Añadimos al body la imagen tijera//

var piedraimg = document.createElement('img') //Se añade imagen para piedra//
piedraimg.src = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/076.png' //Ruta de la imagen//
piedraimg.style.position = 'absolute'; //Añadimos estilos//
piedraimg.style.marginTop = '450px'; //Añadimos estilos//
piedraimg.style.marginRight = '1300px'; //Añadimos estilos//

body.appendChild(piedraimg) //Añadimos al body la imagen papel//

var papelimg = document.createElement('img') //Se añade imagen para papel//
papelimg.src = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/798.png' //Ruta de la imagen//
papelimg.style.position = 'absolute'; //Añadimos estilos//
papelimg.style.marginTop = '450px'; //Añadimos estilos//
papelimg.style.marginRight = '0px'; //Añadimos estilos//

body.appendChild(papelimg) //Añadimos al body la imagen papel//


function renderUserChoice(_choice) { //La función renderiza en pantalla la selección hecha por el usuario//
    var userChoice = document.createElement('div') //Se crea el mensaje//
    userChoice.textContent = `Has elegido: ${_choice}` //Se añade lo que queremos que diga el mensaje//
    userChoice.style.fontSize = '25px'; //Añadimos estilos//
    userChoice.style.height = '100px'; //Añadimos estilos//
    userChoice.style.width = '300px'; //Añadimos estilos//
    userChoice.style.position = 'absolute' //Añadimos estilos//
    userChoice.style.left = '200px'; //Añadimos estilos//
    userChoice.style.top = '200px'; //Añadimos estilos//

    body.appendChild(userChoice) //Añadimos al body el mensaje creado//
}

function renderCpuChoice(_cpuChoice) { //La función renderiza en pantalla la selección hecha por la CPU//
    var cpuChoice = document.createElement('div') //Se crea el mensaje//
    cpuChoice.textContent = `La CPU ha elegido: ${_cpuChoice}` //Se añade lo que queremos que diga el mensaje//
    cpuChoice.style.fontSize = '25px'; //Añadimos estilos//
    cpuChoice.style.height = '100px'; //Añadimos estilos//
    cpuChoice.style.width = '300px'; //Añadimos estilos//
    cpuChoice.style.position = 'absolute' //Añadimos estilos//
    cpuChoice.style.left = '1500px'; //Añadimos estilos//
    cpuChoice.style.top = '200px'; //Añadimos estilos//

    body.appendChild(cpuChoice) //Añadimos al body el mensaje creado//
}


var buttonContainer = document.createElement('div') //Creamos contenedor de botones para selección del jugador//

function choiceButtonContainer() { //La función genera el contenedor de botones y las posibles elecciones del jugador. Esto variará si cambiamos los elementos del array choices//
    buttonContainer.style.display = 'flex'; //Le damos estilos al contenedor de botones//
    buttonContainer.style.width = '100%'; //Más estilos//
    buttonContainer.style.justifyContent = 'center'; //Más estilos//
    buttonContainer.style.gap = '2rem'; //Más estilos//
    buttonContainer.style.position = 'absolute'; //Más estilos//
    buttonContainer.style.top = '400px'; //Más estilos//

    for (var i = 0; i < choices.length; i++) { //El for itera sobre los elementos del array choices//
        generateChoiceButton(choices[i]) //Y a continuación ejecuta la función para generar los botones de selección en pantalla//
    }
    body.appendChild(buttonContainer) //Añadimos el contenedor de botones al body//

}

function generateChoiceButton(_choice) { //La función genera el botón de selección del jugador//
    var button = document.createElement('button'); //Creamos el botón de selección//
    button.textContent = _choice; //Indicamos que el texto que incluirá serán las elecciones englobadas en el array choices//
    button.style.fontSize = '25px';
    button.style.height = '50px'; //Damos un altura determinada al botón//
    button.style.width = '600px'; //Damos una anchura determinada al botón//
    button.style.borderColor = 'limegreen' //Damos un color al borde del botón//

    button.addEventListener('click', function () { //El addEventListener permite ejecutar algo mientras se produzca algo//
        compareChoices(_choice) //En este caso, cuando se hace click sobre el botón de selección, se ejecuta la función de comparar la eleccción del jugador y la cpu//
        renderUserChoice(_choice) //En este caso, cuando se hace click sobre el botón de selección, se ejecuta la función de renderizado de la selección del jugador//
        renderCpuChoice(_choice) //En este caso, cuando se hace click sobre el botón de selección, se ejecuta la función de renderizado de la selección de la CPU//
    })
    buttonContainer.appendChild(button); //Añadimos el botón al contenedor de botones//
}

choiceButtonContainer() //Se ejecuta la función para generar el contenedor de botones y las posibles elecciones del jugador.





