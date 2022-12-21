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
                if (player.gameboard.checkIfLegal(ships[0], coordinate, self.getDirection())) {
                    ships[0].coordinates = player.gameboard.placeShip(ships[0], coordinate, self.getDirection())
                    ships.shift()
                    self.renderShips(player, boardId) 
                }
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