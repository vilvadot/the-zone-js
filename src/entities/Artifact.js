import { Pickable, Position, Spawn, Sprite } from "../components/index.js";
import {uid} from '../util.js'
import { sprites } from "../tiles.js";

export class Artifact{
  constructor() {
    this.id = `anomaly-${uid()}`;
    this.name = "Artifact";
    this.sprite = new Sprite(sprites.bottle, 2, "animation--float");
    this.position = new Position();
    this.spawn = Spawn.random();
    this.pickable = new Pickable();
    this.isStatic = true; // TODO: Change for collision (go trough)
  }
}
