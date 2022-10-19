import { HEIGHT, WIDTH } from "../config.js";

export class Travel {
  static run(entities, navigation, entityManager, onTravel) {
    for (const { position, velocity, isPlayer } of entities) {
      if (!isPlayer) continue;

      const currentArea = navigation.getAreaCoordinates();
      const isMovingUp = velocity.y === -1
      const isMovingLeft = velocity.x === -1
      const isMovingDown = velocity.y === 1
      const isMovingRight = velocity.x === 1

      if (position.x === 0 && isMovingLeft) {
        entityManager.reset(currentArea);
        navigation.travelWest();
        onTravel()
        position.x = WIDTH;
      }

      if (position.x === WIDTH - 1 && isMovingRight) {
        entityManager.reset(currentArea);
        navigation.travelEast();
        onTravel()
        position.x = -1;
      }

      if (position.y === HEIGHT - 1 && isMovingDown) {
        entityManager.reset(currentArea);
        navigation.travelSouth();
        onTravel()
        position.y = -1;
      }

      if (position.y === 0 && isMovingUp) {
        entityManager.reset(currentArea);
        navigation.travelNorth();
        onTravel()
        position.y = HEIGHT;
      }
    }
  }
}