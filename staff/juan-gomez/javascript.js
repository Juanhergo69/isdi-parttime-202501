//Crear una variable con el número ganador
//Crear un bucle que recorra el código, con el límite establecido en que si se acierta el número, o el jugador no quiere jugar, el bucle se detiene. **Undefined en consola**
//Crear una variable que sirva como pregunta para que el jugador decida (o no) jugar. Utilizar comando confirm para ello.
//Crear un condicional en el que, si la decisión del jugador arroja True, el juego incia. 
//Crear un mensaje de despedida si la condicional anterior arroja False.
//Crear una variable para la elección del número que utiliará el jugador. En este caso, al tratarse de un número, se utilizara el comando prompt.
//Crear un condicional, donde habrá un mensaje de felicitación si el jugador acierta el número ganador
//Continuar generando condicionales, en base a los siguientes parámetros: "se ha quedado por debajo del número ganador" y "se ha quedado por encima del número ganador"
// Definir comparativa número de selección jugador y número ganador
// Definir variables por diferencia al alta o a la baja
// Crear un bulce que recorra el código, con el límite que si se acierta el número, o el usuario no quiere jugar, se detiene

var winNumber = 60

while (playerChoice != winNumber && question != true) {
    var question = confirm('Do you want play a game?')
    if (question === true) {
        alert('Start game')
    } else {
        alert('Bye Bye')
    }
    var playerChoice = prompt('Choice your number')
    if (playerChoice === winNumber.toString()) {
        alert('Congratulations, you win!')
    } if (playerChoice < winNumber.toString() && playerChoice === winNumber.toString() - 2) {
        alert('You loose, the number is greater, just a little bit more')
    } if (playerChoice < winNumber.toString() && playerChoice === winNumber.toString() - 5) {
        alert('You loose, the number is greater, too cold')
    } if (playerChoice < winNumber.toString() && playerChoice === winNumber.toString() + 2) {
        alert('You loose, the number is lower, just a little bit less')
    } if (playerChoice < winNumber.toString() && playerChoice === winNumber.toString() + 5) {
        alert('You loose, the number is lower, to hot')
    }
}




