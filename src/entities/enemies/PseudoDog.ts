import {
  Sprite,
  Velocity,
  Health,
  Damage,
  Inventory,
  Position,
} from "../../components/index.js";
import { uid } from "../../util/index.js";
import { Artifact } from "../Artifact.js";
import { Item } from "../items/index.js";
import { Enemy } from "./Enemy.js";

export class PseudoDogSkin implements Item {
  id: string;
  quantity: number;
  name: string;
  sprite: Sprite;
  position: Position;
  isWalkable: boolean;

  constructor(quantity: number = 1, x?: number, y?: number) {
    this.quantity = quantity;
    this.name = "Pseudo Dog Skin";
    this.id = `${this.name}-${uid()}`;
    this.sprite = new Sprite("leather");
    this.position = new Position(x, y);
    this.isWalkable = true;
  }
}

export class PseudoDog extends Enemy {
  name: string;
  id: string;
  health: Health;
  damage: Damage;
  sprite: Sprite;
  velocity: Velocity;
  inventory: Inventory;

  constructor(x, y) {
    super(x, y);
    this.name = "pseudo dog";
    this.id = `dog-${uid()}`;
    this.health = new Health(3);
    this.damage = new Damage(0.5);
    this.sprite = new Sprite("dog");
    this.velocity = new Velocity(0, 0);
    this.inventory = new Inventory([new PseudoDogSkin(1)]);
  }
}
