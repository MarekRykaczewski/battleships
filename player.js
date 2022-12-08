const gameboard = require("./gameboard")
let Gameboard = gameboard.Gameboard

class Player {
    constructor (name) {
        this.name = name
        this.gameboard = new Gameboard()
        this.ships = []
    }

    shoot(coordinate, gameboard) {
        if (gameboard.opponentBoard()[coordinate] === "empty") {
            gameboard.receiveAttack(coordinate)
        } else {
            return false
        }
    }


}

module.exports = {Player: Player} 