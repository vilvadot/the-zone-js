import {
  Sprite,
  Position,
  Velocity,
  Health,
  Spawn,
  Damage,
  TargetManual,
  Animation,
} from "../components/index.js";
import { uid } from "../util.js";
import { sprites } from "../tiles.js";

export class Enemy {
  constructor() {
    this.name = "enemy";
    this.id = `enemy-${uid()}`;
    this.target = new TargetManual("player");
    this.spawn = Spawn.random();
    this.health = new Health(2);
    this.damage = new Damage(1);
    this.sprite = new Sprite(sprites.snake);
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
    this.animation = new Animation();
  }
}
