import { Entities } from "../entities/index.js";
import { ACTION, ACTION_NAME, MOVE_PAYLOAD } from "../actions.js";
import { LOG_LEVEL, Logger } from "../infra/logger.js";
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
    const noLongerAimingMessage =
      "You lower your weapon. You are no longer aiming.";

    if (mode.isAiming() && action.name === ACTION_NAME.AIM) {
      logger.log(noLongerAimingMessage, LOG_LEVEL.explanation);
      mode.set(Mode.movement);
      return;
    }

    if (mode.isAiming() && action.name !== ACTION_NAME.TARGET) {
      mode.set(Mode.movement);
      logger.log(noLongerAimingMessage, LOG_LEVEL.explanation);
    }

    if (action.name === ACTION_NAME.AIM) {
      logger.log(
        "You ready your weapon, aiming through the sights you wait for the perfect moment to shoot at your target...",
        LOG_LEVEL.explanation
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
