import { EVENTS } from "./events.js";
import {
  KeyboardControl,
  Rendering,
  Death,
  Combat,
  Spawn,
  Following,
  Movement,
  Collision,
  Pickup,
  Targetting,
} from "./systems/index.js";
import { takeControlOfInputs } from "./input.js";
import { UIRendering } from "./ui/system.js";
import { initializeDebugSystem } from "./debug.js";
import { Corpse } from "../entities/index.js";
import { logger } from "./logger.js";

// CONCERN: Not tested
export class Game {
  constructor(bus, display, world, entities) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.entities = entities;
    this.world.generate();
    this.turns = 0;
    takeControlOfInputs(bus);
    initializeDebugSystem(this.entities)
  }

  runMainLoop() {
    this.world.draw();
    Spawn.run(this.entities, this.world);
    Rendering.run(this.entities);
    UIRendering.run(this.entities, this.turns);

    this.bus.subscribe(EVENTS.TURN_PASSED, (action) => {
      this.turns++;
      KeyboardControl.run(this.entities, action);
      Pickup.run(this.entities, action);
      Targetting.run(this.entities, action);
      Following.run(this.entities, this.world);
      Movement.run(this.entities, this.world);
      Collision.run(this.entities);
      Combat.run(this.entities);
      Death.run(this.entities, this);
      Rendering.run(this.entities);
      UIRendering.run(this.entities, this.turns);
      logger.debug(`🎲 Turn passed: ${this.turns}`)
    });
  }

  kill(entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }
}
