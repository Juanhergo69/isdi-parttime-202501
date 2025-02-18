var choices = ['Piedra', 'Papel', 'Tijera']; //Creamos variables a escoger por el usuario//
var cpuChoice;


function compareChoices(_choice) { //Creamos función para comparar la elección del usuario y la elección de la Cpu//  
    cpuChoice = choices[Math.floor(Math.random() * choices.length)] //Declaramos la variable de elección de la Cpu, con factor de aletoriedad//
    if (_choice === cpuChoice) { //Comparamos todas las posibilidades de juego//
        renderDrawResult()
    } else if (_choice === 'Piedra' && cpuChoice === 'Tijera') {
        renderWinResult()
    } else if (_choice === 'Piedra' && cpuChoice === 'Papel') {
        renderLoseResult()
    } else if (_choice === 'Papel' && cpuChoice === 'Piedra') {
        renderWinResult()
    } else if (_choice === 'Papel' && cpuChoice === 'Tijera') {
        renderLoseResult()
    } else if (_choice === 'Tijera' && cpuChoice === 'Papel') {
        renderWinResult()
    } else if (_choice === 'Tijera' && cpuChoice === 'Piedra') {
        renderLoseResult()
    }
}


var body = document.body; //Creamos el body//
body.style.display = 'flex'; //Le damos estilos//
body.style.flexDirection = 'column'; //Más estilos//
body.style.alignItems = 'center'; //Más estilos//
body.style.height = '500px'; //sino no llegaba a coger las boxes de los choices

var link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Miniver&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link) //he creado una typo nueva

var gameTitle = document.createElement('h1'); //Creamos título del juego//
gameTitle.textContent = 'Piedra, Papel o Tijera'; //Damos un nombre al título del juego//
gameTitle.style.textAlign = 'center'; //Le damos estilos//
gameTitle.style.position = 'absolute'; //Le damos posición//
gameTitle.style.fontFamily = "Miniver"; //aplico la typo nueva
gameTitle.style.fontSize = '40px'; //Le damos un tamaño de fuente al texto//
gameTitle.style.letterSpacing = "2px"; //Le damos un espaciado//
gameTitle.style.color = "black"; //Le damos un color al texto//
gameTitle.style.padding = '8px';
gameTitle.style.textShadow = '10px 10px 20px rgba(0, 0, 0, 0.5)';


var gameTitleBox = document.createElement('div');
gameTitleBox.style.width = '420px';
gameTitleBox.style.height = '120px';
gameTitleBox.style.backgroundColor = 'beige';
gameTitleBox.style.position = 'relative';
gameTitleBox.style.border = '1px solid black';
gameTitleBox.style.padding = '10px'; //defino el espacio del texto respecto al borde de la caja
gameTitleBox.style.textAlign = 'center';
gameTitleBox.style.marginTop = '10px';
gameTitleBox.style.boxShadow = '10px 10px 20px rgba(0, 0, 0, 0.5)'; //unas sombritas para la caja del titulo
gameTitleBox.style.borderRadius = '20px';

gameTitleBox.appendChild(gameTitle); //Añadimos el título del juego al div de la caja del titulo
body.appendChild(gameTitleBox); //añadimos caja con titulo al body

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

var backgroundImage = document.createElement('div'); //lo he puesto en un div porque era todo un div para el background pero no se si es la mejor manera
backgroundImage.style.backgroundImage = `url('https://wallpapercave.com/wp/wp3961352.png')`;
backgroundImage.style.position = 'fixed';
backgroundImage.style.backgroundPosition = 'center';
backgroundImage.style.backgroundSize = 'cover'; //hace que cubra el fondo ampliando la imagen
backgroundImage.style.height = '100vh'; //ajusta al total del alto
backgroundImage.style.width = '100vw'; //ajusta al total del ancho
backgroundImage.style.zIndex = '-1'; //pone el fondo detras del contenido
backgroundImage.style.top = '0'; //sino se quedaba un margen pequeño arriba
backgroundImage.style.filter = 'blur(2px)'; //le he añadido blur para que contrastarann mejor los elementos de delante y no tener que hacer cajitas o contornos

body.appendChild(backgroundImage); //añadimos la imagen de fondo al body

