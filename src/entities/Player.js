import { Position, Sprite, Velocity, Health, Damage, TargetManual, Collision, Inventory, Animation } from "../components/index.js";
import { TILES } from "../tiles.js";
import { COLORS } from "../colors.js";

export const PLAYER_ID = 'player'

export class Player{
  constructor() {
    this.id = PLAYER_ID;
    this.name = PLAYER_ID;
    this.spawn = "origin";
    this.target = new TargetManual()
    this.health = new Health(30);
    this.damage = new Damage(1);
    this.sprite = new Sprite(this.id, TILES.player, COLORS[TILES.player], 2);
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
    this.collision = new Collision();
    this.inventory = new Inventory();
    this.animation = new Animation()
    this.keyboardControlled = true;
  }
}
