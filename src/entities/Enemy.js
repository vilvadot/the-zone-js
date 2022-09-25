import {
  Sprite,
  Position,
  Velocity,
  Health,
  Damage,
  TargetManual,
  Animation,
} from "../components/index.js";
import { uid } from "../util.js";
import { sprites } from "../sprites.js";

export class Enemy {
  constructor() {
    this.name = "enemy";
    this.id = `enemy-${uid()}`;
    this.target = new TargetManual("player");
    this.health = new Health(2);
    this.damage = new Damage(1);
    this.sprite = new Sprite(sprites.snake, 3);
    this.position = new Position();
    this.velocity = new Velocity(0, 0);
    this.animation = new Animation();
  }
}
