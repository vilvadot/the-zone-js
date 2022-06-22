import { Sprite, Position } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Enemy {
  constructor(bus) {
    this.bus = bus;
    this.sprite = new Sprite('enemy', TILES.enemy)
    this.position = new Position(10,10)
  }
}
