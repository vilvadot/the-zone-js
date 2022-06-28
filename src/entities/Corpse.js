import { Sprite } from "../components/index.js";
import { TILES } from "../tiles.js";

export class Corpse {
  constructor(entity) {
    this.id = `${entity.id}-corpse`;
    this.sprite = new Sprite(this.id, TILES.corpse, "red", 0);
    this.position = entity.position
    this.isStatic = true;
  }
}
