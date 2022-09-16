import { HEIGHT, WIDTH } from "../config.js";

export class Travel {
  static run(entities, navigation, onTravel) {
    for (const { position, velocity, isPlayer } of entities) {
      if (!isPlayer) continue;

      const isMovingUp = velocity.y === -1
      const isMovingLeft = velocity.x === -1
      const isMovingDown = velocity.y === 1
      const isMovingRight = velocity.x === 1

      if (position.x === 0 && isMovingLeft) {
        onTravel()
        position.x = WIDTH;
        navigation.travelWest();
      }

      if (position.x === WIDTH - 1 && isMovingRight) {
        onTravel()
        position.x = 0;
        navigation.travelEast();
      }

      if (position.y === HEIGHT - 1 && isMovingDown) {
        onTravel()
        position.y = -1;
        navigation.travelSouth();
      }

      if (position.y === 0 && isMovingUp) {
        onTravel()
        position.y = HEIGHT;
        navigation.travelNorth();
      }
    }
  }
}