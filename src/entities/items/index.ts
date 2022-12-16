import { uid } from "../../util/index.js";

export class Item {
  name: string;
  quantity: number;
  id: string;

  constructor(name = "unknown item", quantity = 0) {
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

export class Artifact extends Item {
  constructor(quantity = 1) {
    super("Artifact", quantity);
  }
}
