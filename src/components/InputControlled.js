import { EVENTS } from "../events.js";


export class InputControlled {
  constructor(bus) {
    this.lastAction = null;
    this.bus = bus;

    this._subscribeToInput();
  }

  _subscribeToInput() {
    this.bus.subscribe(EVENTS.INPUT_PRESSED, (action) => {
      this.lastAction = action;
    });
  }
}
