import { Sprite } from "../components/index.js";
import { sprites } from "../sprites.js";

export class Corpse {
  constructor(entity) {
    this.id = `${entity.id}-corpse`;
    this.name = `${entity.name} corpse`;
    this.sprite = new Sprite(sprites.corpse, 2);
    this.position = entity.position
    this.isStatic = true;
  }
}
