import { Grid } from "./Grid"
import { createWorld } from '../_test_/stubs'

describe('World', () => {
    it("knows its center", () => {
        const world = createWorld({ width: 25, height: 25})

        const center = world.getCenter()

        expect(center.x).toEqual(12)
        expect(center.y).toEqual(12)
    })

    it("knows if a tile is blocked", () => {
        const map = new Grid(1, 1).add(0, 0, 'x')
        const world = createWorld({ map })

        world.isBlocked(0, 0)

        expect(world.isBlocked(0, 0)).toBeTruthy()
    })

    it("knows if a tile is free", () => {
        const map = new Grid(1, 1).add(0, 0, '.')
        const world = createWorld({ map })

        world.isBlocked(0, 0)

        expect(world.isBlocked(0, 0)).toBeFalsy()
    })
})