import { uid } from "../../util/index.js";


export type ItemName = string;
export class Item {
  name: ItemName;
  quantity: number;
  id: string;

  constructor(name: ItemName = "unknown item", quantity = 0) {
    this.name = name;
    this.quantity = quantity;
    this.id = `${this.name}-${uid()}`;
  }
}

export class Ammo extends Item {
  constructor(quantity = 0) {
    super("Ammo", quantity);
  }
}