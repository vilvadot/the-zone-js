import { Entities } from "../entities/index.js";
import { ACTION, ACTION_NAME, MOVE_PAYLOAD } from "../actions.js";
import { Logger } from "../infra/logger.js";
import { GameMode, Mode } from "../GameMode.js";

export class KeyboardControl {
  static run(action: ACTION, entities: Entities, gameMode: GameMode, logger: Logger) {
    HandleAim.do(gameMode, action, logger)
    HandleMove.do(action, entities);
  }
}

class HandleAim {
  static do(gameMode: GameMode, action: ACTION, logger: Logger) {
    if (gameMode.mode === Mode.aiming && action.name === ACTION_NAME.AIM) {
      logger.log("You lower your weapon");
      gameMode.mode = Mode.movement;
      return;
    }

    if (gameMode.mode === Mode.aiming && action.name !== ACTION_NAME.TARGET) {
      gameMode.mode = Mode.movement;
      logger.log("You lower your weapon");
    }

    if (action.name === ACTION_NAME.AIM) {
      logger.log("You ready your weapon aim through the sights...click on a target to shoot");
      gameMode.mode = Mode.aiming;
    }
  }
}

class HandleMove {
  static do(action: ACTION, entities: Entities) {
    if (action.name == ACTION_NAME.MOVE) {
      for (const { keyboardControlled, velocity } of entities) {
        if (!keyboardControlled || !velocity)
          continue;

        const STEP = 1;

        const { direction } = action.payload as MOVE_PAYLOAD;

        if (direction === "east")
          velocity.x += STEP;
        if (direction === "west")
          velocity.x -= STEP;
        if (direction === "north")
          velocity.y -= STEP;
        if (direction === "south")
          velocity.y += STEP;
      }
    }
  }
}