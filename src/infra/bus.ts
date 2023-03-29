import { EVENTS } from "../actions.js";

export class Bus {
  events: {};

  constructor() {
    this.events = {};
  }

  subscribe(eventName: EVENTS, callback: any) {
    const subscriptions = this.events[eventName];
    if (!subscriptions) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName] = [...subscriptions, callback];
    }
  }

  emit(eventName: EVENTS, value?) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach((callback) => callback(value));
  }
}
