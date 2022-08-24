import { COLORS } from "../colors.js";
import { TILES } from "../tiles.js";
import ROT from "../lib/rot.js";

const VIEW_RADIUS = 30;

export class WorldRendering {
  static run(world, display, player) {
    const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
      if (world.isBlocked(x, y)) return false;
      return true;
    });

    fov.compute(
      player.position.x,
      player.position.y,
      VIEW_RADIUS,
      (x, y, distance, visibility) => {
        const value = world.getTileAt(x, y);
        const tinting = `rgba(0,0,0, ${shadow(distance)}`;

        display.draw(x, y, value, tinting);
      }
    );
  }
}

const shadow = (distance) => {
  const shadowing = 1 / distance
  // Make a scale and map it linearly
  return 1 - shadowing;
};
