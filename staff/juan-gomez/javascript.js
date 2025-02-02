var winNumber = Math.floor(Math.random() * 10) + 1
var failedAttemps = 0
while (parseInt(playerChoice) != winNumber && question != false) {
    var question = confirm('Do you want play a game?')
    if (question === true) {
        alert('Welcome to "Guess the Number"')
        var playerChoice = parseInt(prompt('Choice your number'))
        if (parseInt(playerChoice) === winNumber) {
            alert('Congratulations, you win!')
        } else if (parseInt(playerChoice) < winNumber && parseInt(playerChoice) === winNumber - 2 || parseInt(playerChoice) === winNumber - 1) {
            alert('You loose, your number is a little bit small, you are very close to win')
        } else if (parseInt(playerChoice) < winNumber && parseInt(playerChoice) === winNumber - 5 || parseInt(playerChoice) === winNumber - 4 || parseInt(playerChoice) === winNumber - 3) {
            alert('You loose, your number is small, you are close to win')
        } else if (parseInt(playerChoice) < winNumber && parseInt(playerChoice) <= winNumber - 6) {
            alert('You loose, your number is so small, you are far to win')
        } else if (parseInt(playerChoice) > winNumber && parseInt(playerChoice) === winNumber + 2 || parseInt(playerChoice) === winNumber + 1) {
            alert('You loose, your number is a little bit big, you are very close to win')
        } else if (parseInt(playerChoice) > winNumber && parseInt(playerChoice) === winNumber + 5 || parseInt(playerChoice) === winNumber + 4 || parseInt(playerChoice) === winNumber + 3) {
            alert('You loose, your number is big, you are close tu win')
        } else if (parseInt(playerChoice) > winNumber && parseInt(playerChoice) >= winNumber + 6) {
            alert('You loose, your number is so big, you are far to win')
        } else if (playerChoice != Number) {
            alert('Are you sure you are introducings numbers???')
        }
    } else {
        alert('Bye Bye')
    } if (parseInt(playerChoice) != winNumber) {
        failedAttemps = failedAttemps + 1
    } else {
        alert('failedAttemps:' + failedAttemps)
    }
}

/*Sobre este código querría añadir la función que, para ganar completamente el juego, se deba acertar el número tres veces, no necesariamente consecutivas.
La idea sería manejar tres rondas ganadoras, y en cada ronda ganadora, lanzar un mensaje diferente, hasta el tercero, que diría que has completado totalmente el juego*/
/*Sobre este código querría añadir la función que, para para perder completamente el juego, se deban cometer tres errores consecutivos. Si se gana una ronda con algún error previo,
el contador de errores se reinciaria a 0.
La idea sería manejar tres rondas perdedoras, y en cada ronda perdedora, lanzar un mensaje diferente, hasta el tercer fallo, que diría que has perdido la partida*/
//Comentar con Flors estos dos puntos en la clase del Lunes.



