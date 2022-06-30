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
  Targetting,
} from "./systems/index.js";
import { takeControlOfInputs } from "./input.js";
import { UIRendering } from "./ui.js";
import { initializeDebugSystem } from "./debug.js";
import { Corpse } from "../entities/index.js";

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

    this.bus.subscribe(EVENTS.TURN_PASSED, (action) => {
      Death.run(this.entities, this);
      this.turns++;
      KeyboardControl.run(this.entities, action);
      Targetting.run(this.entities);
      Combat.run(this.entities);
      Following.run(this.entities, this.world);
      Movement.run(this.entities, this.world);
      Collision.run(this.entities);
      Rendering.run(this.entities);
      UIRendering.run(this.turns);
    });
  }

  kill(entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }
}
