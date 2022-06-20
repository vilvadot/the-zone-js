import { EVENTS } from "./Bus.js";
import { INPUTS } from "./input.js";
import { addTileNodeToGame } from "./utils.js";
import { TILES } from "./config.js";

export const PLAYER_STEP = 1;

export class Player {
  constructor(bus, world) {
    this.bus = bus;
    this.world = world;
    this.position = this.world.getCenter();
    this.$node = addTileNodeToGame("player", TILES.player);
    this.draw();
    this._subscribe();
  }

  draw() {
    this.$node.style.top = this.position.y * 20;
    this.$node.style.left = this.position.x * 20;
  }

  move(action) {
    const candidate = { ...this.position };
    if (action === INPUTS.ArrowRight) candidate.x += PLAYER_STEP;
    if (action === INPUTS.ArrowLeft) candidate.x -= PLAYER_STEP;
    if (action === INPUTS.ArrowUp) candidate.y -= PLAYER_STEP;
    if (action === INPUTS.ArrowDown) candidate.y += PLAYER_STEP;

    this._updatePostion(candidate);

    this.bus.emit(EVENTS.PLAYER_MOVED, this.position);
  }

  _updatePostion({ x, y }) {
    const cantMoveThere = this.world.isBlocked(x, y);
    if (cantMoveThere) return;

    this.position = { x, y };
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  _subscribe() {
    this.bus.subscribe(EVENTS.INPUT_PRESSED, (action) => {
      this.move(action);
    });
  }
}
