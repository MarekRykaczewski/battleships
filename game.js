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

    addCellEventListeners(playerOne, PlayerTwo, boardId) {
        let cells = document.getElementById(boardId).getElementsByClassName('cell')
        for (let i = 0; i < 100; i++) {
            let coordinate = cells.item(i).dataset.coordinate
            cells.item(i).addEventListener("click", function() {
                playerOne.shoot(coordinate, PlayerTwo.gameboard)
            })
        }
    }
}

module.exports = {Game: Game} 