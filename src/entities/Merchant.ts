import { Position, Sprite } from "../components/index.js";
import { uid } from "../util/index.js";

export class Merchant {
  position: Position;
  sprite: Sprite;
  name: string;
  id: string;
  isTalkable: boolean;

  constructor(x, y) {
    this.position = new Position(x, y);
    this.name = "merchant";
    this.id = `merchant-${uid()}`;
    this.sprite = new Sprite('man')
    this.isTalkable = true;
  }
}
