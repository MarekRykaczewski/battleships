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
p1Patrol.coordinates = p1.gameboard.placeShip(p1Patrol, 2 , "x")

let p1Submarine = new Ship([0,1,2])
p1Submarine.coordinates = p1.gameboard.placeShip(p1Submarine, 10 , "y")

// let p1Destroyer = new Ship([0,1,2])
// p1Patrol.coordinates = p1.gameboard.placeShip(p1Patrol, 2 , "x")

// let p1Battleship = new Ship([0,1,2,3])
// p1Patrol.coordinates = p1.gameboard.placeShip(p1Patrol, 2 , "x")

// let p1Carrier = new Ship([0,1,2,3,4])
// p1Patrol.coordinates = p1.gameboard.placeShip(p1Patrol, 2 , "x")

let p2Patrol = new Ship([0,1])
p2Patrol.coordinates = p2.gameboard.placeShip(p2Patrol, 5 , "y")

let p2Submarine = new Ship([0,1,2])
p2Submarine.coordinates = p2.gameboard.placeShip(p2Submarine, 50 , "x")

// let p2Destroyer = new Ship([0,1,2])
// let p2Battleship = new Ship([0,1,2,3])
// let p2Carrier = new Ship([,1,2,3,4])

main.renderShips(p1, "board-container")
main.renderShips(p2, "opponent-board-container")

main.addCellEventListeners(p1, p2, "opponent-board-container")
// main.addHitEventListners(p2, "opponent-board-container")