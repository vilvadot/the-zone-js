import { Sprite, Position, Velocity, Target, Health } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Enemy {
  constructor(id = "enemy", targetId = "player") {
    this.id = id;
    this.target = new Target('automatic', targetId);
    this.spawn = "random";
    this.health = new Health(1);
    this.damage = 1;
    this.sprite = new Sprite(this.id, TILES.enemy, "green");
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
  }
}
