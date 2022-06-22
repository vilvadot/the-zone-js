import { EVENTS } from "./events.js";

export class Sprite {
  constructor(id, tile) {
    this.id = id;
    this.tile = tile;
    this.node = null;
  }
}

export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

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
