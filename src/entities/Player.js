import { Position, Sprite, Velocity, Health, Damage, TargetManual, Collision } from "../components/index.js";
import { TILES, COLORS } from "../tiles.js";

export const PLAYER_ID = 'player'

export class Player {
  constructor() {
    this.id = PLAYER_ID;
    this.spawn = "origin";
    this.target = new TargetManual()
    this.health = new Health(30);
    this.damage = new Damage(1);
    this.sprite = new Sprite(this.id, TILES.player, COLORS[TILES.player]);
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
    this.collision = new Collision();
    this.keyboardControlled = true;
  }
}
