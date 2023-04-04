import { Position, Sprite } from "../components/index.js";
import { uid } from "../util/index.js";

export class Artifact {
  id: string;
  quantity: number;
  name: string;
  sprite: Sprite;
  position: Position;
  isWalkable: boolean;

  constructor(quantity: number = 1, x?: number, y?: number) {
    this.id = `anomaly-${uid()}`;
    this.quantity = quantity;
    this.name = "Artifact";
    this.sprite = new Sprite("flame");
    this.position = new Position(x, y);
    this.isWalkable = true;
  }
}
