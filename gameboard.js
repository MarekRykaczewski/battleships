class Gameboard {
    constructor() {
        this.grid = Array(100).fill({ hasShip: false, isShot: false })
    }

    placeShip(ship, coordinate, axis) {
        let locationArray = []
        if (axis === 'x') {
            for (let i = 0; i < ship.coordinates.length; i++) {
                locationArray.push(coordinate + i)
            }
        } else if (axis === 'y') {
            for (let i = 0; i < ship.coordinates.length; i++) {
                locationArray.push(coordinate + (i * 10))
            }
        }
        return locationArray
    }
}

module.exports = {Gameboard: Gameboard} 