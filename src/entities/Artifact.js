import { Position, Sprite } from "../components/index.js";
import {uid} from '../util.js'
import { sprites } from "../sprites.js";

export class Artifact{
  constructor() {
    this.id = `anomaly-${uid()}`;
    this.name = "Artifact";
    this.sprite = new Sprite(sprites.bottle, 2, "animation--float");
    this.position = new Position();
    this.isStatic = true; // TODO: Change for collision (go trough)
  }
}
