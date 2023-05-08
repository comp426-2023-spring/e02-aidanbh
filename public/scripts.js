function goHome() {
    window.location.href = "index.html"
}

function goToRandom() {
    window.location.href = `random.html?game=${(document.getElementById('rps_radio').checked) ? 'rps' : 'rpsls'}`
}

function goToPlayComputer() {
    window.location.href = `play.html?game=${(document.getElementById('rps_radio').checked) ? 'rps' : 'rpsls'}&shot=${document.getElementById('shotSelector').value}`
}

function goToRules() {
    window.location.href = 'rules.html'
}

function rpsClick() {
    document.getElementById('lizard').hidden = true
    document.getElementById('spock').hidden = true
    document.getElementById('lizard').disabled = true
    document.getElementById('spock').disabled = true

    const value = document.getElementById('shotSelector').value
    console.log(value)
    if (value == 'lizard' || value == 'spock') {
        document.getElementById('shotSelector').value = 'rock'
    }
}

function rpslsClick() {
    document.getElementById('lizard').hidden = false
    document.getElementById('spock').hidden = false
    document.getElementById('lizard').disabled = false
    document.getElementById('spock').disabled = false
}

async function random() {
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game')

    // set header to match game
    document.getElementById('h2').innerHTML = (game == 'rps') ? "Rock, Paper, Scissors" : "Rock, Paper, Scissors, Lizard, Spock"

    // get API response
    fetch(`./app/${game}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // update text and image
            const text = data.player.charAt(0).toUpperCase() + data.player.slice(1)
            document.getElementById('h3').innerHTML = text

            document.getElementById('shotImage').src = `./img/${data.player}.jpg`
        }).catch((error) => console.error(error))

}

function playComputer() {
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game')
    const shot = urlParams.get('shot')

    // set header to match game
    document.getElementById('h2').innerHTML = (game == 'rps') ? "Rock, Paper, Scissors" : "Rock, Paper, Scissors, Lizard, Spock"


    console.log(`./app/${game}/play/${shot}`)
    // get API response
    fetch(`./app/${game}/play/${shot}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // display player's choice
            const player = data.player.charAt(0).toUpperCase() + data.player.slice(1)
            document.getElementById('h3_player').innerHTML = player

            document.getElementById('playerShotImage').src = `./img/${data.player}.jpg`

            // display computer's choice
            const computer = data.opponent.charAt(0).toUpperCase() + data.opponent.slice(1)
            document.getElementById('h3_computer').innerHTML = computer

            document.getElementById('computerShotImage').src = `./img/${data.computer}.jpg`

            // display result
            switch(data.result) {
                case 'win':
                    document.getElementById('h3_result').innerHTML = "You Win! 🥳"
                    break
                case 'lose':
                    document.getElementById('h3_result').innerHTML = "Computer Wins! 😏"
                    break
                case 'tie':
                    document.getElementById('h3_result').innerHTML = "It's a tie. 🤔"
                    break
            }

        }).catch((error) => console.error(error))

}