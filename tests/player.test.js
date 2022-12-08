const player = require("../player")
let Player = player.Player
const gameboard = require("../gameboard")
let Gameboard = gameboard.Gameboard
const ship = require("../ship")
let Ship = ship.Ship

test("Creates player", () => {
    let player = new Player("test")
    expect(player.name).toBe("test")
})
test("Shoots gameboard", () => {
    let player = new Player("test")
    let gameboard = new Gameboard()
    player.shoot(5, gameboard)
    expect(gameboard.grid[5]).toStrictEqual({"hasShip": false, "isShot": true})
})
test("Rejects shot if fired at before", () => {
    let player = new Player("test")
    let gameboard = new Gameboard()
    player.shoot(5, gameboard)
    expect(player.shoot(5, gameboard)).toBe(false)
})