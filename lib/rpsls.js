// import rules file
import outcomes from "./rules.js"

// export wrapper functions
export function rps(choice) {
  const plays = ['rock', 'paper', 'scissors']
  return game(plays, choice)
}

export function rpsls(choice) {
  const plays = ['rock', 'paper', 'scissors', 'lizard', 'spock']
  return game (plays, choice)
}

// game logic function

function randomPlay(plays) {
  var r = Math.random() * plays.length
  return plays[~~r]
}

function game(plays, choice) {
  // if no choice, just return a random play
  if (!choice) return {player: randomPlay(plays)} 

  // if choice given, check if valid
  choice = choice.toLowerCase()
  if (!plays.includes(choice)) throw new Error("Invalid play.")
  const op = randomPlay(plays)  

  // return object
  return {player: choice, opponent: op, result: outcomes[choice][op]}
}
