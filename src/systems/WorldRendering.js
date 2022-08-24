import { COLORS } from "../colors.js";
import ROT from "../lib/rot.js";

const VIEW_RADIUS = 5;

export class WorldRendering {
  static run(world, display, player) {
    display.clear();

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

        display.draw(x, y, value, COLORS[value]);
      }
    );
  }
}
