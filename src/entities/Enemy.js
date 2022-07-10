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
import { TILES } from "../tiles.js";
import { COLORS } from "../colors.js";
import { uid } from "../util.js";

const defaultParams = {
  color: COLORS[TILES.enemy] 
}

export class Enemy {
  constructor({ color } = defaultParams) {
    this.name = "enemy";
    this.id = `enemy-${uid()}`;
    this.target = new TargetManual("player");
    this.spawn = Spawn.random();
    this.health = new Health(2);
    this.damage = new Damage(1);
    this.sprite = new Sprite(this.id, TILES.enemy, color);
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
    this.animation = new Animation();
  }
}