function renderUserChoice(_choice) { //La función renderiza en pantalla la selección hecha por el usuario//
    userChoiceBox.innerHTML = ''; //borra contenido anterior
    var renderUserChoice = document.createElement('div') //Se crea el mensaje//
    renderUserChoice.textContent = `Has elegido: ${_choice}` //Se añade lo que queremos que diga el mensaje//
    renderUserChoice.style.fontSize = '25px'; //Añadimos estilos//
    renderUserChoice.style.height = '100px'; //Añadimos estilos//
    renderUserChoice.style.width = '300px'; //Añadimos estilos//
    renderUserChoice.style.position = 'relative' //Añadimos estilos//
    renderUserChoice.style.left = '80px'; //Añadimos estilos//
    renderUserChoice.style.top = '10px'; //Añadimos estilos//
    renderUserChoice.style.fontFamily = 'Miniver';

    userChoiceBox.appendChild(renderUserChoice) //Añadimos al body el mensaje creado//
}

function renderCpuChoice(_cpuChoice) { //La función renderiza en pantalla la selección hecha por la CPU (no funciona)//
    cpuChoiceBox.innerHTML = ''; //borra contenido anterior//
    var renderCpuChoice = document.createElement('div') //Se crea el mensaje//
    renderCpuChoice.textContent = `La CPU ha elegido: ${_cpuChoice}` //Se añade lo que queremos que diga el mensaje//
    renderCpuChoice.style.fontSize = '25px'; //Añadimos estilos//
    renderCpuChoice.style.height = '100px'; //Añadimos estilos//
    renderCpuChoice.style.width = '300px'; //Añadimos estilos//
    renderCpuChoice.style.position = 'relative' //Añadimos estilos//
    renderCpuChoice.style.left = '38px'; //Añadimos estilos//
    renderCpuChoice.style.top = '10px'; //Añadimos estilos//
    renderCpuChoice.style.color = 'black';
    renderCpuChoice.style.fontFamily = 'Miniver';



    cpuChoiceBox.appendChild(renderCpuChoice) //Añadimos al body el mensaje creado//
}

function renderDrawResult() {
    resultBox.innerHTML = '';
    var renderDrawResult = document.createElement('div');
    renderDrawResult.textContent = 'Empate!';
    renderDrawResult.style.fontSize = '40px'; //Añadimos estilos//
    renderDrawResult.style.height = '100px'; //Añadimos estilos//
    renderDrawResult.style.width = '300px'; //Añadimos estilos//
    renderDrawResult.style.position = 'relative' //Añadimos estilos//
    renderDrawResult.style.left = '110px'; //Añadimos estilos//
    renderDrawResult.style.top = '-5px'; //Añadimos estilos//
    renderDrawResult.style.color = 'grey';
    renderDrawResult.style.fontFamily = 'Miniver';

    resultBox.appendChild(renderDrawResult)

}

function renderWinResult() {
    resultBox.innerHTML = '';
    var renderWinResult = document.createElement('div');
    renderWinResult.textContent = 'Ganas!';
    renderWinResult.style.fontSize = '40px'; //Añadimos estilos//
    renderWinResult.style.height = '100px'; //Añadimos estilos//
    renderWinResult.style.width = '300px'; //Añadimos estilos//
    renderWinResult.style.position = 'relative' //Añadimos estilos//
    renderWinResult.style.left = '115px'; //Añadimos estilos//
    renderWinResult.style.top = '-5px'; //Añadimos estilos//
    renderWinResult.style.color = 'green';
    renderWinResult.style.fontFamily = 'Miniver';

    resultBox.appendChild(renderWinResult)

}

function renderLoseResult() {
    resultBox.innerHTML = '';
    var renderLoseResult = document.createElement('div');
    renderLoseResult.textContent = 'Pierdes!';
    renderLoseResult.style.fontSize = '40px'; //Añadimos estilos//
    renderLoseResult.style.height = '100px'; //Añadimos estilos//
    renderLoseResult.style.width = '300px'; //Añadimos estilos//
    renderLoseResult.style.position = 'relative' //Añadimos estilos//
    renderLoseResult.style.left = '110px'; //Añadimos estilos//
    renderLoseResult.style.top = '-5px'; //Añadimos estilos//
    renderLoseResult.style.color = 'red';
    renderLoseResult.style.fontFamily = 'Miniver';

    resultBox.appendChild(renderLoseResult)

}

