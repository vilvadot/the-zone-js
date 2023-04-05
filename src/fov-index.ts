import ROT from "./lib/rot.js";
import { DEBUG_ENABLED } from "./config.js";
import { Terrain } from "./terrain/Terrain.js";
import { Player } from "./entities/Player.js";
import { calculateDistance } from "./util/coordinates.js";
import { Point } from "./data-structures/Point.js";

export class FOVIndex {
  index: {};

  constructor(player: Player, terrain: Terrain) {
    this.index = {};
    this.update(player, terrain);
  }

  update(player: Player, terrain: Terrain) {
    this.reset();

    const VIEW_RADIUS = 30;

    const canLightPass = (x, y) => {
      if (terrain.isBlocked(x, y)) return false;
      return true;
    };
    const fov = new ROT.FOV.PreciseShadowcasting(canLightPass);

    // Add visible tiles
    fov.compute(
      player.position.x,
      player.position.y,
      VIEW_RADIUS,
      (x, y, distance) => {
        this.addFreeTile(x, y, distance);
      }
    );

    // Add blocked tiles
    terrain.data.iterate((x, y) => {
      const distance = calculateDistance(
        new Point(player.position.x!, player.position.y!),
        new Point(x, y)
      );
      if (this.index[`${x},${y}`]) return;
      this.addBlockedTile(x, y, distance);
    });
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

  private reset() {
    this.index = {};
  }

  private addBlockedTile(x: number, y: number, distance: number): void {
    this.index[`${x},${y}`] = { distance, isBlocked: true };
  }

  private addFreeTile(x: number, y: number, distance: number): void {
    this.index[`${x},${y}`] = { distance, isBlocked: false };
  }
}
