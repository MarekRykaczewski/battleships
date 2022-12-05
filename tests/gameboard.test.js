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
test("Do not allow placements that put ship out of bounds (Y axis)", () => {
    let ship = new Ship([0,1,2])
    let gameboard = new Gameboard()
    expect(gameboard.placeShip(ship, 89, "y")).toBe(false)
})
test("receiveHit registers hit", () => {
    let gameboard = new Gameboard()
    gameboard.receiveAttack(25)
    expect(gameboard.grid[25].isShot).toBe(true)
})
test("receiveHit registers hit (2)", () => {
    let gameboard = new Gameboard()
    gameboard.receiveAttack(25)
    expect(gameboard.grid[50].isShot).toBe(false)
})
test("receiveHit hits correct ship", () => {
    let gameboard = new Gameboard()
    let ship = new Ship([0,1,2])
    gameboard.placeShip(ship, 3, "x")
    gameboard.receiveAttack(0)
    expect(gameboard.ships[0].hits).toStrictEqual([0])
})
test("receiveHit does not call hit on a miss", () => {
    let gameboard = new Gameboard()
    let ship = new Ship([0,1,2])
    gameboard.placeShip(ship, 3, "x")
    gameboard.receiveAttack(5)
    expect(gameboard.ships[0].hits).toStrictEqual([])
})
test("checkSunk returns true when all ships sunk", () => {
    let gameboard = new Gameboard()
    let ship = new Ship([0,1,2])
    gameboard.placeShip(ship, 0, "x")
    gameboard.receiveAttack(0)
    gameboard.receiveAttack(1)
    gameboard.receiveAttack(2)
    expect(gameboard.checkSunk()).toBe(true)
})
test("checkSunk returns false when a ship has not sunk", () => {
    let gameboard = new Gameboard()
    let ship = new Ship([0,1,2])
    gameboard.placeShip(ship, 0, "x")
    gameboard.receiveAttack(0)
    expect(gameboard.checkSunk()).toBe(false)
})
test("opponentBoard returns what opponent can see", () => {
    let gameboard = new Gameboard()
    gameboard.grid = [{hasShip: false, isShot: false}, {hasShip: false, isShot: false}, {hasShip: false, isShot: false}]
    let ship = new Ship([0,1])
    gameboard.placeShip(ship, 0, "x")
    gameboard.receiveAttack(0)
    gameboard.receiveAttack(2)
    expect(gameboard.opponentBoard()).toStrictEqual(["hit", "empty", "miss"])
})