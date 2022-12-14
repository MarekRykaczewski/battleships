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