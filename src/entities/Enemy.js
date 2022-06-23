import { Sprite, Position, Spawn, Target } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Enemy {
  constructor(id = "enemy", targetId = "player") {
    this.id = id;
    this.sprite = new Sprite(this.id, TILES.enemy);
    this.position = new Position(10, 10);
    this.spawn = new Spawn("random");
    this.target = new Target(targetId);
  }
}
