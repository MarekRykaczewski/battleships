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

main.addDirectionBtn()

let rdyBtn = document.getElementById("rdy-btn")

function ready() {
    main.renderBoard("opponent-board-container")
    main.renderShips(p2, "opponent-board-container")
    main.addEnemyCellEventListeners(p1, p2, "opponent-board-container")
}

rdyBtn.onclick = function() {
    if (p1Ships.length === 0) {
        ready()
    } else {
        alert("Place all your ships first!")
    }
}

let p1Ships = []
let p1Patrol = new Ship([0,1])
let p1Submarine = new Ship([0,1,2])
p1Ships.push(p1Patrol, p1Submarine)

main.renderBoard("board-container")
main.addPlacementEventListeners(p1, "board-container", p1Ships)

function randomCoordinate() {
    return Math.floor(Math.random() * 100)
}

function randomDirection() {
    let dir = Math.floor(Math.random() * 2)
    if (dir === 1) {
        return "x"
    } else {
        return "y"
    }
}

let p2Patrol = new Ship([0,1])
p2Patrol.coordinates = p2.gameboard.placeShip(p2Patrol, randomCoordinate(), randomDirection())

let p2Submarine = new Ship([0,1,2])
p2Submarine.coordinates = p2.gameboard.placeShip(p2Submarine, randomCoordinate(), randomDirection())
