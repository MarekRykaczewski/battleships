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

main.renderBoard()
main.renderOpponentBoard()