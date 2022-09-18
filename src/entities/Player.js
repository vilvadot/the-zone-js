import {
  Position,
  Velocity,
  Health,
  Damage,
  TargetManual,
  Collision,
  Animation,
  Sprite,
} from "../components/index.js";
import { sprites } from "../tiles.js";
import { WIDTH, HEIGHT} from '../config.js'

export const PLAYER_ID = "player";

export class Player {
  constructor() {
    this.isPlayer = true;
    this.id = PLAYER_ID;
    this.name = PLAYER_ID;
    this.target = new TargetManual();
    this.health = new Health(100);
    this.damage = new Damage(1);
    this.sprite = new Sprite(sprites.knight, 3);
    this.position = new Position(Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2));
    this.velocity = new Velocity(0, 0);
    this.collision = new Collision();
    this.animation = new Animation();
    this.keyboardControlled = true;
  }
}
