import { Inventory, Position, Sprite } from "../components/index.js";
import { uid } from "../util/index.js";
import { Ammo } from "./items/index.js";

export class Merchant {
  position: Position;
  sprite: Sprite;
  name: string;
  id: string;
  isTalkable: boolean;
  inventory: Inventory;

  constructor(x, y) {
    this.position = new Position(x, y);
    this.name = "merchant";
    this.id = `merchant-${uid()}`;
    this.sprite = new Sprite('man')
    this.isTalkable = true;
    this.inventory = new Inventory([new Ammo(1000)]);
  }
}
