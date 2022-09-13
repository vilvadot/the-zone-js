import { HEIGHT, WIDTH } from "../config.js";

export class Travel {
  static run(entities, world, onTravel) {
    for (const { position, velocity, isPlayer } of entities) {
      if (!isPlayer) continue;

      const isMovingUp = velocity.y === -1
      const isMovingLeft = velocity.x === -1
      const isMovingDown = velocity.y === 1
      const isMovingRight = velocity.x === 1

      if (position.x === 0 && isMovingLeft) {
        onTravel()
        position.x = WIDTH;
        world.travelWest();
      }

      if (position.x === WIDTH - 1 && isMovingRight) {
        onTravel()
        position.x = 0;
        world.travelEast();
      }

      if (position.y === HEIGHT - 1 && isMovingDown) {
        onTravel()
        position.y = -1;
        world.travelSouth();
      }

      if (position.y === 0 && isMovingUp) {
        onTravel()
        position.y = HEIGHT;
        world.travelNorth();
      }
    }
  }
}