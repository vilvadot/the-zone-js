import { EVENTS } from "./events.js";
import {
  KeyboardControl,
  Rendering,
  Death,
  Combat,
  Spawn,
  FollowTarget,
  Movement,
  Targetting,
  UIRendering
} from "./systems/index.js";
import { takeControlOfInputs } from "./input.js";
import { Corpse } from '../entities/index.js';

export class Game {
  constructor(bus, display, world, entities) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.entities = entities;
    this.world.generate();
    this.turns = 0;
    takeControlOfInputs(bus);
  }

  runMainLoop() {
    this.world.draw();
    Spawn.run(this.entities, this.world);
    Rendering.run(this.entities);

    this.bus.subscribe(EVENTS.TURN_PASSED, (action) => {
      this.turns++
      KeyboardControl.run(this.entities, action);
      Targetting.run(this.entities)
      Combat.run(this.entities);
      FollowTarget.run(this.entities, this.world);
      Death.run(this.entities, this);
      Movement.run(this.entities, this.world);
      Rendering.run(this.entities);
      UIRendering.run(this.entities, this.turns)
    });
  }

  kill(entity){
    this.entities = this.entities.filter(({id}) => id !== entity.id)
    this.entities.push(new Corpse(entity))
  }
}
