function guessMyNumber() {
    var number = 4
    var guess = prompt('what is the number im thinking of?')
    if (number === MyNumber(guess)) {
        alert('Congratulations!')
        console.log('Congratulations!')
    } else {
        alert('You loose, try again')
        console.log('You loose, try again')
    }
}

var startGAme = confirm('Do you want play a game?')
if (startGame) {
    guessmyNumber()
} else {
    alert('Bye')
    console.log('Bye')
}
