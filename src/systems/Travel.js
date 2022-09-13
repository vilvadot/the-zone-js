import { HEIGHT, WIDTH } from "../config.js";

export class Travel {
  static run(entities, world, display) {
    for (const { id, sprite, position, velocity, isPlayer } of entities) {
      if (!isPlayer) continue;
      if (position.x === 0 && velocity.x === -1) {
        console.log('travel!')
        world.travelWest();
        position.x = WIDTH;
        display.clear();
      }

      if (position.x === WIDTH - 1 && velocity.x === 1) {
        world.travelEast();
        position.x = -1;
        display.clear();
      }

      if (position.y === HEIGHT - 1 && velocity.y === 1) {
        world.travelSouth();
        position.y = -1;
        display.clear();
      }

      if (position.y === 0 && velocity.y === -1) {
        world.travelNorth();
        position.y = HEIGHT;
        display.clear();
      }
    }
  }
}