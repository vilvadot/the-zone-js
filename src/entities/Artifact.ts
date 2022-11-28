import { Position, Sprite } from "../components/index.js";
import {uid} from '../util/index.js'

export class Artifact{
  id: string;
  name: string;
  sprite: Sprite;
  position: Position;
  isWalkable: boolean;
  
  constructor() {
    this.id = `anomaly-${uid()}`;
    this.name = "Artifact";
    this.sprite = new Sprite('flame');
    this.position = new Position();
    this.isWalkable = true;
  }
}
