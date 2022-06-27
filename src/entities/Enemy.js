import { Sprite, Position, Velocity } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Enemy {
  constructor() {
    this.id = "enemy";
    this.target = "player";
    this.spawn = "random";
    this.health = 1;
    this.sprite = new Sprite(this.id, TILES.enemy, "green");
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
  }
}
