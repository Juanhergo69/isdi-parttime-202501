var winNumber = Math.floor(Math.random() * 10) + 1
var failedAttemps = 0
var question = confirm('Do you want play a game?')

if (question === true) {
    alert('Welcome to "Guess the Number"')
} else {
    alert('Bye, Bye')
}

while (Number(playerChoice) !== winNumber && question !== false && failedAttemps < 3) {
    var playerChoice = (prompt('Choice your number'))
    if (playerChoice === null) {
        alert('You close the game, come back anytime :D')
        break
    }
    if (isNaN(Number(playerChoice))) {
        alert('Are you sure you are introducings numbers???')
    } else {
        if (Number(playerChoice) === winNumber) {
            alert('Congratulations, you win!')
        } else if ((Number(playerChoice) < winNumber) && (Number(playerChoice) === winNumber - 2
            || Number(playerChoice) === winNumber - 1)) {
            alert('You loose, your number is a little bit small, you are very close to win')
        } else if ((Number(playerChoice) < winNumber) && (Number(playerChoice) === winNumber - 5
            || Number(playerChoice) === winNumber - 4 || Number(playerChoice) === winNumber - 3)) {
            alert('You loose, your number is small, you are close to win')
        } else if (Number(playerChoice) < winNumber && Number(playerChoice) <= winNumber - 6) {
            alert('You loose, your number is so small, you are far to win')
        } else if ((Number(playerChoice) > winNumber) && (Number(playerChoice) === winNumber + 2 ||
            Number(playerChoice) === winNumber + 1)) {
            alert('You loose, your number is a little bit big, you are very close to win')
        } else if ((Number(playerChoice) > winNumber) && (Number(playerChoice) === winNumber + 5 ||
            Number(playerChoice) === winNumber + 4 || Number(playerChoice)) === winNumber + 3) {
            alert('You loose, your number is big, you are close tu win')
        } else if (Number(playerChoice) > winNumber && Number(playerChoice) >= winNumber + 6) {
            alert('You loose, your number is so big, you are far to win')
        }
    }
    if (isNaN(Number(playerChoice)) || Number(playerChoice) !== winNumber) {
        failedAttemps++
    } if (failedAttemps === 3) {
        alert('You loose the game, try again if you dare')
    }
    if (Number(playerChoice) === winNumber || failedAttemps === 3) {
        alert("failedAttemps:" + failedAttemps)
    }
}






/*Tengo dos errores que detecto:
- Cuando el jugador clica en aceptar sin haber ingresado ningún número, lo cuenta como error.
- Cuando se gana la partida, no cuenta los errores cometidos
*/

