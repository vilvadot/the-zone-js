import { Pickable, Position, Spawn, Sprite } from "../components/index.js";
import { TILES, COLORS } from "../tiles.js";

export class Anomaly {
  constructor() {
    this.id = 'anomaly';
    this.sprite = new Sprite(this.id, TILES.anomaly, COLORS[TILES.anomaly]);
    this.position = new Position()
    this.spawn = Spawn.random()
    this.isStatic = true
    this.pickable = new Pickable()
  }
}
