import { World, Grid } from '../World'
import { Bus } from '../Bus'

export const displaystub = () => {
    return {
        clear: jest.fn(),
        draw: jest.fn()
    }
}

export const stubGameContainer = () => {
    const $game = document.createElement("div")
    $game.id = "game"
    document.querySelector('body').appendChild($game)
}

class GeneratorStub { }
export const createWorld = ({ width = 1, height = 1, map = new Grid(width, height) }) => {
    return new World(new Bus(), displaystub(), map, new GeneratorStub(), width, height)
}

