export class Bus {
  constructor() {
    this.events = {}
  }

  subscribe(eventName, callback) {
    this.events[eventName] = callback
  }

  emit(eventName, value) {
    if(!this.events[eventName]) return
    this.events[eventName](value)
  }
}

export const EVENTS = {
  PLAYER_MOVED: "PLAYER_MOVED",
  INPUT_PRESSED: "INPUT_PRESSED",
}