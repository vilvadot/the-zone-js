import { Pickable, Sprite } from "../components/index.js";
import { sprites } from "../tiles.js";

export class Corpse {
  constructor(entity) {
    this.id = `${entity.id}`;
    this.name = `${entity.name} corpse`;
    this.sprite = new Sprite(sprites.corpse, 2);
    this.position = entity.position
    this.isStatic = true;
    this.pickable = new Pickable()
  }
}
