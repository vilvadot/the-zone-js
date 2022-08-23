import { COLORS } from "../colors.js";

export class WorldRendering {
  static run(world, display) {
    world.map.forEach((x, y, value) => {
      display.draw(x, y, value, COLORS[value]);
    });
  }
}
