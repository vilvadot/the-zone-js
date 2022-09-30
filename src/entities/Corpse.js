import { Sprite } from "../components/index.js";

export class Corpse {
  constructor(entity) {
    this.id = `${entity.id}-corpse`;
    this.name = `${entity.name} corpse`;
    this.sprite = new Sprite('corpse', 2);
    this.position = entity.position
    this.isStatic = true;
  }
}
