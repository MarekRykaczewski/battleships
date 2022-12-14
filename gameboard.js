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
                if (this.grid[i + coordinate].hasShip) {
                    return false
                }
                locationArray.push(coordinate + i)
            }
        } else if (axis === 'y') {
            for (let i = 0; i < ship.coordinates.length; i++) {
                if (coordinate + (i * 10) > 99) {
                    return false
                }
                if (this.grid[coordinate + (i * 10)].hasShip) {
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

    checkIfLegal(ship, coordinate, axis) {
        let locationArray = []
        let row = this.findRow(coordinate)
        if (axis === 'x') {
            for (let i = 0; i < ship.coordinates.length; i++) {
                if (i + coordinate > row[row.length - 1]) {
                   return false
                }
                if (this.grid[i + coordinate].hasShip) {
                    return false
                }
                locationArray.push(coordinate + i)
            }
        } else if (axis === 'y') {
            for (let i = 0; i < ship.coordinates.length; i++) {
                if (coordinate + (i * 10) > 99) {
                    return false
                }
                if (this.grid[coordinate + (i * 10)].hasShip) {
                    return false
                }
                locationArray.push(coordinate + (i * 10))
            }
        }
        return locationArray
    }

    checkIfLegalComputer(ship, coordinate, axis) {
        let locationArray = []
        let row = this.findRow(coordinate)
        if (axis === 'x') {
            for (let i = 0; i < ship.coordinates.length; i++) {
                if (i + coordinate > row[row.length - 1]) {
                   return false
                }
                if (this.grid[i + coordinate].hasShip) {
                    return false
                }
                locationArray.push(coordinate + i)
            }
        } else if (axis === 'y') {
            for (let i = 0; i < ship.coordinates.length; i++) {
                if (coordinate + (i * 10) > 99) {
                    return false
                }
                if (this.grid[coordinate + (i * 10)].hasShip) {
                    return false
                }
                locationArray.push(coordinate + (i * 10))
            }
        }
        let array = [locationArray, axis]
        return array
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