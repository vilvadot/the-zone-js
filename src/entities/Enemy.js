import { Sprite, Position } from "../components.js";
import { TILES } from "../config.js";

export class Enemy {
  constructor(bus) {
    this.bus = bus;
    this.sprite = new Sprite('enemy', TILES.enemy)
    this.position = new Position(10,10)
  }
}
