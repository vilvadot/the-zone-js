import { SPRITES } from "../sprites.js";
import { uid } from "../util/index.js";

class Item {
  name: string;
  quantity: number;
  id: string;

  constructor(name = "unknown item", quantity = 0){
    this.name = name;
    this.quantity = quantity;
    this.id = `${this.name}-${uid()}`;
  }
}

export class Ammo extends Item {
  constructor(quantity = 0) {
    super("Ammo", quantity)
  }
}

export class Inventory {
  content: Item[];

  constructor(content: Item[]) {
    this.content = content;
  }
}

export class Position {
  x: number | undefined;
  y: number | undefined;

  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }
}

export class Velocity {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export class Health {
  value: number;
  maxValue: number;

  constructor(value = 0) {
    this.value = value;
    this.maxValue = value;
  }
}

export class Damage {
  value: number;

  constructor(value = 0) {
    this.value = value;
  }
}

export class Sprite {
  name: keyof typeof SPRITES;

  constructor(name: keyof typeof SPRITES = "flame") {
    this.name = name;
  }
}

export class TargetManual {
  id: string | undefined;

  constructor(id?: string) {
    this.id = id;
  }
}

export type CollisionAreas = {
  west: any[];
  east: any[];
  south: any[];
  north: any[];
  overlap: any[];
};

export class Collision {
  areas: CollisionAreas;

  constructor(areas?: CollisionAreas) {
    this.areas = {
      west: [],
      east: [],
      south: [],
      north: [],
      overlap: [],
      ...areas,
    };
  }
}
