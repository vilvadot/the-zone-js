import ROT from "./lib/rot.js";
import { DEBUG_ENABLED } from "./config.js";
import { Terrain } from "./terrain/Terrain.js";
import { Player } from "./entities/Player.js";

export class FOVIndex {
  index: {};

  constructor() {
    this.index = {};
  }

  update(player: Player, terrain: Terrain) {
    this.index = {};

    if (DEBUG_ENABLED) {
      terrain.data.iterate((x, y) => {
        this.index[`${x},${y}`] = 1;
      });
      return;
    }

    const VIEW_RADIUS = 30;

    const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
      if (terrain.isBlocked(x, y)) return false;
      return true;
    });

    fov.compute(
      player.position.x,
      player.position.y,
      VIEW_RADIUS,
      (x, y, distance) => {
        this.index[`${x},${y}`] = distance;
      }
    );
  }

  forEach(callback) {
    for (const coordinate in this.index) {
      const [x, y] = coordinate.split(",");

      callback(Number(x), Number(y), this.index[coordinate]);
    }
  }

  isVisible(x, y) {
    return !!this.getDistance(x, y);
  }

  getDistance(x, y) {
    return this.index[`${x},${y}`] || null;
  }
}
