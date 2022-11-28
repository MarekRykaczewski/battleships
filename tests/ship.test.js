const ship = require("../ship")
let Ship = ship.Ship

test("isSunk returns true if hits is equal to size", () => {
    let ship = new Ship([0])
    ship.hit(0)
    expect(ship.isSunk()).toBe(true)
})
test("isSunk returns true if hits is greater than size", () => {
    let ship = new Ship([0])
    ship.hit(0)
    ship.hit(0)
    ship.hit(0)
    expect(ship.isSunk()).toBe(true)
})
test("isSunk returns false if hits is smaller than size", () => {
    let ship = new Ship([0,1,2])
    ship.hit(1)
    expect(ship.isSunk()).toBe(false)
})
test("isSunk called on a new ship returns false", () => {
    let ship = new Ship([0])
    expect(ship.isSunk()).toBe(false)
})