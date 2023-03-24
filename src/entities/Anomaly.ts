import { Position, Sprite } from "../components/index.js";
import { uid } from "../util/index.js";

export class Anomaly{
    id: string;
    name: string;
    sprite: Sprite;
    position: Position;
    isWalkable: boolean;
    isInvisible: boolean;
    
    constructor(x: number, y: number) {
      this.id = `anomaly-${uid()}`;
      this.name = "Anomaly";
      this.sprite = new Sprite('anomaly');
      this.isWalkable = true;
      this.isInvisible = true;
      this.position = new Position(x,y)
    }
  }