import ROT from "./lib/rot.js";

export class FOVIndex {
  constructor() {
    this.index = {};
  }

  update(player, world) {
    this.index = {}
    
    const VIEW_RADIUS = 30;

    const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
      if (world.isBlocked(x, y)) return false;
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

      callback(x, y, this.index[coordinate]);
    }
  }

  isVisible(x, y){
    return this.index[`${x},${y}`]
  }
}
