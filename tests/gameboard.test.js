const ship = require("../ship")
let Ship = ship.Ship
const gameboard = require("../gameboard")
let Gameboard = gameboard.Gameboard

test("Places ship on 0 coorindate", () => {
    let ship = new Ship([0,1,2])
    let gameboard = new Gameboard()
    expect(gameboard.placeShip(ship, 0, "x")).toStrictEqual([0,1,2])
})
test("Places ship on grid X variant", () => {
    let ship = new Ship([0,1,2])
    let gameboard = new Gameboard()
    expect(gameboard.placeShip(ship, 3, "x")).toStrictEqual([3,4,5])
})
test("Places ship on grid Y variant", () => {
    let ship = new Ship([0,1,2])
    let gameboard = new Gameboard()
    expect(gameboard.placeShip(ship, 3, "y")).toStrictEqual([3,13,23])
})
test("Find row", () => {
    let gameboard = new Gameboard()
    expect(gameboard.findRow(20)).toStrictEqual([20, 21, 22, 23, 24, 25, 26, 27, 28, 29])
})
test("Do not allow placements that put ship out of bounds (X axis)", () => {
    let ship = new Ship([0,1,2])
    let gameboard = new Gameboard()
    expect(gameboard.placeShip(ship, 19, "x")).toBe(false)
})
test("Do not allow placements that put ship out of bounds (Y axis)", () => {
    let ship = new Ship([0,1,2])
    let gameboard = new Gameboard()
    expect(gameboard.placeShip(ship, 89, "y")).toBe(false)
})
