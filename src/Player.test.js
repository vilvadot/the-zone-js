import { Player } from "./Player"
import { Bus, EVENTS } from "./Bus"
import { createWorld, stubGameContainer } from './_test_/stubs'
import { Grid } from "./World"
import { TILES } from "./config"

describe('Player', () => {
    let player
    const bus = new Bus()
    const world = createWorld({ height: 3, width: 3 })
    const worldCenter = world.getCenter()
    stubGameContainer()

    beforeEach(() => {
        player = new Player(bus, world)
    })

    it("renders a DOM node when created", () => {
        const $player = document.querySelector("#player")

        expect($player).toBeTruthy()
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

    it("broadcasts its position when moving", () => {
        const handleMovement = jest.fn()
        bus.subscribe(EVENTS.PLAYER_MOVED, handleMovement)
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowDown")

        expect(handleMovement).toHaveBeenCalledWith({y: worldCenter.y + 1, x: worldCenter.x})
    })

    it("cant move through walls", () => {
        const map = new Grid(2, 2)
            .add(0, 0, TILES.wall)
            .add(0, 1, TILES.wall)
            .add(1, 0, TILES.wall)
        const world = createWorld({ map, width: 2, height: 2 })
        player = new Player(bus, world)

        bus.emit(EVENTS.INPUT_PRESSED, "ArrowLeft")
        bus.emit(EVENTS.INPUT_PRESSED, "ArrowTop")

        expect(player.x).toEqual(1)
        expect(player.y).toEqual(1)
    })
})