class Ship {
    constructor(coordinates) {
        this.coordinates = coordinates
        this.hits = []
        this.sunk = false
    }

    hit(coordinate) {
        if (coordinate in this.coordinates) {
            this.hits.push(coordinate)
        }
        
    }

    isSunk() {
		return this.coordinates.every((occupiedCell) =>
			this.hits.includes(occupiedCell))
    }
}

module.exports = {Ship: Ship} 