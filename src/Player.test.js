import { Player } from "./Player"
import { Bus, EVENTS } from "./Bus"
import { displaystub } from './_test_/stubs'
import { World } from "./World"

jest.mock('./World')

describe('Player', () => {
    let player
    let bus

    beforeEach(() => {
        bus = new Bus()
        World.prototype.isBlocked = jest.fn().mockReturnValue(false)
        player = new Player(bus, displaystub(), new World())
    })

    it("starts at coordinates origin", () => {
        expect(player.x).toEqual(0)
        expect(player.y).toEqual(0)
    })

    it("moves right", () => {
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowRight")

        expect(player.x).toEqual(1)
    })

    it("moves left", () => {
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowLeft")

        expect(player.x).toEqual(-1)
    })

    it("moves up", () => {
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowUp")

        expect(player.y).toEqual(-1)
    })

    it("moves down", () => {
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowDown")

        expect(player.y).toEqual(1)
    })

    it("cant move through walls", () => {
        World.prototype.isBlocked = jest.fn().mockReturnValue(true)
        player = new Player(bus, displaystub(), new World())

        bus.emit(EVENTS.INPUT_PRESSED, "ArrowRight")
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowDown")

        expect(player.x).toEqual(0)
        expect(player.y).toEqual(0)
    })
})