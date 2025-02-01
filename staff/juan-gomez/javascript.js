var winNumber = Math.floor(Math.random() * 10) + 1
while (parseInt(playerChoice) != winNumber && question != false) {
    var question = confirm('Do you want play a game?')
    if (question === true) {
        alert('Start game')
        var playerChoice = parseInt(prompt('Choice your number'))
        if (parseInt(playerChoice) === winNumber) {
            alert('Congratulations, you win!')
        } else if (parseInt(playerChoice) < winNumber && parseInt(playerChoice) === winNumber - 2) {
            alert('You loose, your number is a little bit small, you are very close to win')
        } else if (parseInt(playerChoice) < winNumber && parseInt(playerChoice) === winNumber - 5) {
            alert('You loose, your number is small, you are close to win')
        } else if (parseInt(playerChoice) < winNumber && parseInt(playerChoice) <= winNumber - 6) {
            alert('You loose, your number is so small, you are far to win')
        } else if (parseInt(playerChoice) > winNumber && parseInt(playerChoice) === winNumber + 2) {
            alert('You loose, your number is a little bit big, try with a smaller number, you are very close to win')
        } else if (parseInt(playerChoice) > winNumber && parseInt(playerChoice) === winNumber + 5) {
            alert('You loose, your number is big, you are close tu win')
        } else if (parseInt(playerChoice) > winNumber && parseInt(playerChoice) >= winNumber + 6) {
            alert('You loose, your number is so big, you are far to win')
        } else if (playerChoice != Number) {
            alert('Are you sure you are introducings numbers???')
        }
    } else {
        alert('Bye Bye')
    }
}




