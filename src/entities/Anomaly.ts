import { Damage, Position, Sprite, TargetManual } from "../components/index.js";
import { uid } from "../util/index.js";

export class Anomaly {
  id: string;
  name: string;
  sprite: Sprite;
  position: Position;
  isWalkable: boolean;
  isInvisible: boolean;
  target: TargetManual;
  damage: Damage;

  constructor(x: number, y: number) {
    this.id = `anomaly-${uid()}`;
    this.name = "Anomaly";
    this.sprite = new Sprite("anomaly");
    this.isWalkable = true;
    this.isInvisible = true;
    this.position = new Position(x, y);
    this.target = new TargetManual("player");
    this.damage = new Damage(3);
  }
}
