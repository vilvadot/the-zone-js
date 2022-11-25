import {
  Sprite,
  Position,
  Velocity,
  Health,
  Damage,
  TargetManual,
} from "../../components/index.js";
import { uid } from "../../util/index.js";

export class Enemy {
  target: TargetManual;
  position: Position;
  name: string;
  id: string;

  constructor() {
    this.target = new TargetManual("player");
    this.position = new Position();
    this.name = "enemy";
    this.id = `enemy-${uid()}`;
  }
}

export class Snake extends Enemy{
  name: string;
  id: string;
  health: Health;
  damage: Damage;
  sprite: Sprite;
  velocity: Velocity;

  constructor() {
    super()
    this.name = "snake";
    this.id = `snake-${uid()}`;
    this.health = new Health(2);
    this.damage = new Damage(1);
    this.sprite = new Sprite('snake');
    this.velocity = new Velocity(0, 0);
  }
}