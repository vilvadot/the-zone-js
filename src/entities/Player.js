import { Sprite, Position, InputControlled } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Player {
  constructor(bus) {
    this.bus = bus;
    this.sprite = new Sprite("player", TILES.player);
    this.position = new Position(10, 10);
    this.inputControlled = new InputControlled(bus);
  }
}
