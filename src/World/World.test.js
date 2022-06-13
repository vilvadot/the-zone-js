import { World } from "./World"
import { Bus } from "../Bus"
import { Grid } from "./Grid"
import { displaystub } from '../_test_/stubs'

describe('World', () => {
    let world

    beforeEach(() => {
        world = new World(new Bus(), displaystub(), new FakeGenerator(), 1, 1)
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

class FakeGenerator {

}