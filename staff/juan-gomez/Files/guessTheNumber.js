var winNumber = Math.floor(Math.random() * 10) + 1
var failedAttemps = 0
var question = confirm('Do you want play a game?')
if (question === true) {
    alert('Welcome to "Guess the Number"')
} else {
    alert('Bye, Bye')
}
while (Number(playerChoice) !== winNumber && question !== false && failedAttemps < 3) {
    var playerChoice = Number(prompt('Choice your number'))
    if (Number(playerChoice) === winNumber) {
        alert('Congratulations, you win!')
    } else if (Number(playerChoice) < winNumber && Number(playerChoice) === winNumber - 2 || Number(playerChoice) === winNumber - 1) {
        alert('You loose, your number is a little bit small, you are very close to win')
    } else if (Number(playerChoice) < winNumber && Number(playerChoice) === winNumber - 5 || Number(playerChoice) === winNumber - 4 || Number(playerChoice) === winNumber - 3) {
        alert('You loose, your number is small, you are close to win')
    } else if (Number(playerChoice) < winNumber && Number(playerChoice) <= winNumber - 6) {
        alert('You loose, your number is so small, you are far to win')
    } else if (Number(playerChoice) > winNumber && Number(playerChoice) === winNumber + 2 || Number(playerChoice) === winNumber + 1) {
        alert('You loose, your number is a little bit big, you are very close to win')
    } else if (Number(playerChoice) > winNumber && Number(playerChoice) === winNumber + 5 || Number(playerChoice) === winNumber + 4 || Number(playerChoice) === winNumber + 3) {
        alert('You loose, your number is big, you are close tu win')
    } else if (Number(playerChoice) > winNumber && Number(playerChoice) >= winNumber + 6) {
        alert('You loose, your number is so big, you are far to win')
    } else if (Number(playerChoice) !== Number) {
        alert('Are you sure you are introducings numbers???')
    } if (Number(playerChoice) !== winNumber) {
        failedAttemps = failedAttemps + 1
    } else {
        alert('failedAttemps:' + failedAttemps)
    } if (failedAttemps === 3) {
        alert('You loose the game, try again if you dare')
    }
}

/*Cambios realizados en el código:
- Se ha reeestructurado el código para huir del Hadouken de Ryu XD.
- Se han sacado varios parámetros del bucle while, con idea de simplificar la partida.
- Se ha añadido (aparentemente, de forma exitosa), un condicional que indica, en el caso de fallar tres veces, que se acaba definitivamente la partida.*/

/*Cambios pendientes de realizar en el código:
- Añadir una función que indique que, para ganar el juego, se deban realizar tres aciertos de forma no consecutiva
- Englobar todo este código en una función, todavía no me aclaro bien con ello (quizá sea super simple)*/
