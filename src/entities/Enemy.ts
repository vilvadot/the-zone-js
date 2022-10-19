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

export class Enemy {
  name: string;
  id: string;
  target: TargetManual;
  health: Health;
  damage: Damage;
  sprite: Sprite;
  position: Position;
  velocity: Velocity;
  animation: Animation;
  
  constructor() {
    this.name = "enemy";
    this.id = `enemy-${uid()}`;
    this.target = new TargetManual("player");
    this.health = new Health(2);
    this.damage = new Damage(1);
    this.sprite = new Sprite('snake', 3);
    this.position = new Position();
    this.velocity = new Velocity(0, 0);
    this.animation = new Animation();
  }
}