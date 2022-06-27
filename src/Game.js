import { EVENTS } from "./events.js";
import {
  KeyboardMovement,
  Drawing,
  Spawn,
  FollowTarget,
  Movement
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
    Drawing.run(this.entities);

    this.bus.subscribe(EVENTS.TURN_PASSED, (action) => {
      KeyboardMovement.run(this.entities, action);
      FollowTarget.run(this.entities, this.world);
      Movement.run(this.entities, this.world);
      Drawing.run(this.entities);
    });
  }
}
