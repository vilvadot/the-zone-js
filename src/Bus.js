export class Bus {
  constructor() {
    this.events = {}
  }

  subscribe(eventName, callback) {
    const subscriptions = this.events[eventName]
    if (!subscriptions) {
      this.events[eventName] = [callback]
    }else{
      this.events[eventName] = [...subscriptions, callback]
    }
  }

  emit(eventName, value) {
    if (!this.events[eventName]) return
    this.events[eventName].forEach(callback => callback(value))
  }
}

export const EVENTS = {
  PLAYER_MOVED: "PLAYER_MOVED",
  INPUT_PRESSED: "INPUT_PRESSED",
}