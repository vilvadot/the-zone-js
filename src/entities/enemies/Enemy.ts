import {
  Sprite,
  Position,
  Velocity,
  Health,
  Damage,
  TargetManual,
} from "../../components/index.js";
import { uid } from "../../util/index.js";

export enum ENEMY {
  dog = "dog",
  snake = "snake",
}

export class Enemy {
  target: TargetManual;
  position: Position;
  name: string;
  id: string;
  isTalkable: boolean;

  constructor(x, y) {
    this.target = new TargetManual("player");
    this.position = new Position(x, y);
    this.name = "enemy";
    this.id = `enemy-${uid()}`;
    this.isTalkable = false;
  }
}

export class Snake extends Enemy {
  name: string;
  id: string;
  health: Health;
  damage: Damage;
  sprite: Sprite;
  velocity: Velocity;

  constructor(x, y) {
    super(x, y);
    this.name = "snake";
    this.id = `snake-${uid()}`;
    this.health = new Health(5);
    this.damage = new Damage(1);
    this.sprite = new Sprite("snake");
    this.velocity = new Velocity(0, 0);
  }
}
