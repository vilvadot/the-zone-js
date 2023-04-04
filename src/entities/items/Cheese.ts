import { Position, Sprite } from "../../components/index.js";
import { uid } from "../../util/index.js";
import { Effect, Item } from "./index.js";

export class Cheese implements Item {
  id: string;
  quantity: number;
  name: string;
  sprite: Sprite;
  position: Position;
  isWalkable: boolean;
  effect: Effect;

  constructor(quantity: number = 1, x?: number, y?: number) {
    this.quantity = quantity;
    this.name = "Cheese";
    this.id = `${this.name}-${uid()}`;
    this.sprite = new Sprite("cheese");
    this.position = new Position(x, y);
    this.isWalkable = true;
    this.effect = { name: "heal", amount: 2 };
  }
}
