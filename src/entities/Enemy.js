import { Sprite, Position, Spawn } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Enemy {
  constructor() {
    this.id = 'enemy'
    this.sprite = new Sprite(this.id, TILES.enemy)
    this.position = new Position(10,10)
    this.spawn = new Spawn('random')
  }
}
