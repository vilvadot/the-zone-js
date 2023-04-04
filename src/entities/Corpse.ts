import { Sprite } from "../components/index.js";
import { Entity } from "./index.js";

export class Corpse {
  id: string;
  name: string;
  sprite: Sprite;
  position: any;
  isWalkable: boolean;

  constructor(entity: Entity) {
    this.id = `${entity.id}-corpse`;
    this.name = `${entity.name} corpse`;
    this.sprite = new Sprite("corpse");
    this.position = entity.position;
    this.isWalkable = true;
  }
}
