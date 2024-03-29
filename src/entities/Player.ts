import {
  Position,
  Velocity,
  Health,
  Damage,
  TargetManual,
  Collision,
  Sprite,
  Inventory,
} from "../components/index.js";
import { Ammo } from "./items/Ammo.js";

export const PLAYER_ID = "player";

export class Player {
  isPlayer: boolean;
  id: string;
  name: string;
  target: TargetManual;
  health: Health;
  damage: Damage;
  sprite: Sprite;
  position: Position;
  velocity: Velocity;
  collision: Collision;
  keyboardControlled: boolean;
  inventory: Inventory;

  constructor() {
    this.isPlayer = true;
    this.id = PLAYER_ID;
    this.name = PLAYER_ID;
    this.target = new TargetManual();
    this.health = new Health(10);
    this.damage = new Damage(1);
    this.sprite = new Sprite("knight");
    this.position = new Position(21, 5);
    this.velocity = new Velocity(0, 0);
    this.collision = new Collision();
    this.keyboardControlled = true;
    this.inventory = new Inventory([new Ammo(100)]);
  }
}
