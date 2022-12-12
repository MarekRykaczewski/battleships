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

let p1Patrol = new Ship([0,1])
let p1Submarine = new Ship([5,6,7])
let p1Destroyer = new Ship([31,32,33])
let p1Battleship = new Ship([51,61,71,81])
let p1Carrier = new Ship([72,73,74,75,76])

p1.gameboard.ships.push(p1Patrol, p1Submarine, p1Destroyer, p1Battleship, p1Carrier)

let p2Patrol = new Ship([0,10])
let p2Submarine = new Ship([22,23,24])
let p2Destroyer = new Ship([33,43,53])
let p2Battleship = new Ship([13,14,15,16])
let p2Carrier = new Ship([75,76,77,78,79])

p2.gameboard.ships.push(p2Patrol, p2Submarine, p1Destroyer, p2Battleship, p2Carrier )

main.renderShips(p1, "board-container")
main.renderShips(p2, "opponent-board-container")