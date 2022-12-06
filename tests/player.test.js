const player = require("../player")
let Player = player.Player
const gameboard = require("../gameboard")
let Gameboard = gameboard.Gameboard
const ship = require("../ship")
let Ship = ship.Ship


test("placeRandom places a ship", () => {
    let ship1 = new Ship([0,1,2])
    let gameboard1 = new Gameboard()
    let player1 = new Player(gameboard1, 3)
    player1.placeRandom(ship1)
    expect(gameboard1.ships[0].coordinates).toStrictEqual([0,1,2])
})
test("placeRandom does not place a ship if exceeds players numberOfShips", () => {
    let ship1 = new Ship([0,1,2])
    let gameboard1 = new Gameboard()
    let player1 = new Player(gameboard1, 0)
    expect(player1.placeRandom(ship1)).toBe(false)
})
