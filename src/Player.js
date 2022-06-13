import { TILES } from './config.js'
import { EVENTS } from './Bus.js'
import { INPUTS } from './input.js';

export class Player {
  constructor(bus, display) {
    this.bus = bus;
    this.display = display;
    this.x = 0;
    this.y = 0;
    this._subscribe()
  }

  draw() {
    this.display.draw(this.x, this.y, TILES.character, "black");
  }

  move(action) {
    if(action === INPUTS.ArrowRight) this.x++
    if(action === INPUTS.ArrowLeft) this.x--
    if(action === INPUTS.ArrowUp) this.y--
    if(action === INPUTS.ArrowDown) this.y++

    this.bus.emit(EVENTS.PLAYER_MOVED)
  }

  _subscribe() {
    this.bus.subscribe(EVENTS.INPUT_PRESSED, (action) => {
      this.move(action)
    })
  }
};