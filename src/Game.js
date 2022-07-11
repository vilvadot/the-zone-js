import { EVENTS } from "./events.js";
import {
  KeyboardControl,
  Rendering,
  Death,
  Combat,
  Spawn,
  Pathfinding,
  Movement,
  Collision,
  Pickup,
  Targetting,
  Animation,
  Sound
} from "./systems/index.js";
import { takeControlOfInputs } from "./input.js";
import { UIRendering } from "./ui/system.js";
import { initializeEntityDebugSystem } from "./debug.js";
import { Corpse } from "./entities/index.js";
import { Logger } from "./Logger.js";

export class Game {
  constructor(bus, display, world, entities) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.entities = entities;
    this.world.generate();
    this.turn = 0;
    takeControlOfInputs(bus);
    initializeEntityDebugSystem(this.entities);
    this.ui = new UIRendering(bus);
    this.logger = new Logger(bus);
    this.sound = new Sound(bus);
  }

  runMainLoop() {
    this.world.draw();
    Spawn.run(this.entities, this.world);
    Rendering.run(this.entities);
    this.ui.update(this.entities, this.turn);

    this.bus.subscribe(EVENTS.TURN_PASSED, (action) => {
      this.turn++;
      KeyboardControl.run(this.entities, action);
      Pickup.run(this.logger, this.entities, action);
      Targetting.run(this.entities, action);
      Pathfinding.run(this.entities, this.world);
      Movement.run(this.entities, this.world);
      Collision.run(this.entities);
      Combat.run(this.bus, this.logger, this.entities);
      Animation.run(this.entities);
      Death.run(this.entities, this); // TODO: Is there a better way of killing stuff?
      Rendering.run(this.entities);
      this.ui.update(this.entities, this.turn);
    });
  }

  reset(){
    console.log('reset!')
    window.location.reload()
  }

  kill(entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }
}
