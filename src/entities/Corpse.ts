import { Sprite } from "../components/index.js";
import { Entity } from "./index.js";

export class Corpse {
  id: string;
  name: string;
  sprite: Sprite;
  position: any;
  isStatic: boolean;

  constructor(entity: Entity) {
    this.id = `${entity.id}-corpse`;
    this.name = `${entity.name} corpse`;
    this.sprite = new Sprite('corpse', 2);
    this.position = entity.position
    this.isStatic = true;
  }
}
