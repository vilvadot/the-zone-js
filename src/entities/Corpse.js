import { Pickable, Sprite } from "../components/index.js";
import { COLORS, TILES } from "../tiles.js";

export class Corpse {
  constructor(entity) {
    this.id = `${entity.id}`;
    this.sprite = new Sprite(this.id, TILES.corpse, COLORS[TILES.corpse], 0);
    this.position = entity.position
    this.isStatic = true;
    this.pickable = new Pickable()
  }
}
