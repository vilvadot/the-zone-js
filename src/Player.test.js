import { Player } from "./Player"
import { Bus, EVENTS } from "./Bus"
import { displaystub } from './_test_/stubs'
import { World } from "./World"

describe('Player', () => {
    let player
    const worldCenter = {x: 12, y: 12}
    const bus = new Bus()


    beforeEach(() => {
        World.prototype.isBlocked = jest.fn().mockReturnValue(false)
        const world = new World(new Bus(), displaystub(), () => {}, 25, 25) // Todo inyectar la grid con el mapa que quiera
        player = new Player(bus, displaystub(), world)
    })

    it("starts at worlds center", () => {
        expect(player.x).toEqual(worldCenter.x)
        expect(player.y).toEqual(worldCenter.y)
    })

    it("moves right", () => {
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowRight")

        expect(player.x).toEqual(worldCenter.x + 1)
    })

    it("moves left", () => {
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowLeft")

        expect(player.x).toEqual(worldCenter.x - 1)
    })

    it("moves up", () => {
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowUp")

        expect(player.y).toEqual(worldCenter.y - 1)
    })

    it("moves down", () => {
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowDown")

        expect(player.y).toEqual(worldCenter.y + 1)
    })

    it("cant move through walls", () => {
        World.prototype.isBlocked = jest.fn().mockReturnValue(true)
        const world = new World(new Bus(), displaystub(), () => {}, 25, 25) // Todo
        player = new Player(bus, displaystub(), world)

        bus.emit(EVENTS.INPUT_PRESSED, "ArrowRight")
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowDown")

        expect(player.x).toEqual(12)
        expect(player.y).toEqual(12)
    })
})