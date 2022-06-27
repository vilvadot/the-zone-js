import { Position, Sprite, Velocity } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Player {
  constructor() {
    this.id = "player";
    this.keyboardControlled = true;
    this.spawn = "origin";
    this.health = 1;
    this.sprite = new Sprite(this.id, TILES.player, "blue");
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
  }
}
