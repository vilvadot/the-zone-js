import { Game } from "./Game"
import { Bus } from "./Bus"
import { World } from "./World"
import {displaystub} from './_test_/stubs'

jest.mock('./World')

describe('Game', () => {
    it("generates a new world on load", () => {
        const fakeWorld = new World()
        const game = new Game(new Bus(), displaystub(), fakeWorld, [])

        game.init()

        expect(fakeWorld.generate).toHaveBeenCalled()
    })
})