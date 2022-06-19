import { TILES } from "./config.js";
import { EVENTS } from "./Bus.js";
import { INPUTS } from "./input.js";

export class Player {
  constructor(bus, display, world) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.position = this.world.getCenter();
    this.$node = this.create();
    this.draw();
    this._subscribe();
  }

  create() {
    const $game = document.querySelector("#game");
    const $player = document.createElement("div");
    $player.id = "player";

    $game.appendChild($player);

    return $player;
  }

  draw() {
    this.$node.style.top = this.position.y * 20;
    this.$node.style.left = this.position.x * 20;
  }

  move(action) {
    const candidate = { ...this.position };
    if (action === INPUTS.ArrowRight) candidate.x++;
    if (action === INPUTS.ArrowLeft) candidate.x--;
    if (action === INPUTS.ArrowUp) candidate.y--;
    if (action === INPUTS.ArrowDown) candidate.y++;

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
