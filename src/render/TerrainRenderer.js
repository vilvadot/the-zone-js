import { DEBUG_ENABLED } from "../config.js";
import { shadowMagnitude } from "./shadowMagnitude.js";

export class TerrainRenderer {
  static run(display, fov, terrain) {
    display.clear();

    if (DEBUG_ENABLED) {
      terrain.data.forEach((x, y, value) => {
        display.draw(x, y, value, `rgba(0,0,0,0`);
      });
    }

    fov.forEach((x, y, distance) => {
      const tinting = `rgba(0,0,0,${1 - shadowMagnitude(distance)}`;
      const value = terrain.getTileAt(x, y);
      display.draw(x, y, value, tinting);
    });
  }
}
