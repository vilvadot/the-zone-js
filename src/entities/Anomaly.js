import { Pickable, Position, Spawn, Sprite } from "../components/index.js";
import { TILES } from "../tiles.js";
import { COLORS } from "../colors.js";

export class Anomaly {
  constructor() {
    this.id = 'anomaly';
    this.sprite = new Sprite(this.id, TILES.anomaly, COLORS[TILES.anomaly]);
    this.position = new Position()
    this.spawn = Spawn.random()
    this.pickable = new Pickable()
    this.isStatic = true // TODO: Change for collision (go trough)
  }
}