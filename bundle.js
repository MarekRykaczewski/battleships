(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const player = require("./player")
let Player = player.Player
const gameboard = require("./gameboard")
let Gameboard = gameboard.Gameboard
const ship = require("./ship")
let Ship = ship.Ship

class Game {
    constructor () {
        
    }

    renderBoard(boardId) {
        for (let i = 0; i < 100; i++) {
            let temp = document.createElement('div');
            temp.className = "cell"
            temp.dataset.coordinate = i
            let boardContainer = document.getElementById(boardId)
            boardContainer.appendChild(temp);
        }
    }

    renderShips(player, boardId) {
        let cells = document.getElementById(boardId).getElementsByClassName('cell')
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < player.gameboard.ships.length; j++) {
                let searchArray = player.gameboard.ships[j].coordinates
                let searchCell = parseInt(cells.item(i).dataset.coordinate)
                if (searchArray.includes(searchCell)) {
                    cells.item(i).classList.add("occupied")
                }
            }
        }
    }

    getDirection() {
        let btn = document.getElementById("dir-btn")
        return btn.innerHTML
    }

    addDirectionBtn() {
        let playerInterface = document.getElementById("player-interface")

        let btn = document.createElement("button")
        btn.id = "dir-btn"
        btn.innerHTML = "x"
        playerInterface.append(btn)
        
        function toggleDirectionBtn() {
            if (btn.innerHTML === "x") {
                btn.innerHTML = "y"
            } else {
                btn.innerHTML = "x"
            }
        }
        
        btn.onclick = function() {
            toggleDirectionBtn()
        }        
    }

    addPlacementEventListeners(player, boardId, ships) {
        let self = this
        let cells = document.getElementById(boardId).getElementsByClassName('cell')
        for (let i = 0; i < 100; i++) {
            cells.item(i).addEventListener("click", function() {
                if (ships.length === 0) {
                    alert("You have placed all your ships!")
                    return false
                }
                let coordinate = parseInt(cells.item(i).dataset.coordinate)
                ships[0].coordinates = player.gameboard.placeShip(ships[0], coordinate, self.getDirection())
                ships.shift()
                self.renderShips(player, boardId)
            })
        }
    }

    addEnemyCellEventListeners(playerOne, playerTwo, boardId) {
        let self = this
        let cells = document.getElementById(boardId).getElementsByClassName('cell')
        for (let i = 0; i < 100; i++) {
            let coordinate = cells.item(i).dataset.coordinate
            cells.item(i).addEventListener("click", function() {
                if (playerTwo.gameboard.opponentBoard()[coordinate] == "empty") {
                    playerOne.shoot(coordinate, playerTwo.gameboard)
                    self.updateCell(playerTwo, coordinate, boardId)
                    if (playerTwo.gameboard.checkSunk()) {
                        alert("Player 1 has won!")
                        window.location.reload()
                    }
                } else {
                    return false
                }
                if (playerOne.gameboard.opponentBoard()[coordinate] == "empty") {
                    let computerShot = playerTwo.getRandomShot()
                    playerTwo.shoot(computerShot, playerOne.gameboard)
                    self.updateCell(playerOne, computerShot, "board-container")
                    if (playerOne.gameboard.checkSunk()) {
                        alert("Player 2 has won!")
                        window.location.reload()
                    }
                } else {
                    return false
                }
            })
        }
    }

    updateCell(player, coordinate, boardId) {
        let cells = document.getElementById(boardId).getElementsByClassName('cell')
        if (player.gameboard.grid[coordinate].hasShip) {
            let temp = document.createElement('div');
            temp.className = "hit"
            cells.item(coordinate).append(temp)
        } else {
            let temp = document.createElement('div')
            temp.className = "miss"
            cells.item(coordinate).append(temp)
        }
    }
}

module.exports = {Game: Game} 
},{"./gameboard":2,"./player":4,"./ship":5}],2:[function(require,module,exports){
const ship = require("./ship")

class Gameboard {
    constructor() {
        this.grid = []
        this.init()
        this.ships = []
        this.rows = 
    [
        [0,1,2,3,4,5,6,7,8,9],
        [10,11,12,13,14,15,16,17,18,19],
        [20,21,22,23,24,25,26,27,28,29],
        [30,31,32,33,34,35,36,37,38,39],
        [40,41,42,43,44,45,46,47,48,49],
        [50,51,52,53,54,55,56,57,58,59],
        [60,61,62,63,64,65,66,67,68,69],
        [70,71,72,73,74,75,76,77,78,79],
        [80,81,82,83,84,85,86,87,88,89],
        [90,91,92,93,94,95,96,97,98,99]
                                        ]
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.grid.push({hasShip: false, isShot: false})
        }
    }

    findRow(coordinate) {
        for(let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.rows[i].length; j++) {
                if (this.rows[j].includes(coordinate)) {
                    return this.rows[j]
                }
            }
        }
    }

    placeShip(ship, coordinate, axis) {
        let locationArray = []
        let row = this.findRow(coordinate)
        if (axis === 'x') {
            for (let i = 0; i < ship.coordinates.length; i++) {
                if (i + coordinate > row[row.length - 1]) {
                   return false
                }
                locationArray.push(coordinate + i)
            }
        } else if (axis === 'y') {
            for (let i = 0; i < ship.coordinates.length; i++) {
                if (coordinate + (i * 10) > 99) {
                    return false
                }
                locationArray.push(coordinate + (i * 10))
            }
        }
        for (let i = 0; i < locationArray.length; i++) {
            this.grid[locationArray[i]].hasShip = true
        }
        this.ships.push(ship)
        return locationArray
    }

    receiveAttack(coordinate) {
        let corInt = parseInt(coordinate) 
        this.grid[corInt].isShot = true
        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].coordinates.includes(corInt)) {
                this.ships[i].hit(corInt)
            }
        }
    }

    checkSunk() {
        let shipsSunk = 0
        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].sunk) {
                shipsSunk = shipsSunk + 1
            }
        }
        if (shipsSunk == this.ships.length) {
            return true
        } else {
            return false
        }
        
    }

    opponentBoard() {
        return this.grid.map((cell) => {
            return cell.isShot && cell.hasShip
                ? 'hit'
                : cell.isShot
                ? 'miss'
                : 'empty'
        })
    }
}

module.exports = {Gameboard: Gameboard} 
},{"./ship":5}],3:[function(require,module,exports){
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

},{"./game":1,"./gameboard":2,"./player":4,"./ship":5}],4:[function(require,module,exports){
const gameboard = require("./gameboard")
let Gameboard = gameboard.Gameboard

class Player {
    constructor (name) {
        this.name = name
        this.gameboard = new Gameboard()
    }

    shoot(coordinate, gameboard) {
        if (gameboard.opponentBoard()[coordinate] === "empty") {
            gameboard.receiveAttack(coordinate)
        } else {
            return false
        }
    }

    getRandomShot() {
        return Math.floor(Math.random() * 100)
    }

}

module.exports = {Player: Player} 
},{"./gameboard":2}],5:[function(require,module,exports){
class Ship {
    constructor(coordinates) {
        this.coordinates = coordinates
        this.hits = []
        this.sunk = false
    }

    hit(coordinate) {
        // if (coordinate in this.coordinates) {
            this.hits.push(coordinate)
        // }
        if (this.isSunk()) {
            this.sunk = true
        }
        
    }

    isSunk() {
		return this.coordinates.every((occupiedCell) =>
			this.hits.includes(occupiedCell))
    }
}

module.exports = {Ship: Ship} 
},{}]},{},[3]);
