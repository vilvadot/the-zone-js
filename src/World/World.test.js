import { World } from "./World"
import { Bus } from "../Bus"
import { Grid } from "./Grid"
import { displaystub, GeneratorStub } from '../_test_/stubs'

describe('World', () => {
    let world

    beforeEach(() => {
        world = new World(new Bus(), displaystub(),new GeneratorStub(), 1, 1)
    })

    it("knows its center", () => {
        const height = 25
        const width = 25
        world = new World(new Bus(), displaystub(),new GeneratorStub(), width, height)

        const center = world.getCenter()

        expect(center.x).toEqual(12)
        expect(center.y).toEqual(12)
    })

    it("knows if a tile is blocked", () => {
        world.map = new Grid(1, 1).add(0, 0, 'x')

        world.isBlocked(0, 0)

        expect(world.isBlocked(0, 0)).toBeTruthy()
    })

    it("knows if a tile is free", () => {
        world.map = new Grid(1, 1).add(0, 0, '.')

        world.isBlocked(0, 0)

        expect(world.isBlocked(0, 0)).toBeFalsy()
    })
})
