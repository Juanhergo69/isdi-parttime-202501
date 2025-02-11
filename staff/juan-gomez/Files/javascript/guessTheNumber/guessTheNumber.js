var winNumber = Math.floor(Math.random() * 10) + 1
var failedAttemps = 0
var question = confirm('Do you want play a game?')
var playerChoice

if (question) {
    alert('Welcome to "Guess the Number"')
} else {
    alert('Bye, Bye')
}

while (Number(playerChoice) !== winNumber && question !== false && failedAttemps < 3) {
    playerChoice = (prompt('Choice your number'))
    if (playerChoice === null) {
        alert('You close the game, come back anytime :D')
        break
    }
    if (isNaN(playerChoice) || playerChoice.trim() === '') {
        failedAttemps++
        alert('Are you sure you are introducings numbers???')
    } else {
        if (Number(playerChoice) === winNumber) {
            alert('Congratulations, you win! Total failed attemps:' + failedAttemps)
        } else if (Number(playerChoice) === winNumber - 1 || Number(playerChoice) === winNumber - 2) {
            alert('You lose, your number is a little bit small, you are very close to win')
        } else if (Number(playerChoice) === winNumber - 3 || Number(playerChoice) === winNumber - 4
            || Number(playerChoice) === winNumber - 5) {
            alert('You lose, your number is small, you are close to win')
        } else if (Number(playerChoice) <= winNumber - 6) {
            alert('You lose, your number is so small, you are far to win')
        } else if (Number(playerChoice) === winNumber + 1
            || Number(playerChoice) === + 2) {
            alert('You lose, your number is a little bit big, you are very close to win')
        } else if (Number(playerChoice) === winNumber + 3 || Number(playerChoice) === + 4
            || Number(playerChoice) === + 5) {
            alert('You lose, your number is big, you are close tu win')
        } else if (Number(playerChoice) >= winNumber + 6) {
            alert('You lose, your number is so big, you are far to win')
        }
        failedAttemps++
    }
    if (failedAttemps === 3) {
        alert('You lost the game, try again if you dare. Total failed attemps:' + failedAttemps)
    }
}






