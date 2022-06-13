import { TILES } from './config.js'
import { EVENTS } from './Bus.js'
import { INPUTS } from './input.js';

export class Player {
  constructor(bus, display, world) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.position = {
      x: 0,
      y: 0
    };
    this._subscribe()
  }

  draw() {
    this.display.draw(this.x, this.y, TILES.character, "black");
  }

  move(action) {
    const candidate = { ...this.position }
    if (action === INPUTS.ArrowRight) candidate.x++
    if (action === INPUTS.ArrowLeft) candidate.x--
    if (action === INPUTS.ArrowUp) candidate.y--
    if (action === INPUTS.ArrowDown) candidate.y++

    this._updatePostion(candidate)

    this.bus.emit(EVENTS.PLAYER_MOVED)
  }

  _updatePostion({ x, y }) {
    const cantMoveThere = this.world.isBlocked(x, y)
    if (cantMoveThere) return

    this.position = { x, y }
  }

  get x() {
    return this.position.x
  }

  get y() {
    return this.position.y
  }


  _subscribe() {
    this.bus.subscribe(EVENTS.INPUT_PRESSED, (action) => {
      this.move(action)
    })
  }
};