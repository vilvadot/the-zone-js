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
import { Logger } from "./Logger.js";

// CONCERN: Not tested
export class Game {
  constructor(bus, display, world, entities) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.entities = entities;
    this.world.generate();
    this.turn = 0;
    takeControlOfInputs(bus);
    initializeDebugSystem(this.entities)
    this.ui = new UIRendering(bus)
    this.logger = new Logger(bus)
  }

  runMainLoop() {
    this.world.draw();
    Spawn.run(this.entities, this.world);
    Rendering.run(this.entities);
    this.ui.update(this.entities, this.turn)

    this.bus.subscribe(EVENTS.TURN_PASSED, (action) => {
      this.turn++;
      KeyboardControl.run(this.entities, action);
      Pickup.run(this.entities, action, this.logger);
      Targetting.run(this.entities, action);
      Following.run(this.entities, this.world);
      Movement.run(this.entities, this.world);
      Collision.run(this.entities);
      Combat.run(this.entities, this.logger);
      Death.run(this.entities, this);
      Rendering.run(this.entities);
      this.ui.update(this.entities, this.turn);
    });
  }

  kill(entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }
}
