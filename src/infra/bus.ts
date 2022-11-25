import { DEBUG_ENABLED } from "../config.js"

export class Bus {
  events: {}
  
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

  emit(eventName, value?) {
    if (!this.events[eventName]) return
    this.events[eventName].forEach(callback => callback(value))
  }
}