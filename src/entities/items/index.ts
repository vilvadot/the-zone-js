import { Position, Sprite } from "../../components/index.js";

export type ItemName = string;

export interface Effect { name: string, amount: number}

export interface Item {
  id: string;
  name: ItemName;
  quantity: number;
  sprite: Sprite;
  position: Position;
  isWalkable: boolean;
  effect?: Effect;
}
