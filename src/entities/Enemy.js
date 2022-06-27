import { Sprite, Position } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Enemy {
  constructor() {
    this.id = "enemy";
    this.target = "player";
    this.spawn = 'random'
    this.sprite = new Sprite(this.id, TILES.enemy, 'green');
    this.position = new Position(10, 10);
  }
}
