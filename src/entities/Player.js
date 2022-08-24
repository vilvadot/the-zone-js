import {
  Position,
  Velocity,
  Health,
  Damage,
  TargetManual,
  Collision,
  Inventory,
  Animation,
  Sprite
} from "../components/index.js";

export const PLAYER_ID = "player";

export class Player {
  constructor() {
    this.id = PLAYER_ID;
    this.isPlayer = true;
    this.name = PLAYER_ID;
    this.spawn = "origin";
    this.target = new TargetManual();
    this.health = new Health(10);
    this.damage = new Damage(1);
    this.sprite = new Sprite(0, 8);
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
    this.collision = new Collision();
    this.inventory = new Inventory();
    this.animation = new Animation();
    this.keyboardControlled = true;
  }
}