var userChoiceBox = document.createElement('div');
userChoiceBox.style.width = '350px';
userChoiceBox.style.height = '50px';
userChoiceBox.style.zIndex = '-1';
userChoiceBox.style.backgroundColor = 'beige';
userChoiceBox.style.padding = '8px';
userChoiceBox.style.borderColor = 'black';
userChoiceBox.style.border = '1px solid black';
userChoiceBox.style.borderRadius = '20px'; //redondeo los bordes de la caja
userChoiceBox.style.boxShadow = '10px 10px 20px rgba(0, 0, 0, 0.5)'; //le añado sombra a la caja
userChoiceBox.style.position = 'absolute';
userChoiceBox.style.left = '100px';
userChoiceBox.style.top = '180px';

var cpuChoiceBox = document.createElement('div');
cpuChoiceBox.style.width = '350px';
cpuChoiceBox.style.height = '50px';
cpuChoiceBox.style.zIndex = '-1';
cpuChoiceBox.style.backgroundColor = 'beige';
cpuChoiceBox.style.padding = '8px';
cpuChoiceBox.style.borderColor = 'black';
cpuChoiceBox.style.border = '1px solid black';
cpuChoiceBox.style.borderRadius = '20px'; //redondeo los bordes de la caja
cpuChoiceBox.style.boxShadow = '10px 10px 20px rgba(0, 0, 0, 0.5)'; //le añado sombra a la caja
cpuChoiceBox.style.position = 'absolute';
cpuChoiceBox.style.right = '50px';
cpuChoiceBox.style.top = '180px';

var resultBox = document.createElement('div');
resultBox.style.width = '350px';
resultBox.style.height = '50px';
resultBox.style.zIndex = '-1';
resultBox.style.backgroundColor = 'beige';
resultBox.style.padding = '8px';
resultBox.style.borderColor = 'black';
resultBox.style.border = '1px solid black';
resultBox.style.borderRadius = '20px'; //redondeo los bordes de la caja
resultBox.style.boxShadow = '10px 10px 20px rgba(0, 0, 0, 0.5)'; //le añado sombra a la caja
resultBox.style.position = 'absolute';
resultBox.style.left = '774px';
resultBox.style.top = '250px';

body.appendChild(cpuChoiceBox);
body.appendChild(userChoiceBox);
body.appendChild(resultBox);

var buttonContainer = document.createElement('div') //Creamos contenedor de botones para selección del jugador//

function choiceButtonContainer() { //La función genera el contenedor de botones y las posibles elecciones del jugador. Esto variará si cambiamos los elementos del array choices//
    buttonContainer.style.display = 'flex'; //Le damos estilos al contenedor de botones//
    buttonContainer.style.width = '30%'; //Más estilos//
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
    button.style.fontSize = '25px'; //Damos un un tamaño de fuente determinado al botón//
    button.style.height = '50px'; //Damos un altura determinada al botón//
    button.style.width = '600px'; //Damos una anchura determinada al botón//
    button.style.borderColor = 'black' //Damos un color al borde del botón//
    button.style.borderRadius = '20px'
    button.style.boxShadow = '10px 10px 20px rgba(0, 0, 0, 0.5)';
    button.style.backgroundColor = 'beige';
    button.style.fontFamily = 'Miniver';

    button.addEventListener('click', function () { //El addEventListener permite ejecutar algo mientras se produzca algo//
        compareChoices(_choice) //En este caso, cuando se hace click sobre el botón de selección, se ejecuta la función de comparar la eleccción del jugador y la cpu//
        renderUserChoice(_choice) //En este caso, cuando se hace click sobre el botón de selección, se ejecuta la función de renderizado de la selección del jugador//
        renderCpuChoice(cpuChoice) //En este caso, cuando se hace click sobre el botón de selección, se ejecuta la función de renderizado de la selección de la CPU//
    })
    buttonContainer.appendChild(button); //Añadimos el botón al contenedor de botones//
}

choiceButtonContainer() //Se ejecuta la función para generar el contenedor de botones y las posibles elecciones del jugador.





