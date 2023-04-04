import { Position, Sprite } from "../../components/index.js";
import { uid } from "../../util/index.js";
import { Item } from "./index.js";

export class Ammo implements Item {
  id: string;
  quantity: number;
  name: string;
  sprite: Sprite;
  position: Position;
  isWalkable: boolean;

  constructor(quantity: number = 1, x?: number, y?: number) {
    this.id = `ammo-${uid()}`;
    this.quantity = quantity;
    this.name = "Ammo";
    this.sprite = new Sprite("bullet");
    this.position = new Position(x, y);
    this.isWalkable = true;
  }
}
