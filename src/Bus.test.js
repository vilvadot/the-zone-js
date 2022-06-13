import { Bus } from "./Bus"


describe('Bus', () => {
    it("executes a callback when a subscribed event is emited", () => {
        const aCallback = jest.fn()
        const bus = new Bus()
        const EVENT = 'hello'
        bus.subscribe(EVENT, aCallback)

        bus.emit(EVENT)

        expect(aCallback).toHaveBeenCalled()
    })

    it("supports multiple subscriptions to an event", () => {
        const aCallback = jest.fn()
        const anotherCallback = jest.fn()
        const bus = new Bus()
        const EVENT = 'hello'
        bus.subscribe(EVENT, aCallback)
        bus.subscribe(EVENT, anotherCallback)

        bus.emit(EVENT)

        expect(anotherCallback).toHaveBeenCalled()
        expect(aCallback).toHaveBeenCalled()
    })
})