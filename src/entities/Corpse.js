import { Sprite } from "../components/index.js";
import { COLORS, TILES } from "../tiles.js";

export class Corpse {
  constructor(entity) {
    this.id = `${entity.id}-corpse`;
    this.sprite = new Sprite(this.id, TILES.corpse, COLORS[TILES.corpse], 0);
    this.position = entity.position
    this.isStatic = true;
  }
}
