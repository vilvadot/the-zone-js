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

export class GeneratorStub{}
