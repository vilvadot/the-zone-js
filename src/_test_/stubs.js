export const displaystub = () => {
    return {
        clear: jest.fn(),
        draw: jest.fn()
    }
}

export const worldStub = () => {
    return {
        generate: jest.fn(),
        draw: jest.fn()
    }
}