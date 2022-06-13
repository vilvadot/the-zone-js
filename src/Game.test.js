import { Game } from "./Game"

describe('Game', () => {
    it("generates a new world on load", () => {
        const fakeWorld = worldStub()
        const game = new Game(displaystub(), fakeWorld)

        game.init()

        expect(fakeWorld.generate).toHaveBeenCalled()
    })
})

const displaystub = () => {
    return {
        clear: jest.fn(),
        draw: jest.fn()
    }
}

const worldStub = () => {
    return {
        generate: jest.fn(),
        draw: jest.fn()
    }
}