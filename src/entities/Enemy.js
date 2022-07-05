import { Sprite, Position, Velocity, Health, Spawn, Damage, TargetManual } from "../components/index.js";
import { TILES } from "../tiles.js";
import { COLORS } from "../colors.js";

export class Enemy {
  constructor(id = "enemy") {
    this.id = id;
    this.target = new TargetManual('player');
    this.spawn = Spawn.random()
    this.health = new Health(2);
    this.damage = new Damage(1);
    this.sprite = new Sprite(this.id, TILES.enemy, COLORS[TILES.enemy]);
    this.position = new Position(10, 10);
    this.velocity = new Velocity(0, 0);
  }
}
