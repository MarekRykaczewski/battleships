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

let p2Patrol = new Ship([0,1])
p2Patrol.coordinates = p2.gameboard.placeShip(p2Patrol, 5 , "y")

let p2Submarine = new Ship([0,1,2])
p2Submarine.coordinates = p2.gameboard.placeShip(p2Submarine, 50 , "x")

main.renderShips(p1, "board-container")
main.renderShips(p2, "opponent-board-container")

main.addEnemyCellEventListeners(p1, p2, "opponent-board-container")