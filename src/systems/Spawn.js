import { HEIGHT, WIDTH } from "../config.js";

export class Spawn {
  static run(entities, world) {
    for (const { spawn, position } of entities) {
      if (!spawn || !position) continue;
      if(position.x && position.y) continue;

      let coordinates = { x: Math.floor(WIDTH / 2), y: Math.floor(HEIGHT / 2) };
      if (spawn.mode === 'random') coordinates = world.getRandomFreeCell();

      position.x = coordinates.x;
      position.y = coordinates.y;
    }
  }
}