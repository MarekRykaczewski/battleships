const player = require("./player")
let Player = player.Player
const gameboard = require("./gameboard")
let Gameboard = gameboard.Gameboard
const ship = require("./ship")
let Ship = ship.Ship
const game = require("./game")
let Game = game.Game

const main = new Game()
let p1 = new Player("human")
let p2 = new Player("computer")

main.renderBoard("board-container")
main.renderBoard("opponent-board-container")
// main.renderOpponentBoard()

let p1Patrol = new Ship([0,1])
let p1Submarine = new Ship([0,1,2])
let p1Destroyer = new Ship([0,1,2])
let p1Battleship = new Ship([0,1,2,3])
let p1Carrier = new Ship([0,1,2,3,4])

// p1.ships.push(p1Patrol, p1Submarine, p1Destroyer, p1Battleship, p1Carrier)
p1.gameboard.ships.push(p1Patrol)

let p2Patrol = new Ship([0,10])
let p2Submarine = new Ship([0,1,2])
let p2Destroyer = new Ship([0,1,2])
let p2Battleship = new Ship([0,1,2,3])
let p2Carrier = new Ship([0,1,2,3,4])

// p2.ships.push(p2Patrol, p2Submarine, p2Destroyer, p2Battleship, p2Carrier)
p2.gameboard.ships.push(p2Patrol)

console.log(p1.gameboard.ships[0].coordinates)

main.renderShips(p1)
main.renderShipsOpp(p2)

console.log(p1.gameboard.ships)