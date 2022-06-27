import { EVENTS } from "./events.js";
import {
  KeyboardControl,
  Rendering,
  Death,
  Combat,
  Spawn,
  FollowTarget,
  Movement,
} from "./systems/index.js";
import { takeControlOfInputs } from "./input.js";

export class Game {
  constructor(bus, display, world, entities) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.entities = entities;
    this.world.generate();
    takeControlOfInputs(bus);
  }

  runMainLoop() {
    this.world.draw();
    Spawn.run(this.entities, this.world);
    Rendering.run(this.entities);

    this.bus.subscribe(EVENTS.TURN_PASSED, (action) => {
      KeyboardControl.run(this.entities, action);
      Combat.run(this.entities);
      Death.run(this.entities);
      FollowTarget.run(this.entities, this.world);
      Movement.run(this.entities, this.world);
      Rendering.run(this.entities);
    });
  }
}
