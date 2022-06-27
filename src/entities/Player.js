import { Position, Sprite, Velocity, Target } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Player {
  constructor() {
    this.id = "player";
    this.spawn = "origin";
    this.target = new Target('manual')
    this.health = 30;
    this.damage = 1;
    this.sprite = new Sprite(this.id, TILES.player, "blue");
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
    this.keyboardControlled = true;
  }
}
