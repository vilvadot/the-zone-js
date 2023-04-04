import { Entities } from "../entities/index.js";
import { ACTION, ACTION_NAME, MOVE_PAYLOAD } from "../actions.js";
import { Logger } from "../infra/logger.js";
import { GameMode, Mode } from "../GameMode.js";

// TODO: The name seems not appropiate
export class KeyboardControl {
  static run(
    action: ACTION,
    entities: Entities,
    mode: GameMode,
    logger: Logger
  ) {
    HandleAim.do(mode, action, logger);
    HandleMove.do(action, entities);
  }
}

// TODO: Not sure this belongs here
class HandleAim {
  static do(mode: GameMode, action: ACTION, logger: Logger) {
    if (mode.isAiming() && action.name === ACTION_NAME.AIM) {
      logger.log("You lower your weapon");
      mode.set(Mode.movement);
      return;
    }

    if (mode.isAiming() && action.name !== ACTION_NAME.TARGET) {
      mode.set(Mode.movement);
      logger.log("You lower your weapon");
    }

    if (action.name === ACTION_NAME.AIM) {
      logger.log(
        "You ready your weapon aim through the sights...click on a target to shoot"
      );
      mode.set(Mode.aiming);
    }
  }
}

class HandleMove {
  static do(action: ACTION, entities: Entities) {
    if (action.name == ACTION_NAME.MOVE) {
      for (const { keyboardControlled, velocity } of entities) {
        if (!keyboardControlled || !velocity) continue;

        const STEP = 1;

        const { direction } = action.payload as MOVE_PAYLOAD;

        if (direction === "east") velocity.x += STEP;
        if (direction === "west") velocity.x -= STEP;
        if (direction === "north") velocity.y -= STEP;
        if (direction === "south") velocity.y += STEP;
      }
    }
  }
}
