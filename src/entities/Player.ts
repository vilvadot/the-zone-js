import {
  Position,
  Velocity,
  Health,
  Damage,
  TargetManual,
  Collision,
  Sprite,
} from "../components/index.js";

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

  constructor() {
    this.isPlayer = true;
    this.id = PLAYER_ID;
    this.name = PLAYER_ID;
    this.target = new TargetManual();
    this.health = new Health(10);
    this.damage = new Damage(1);
    this.sprite = new Sprite('knight');
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
    this.collision = new Collision();
    this.keyboardControlled = true;
  }
}
