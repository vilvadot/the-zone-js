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
  WorldRendering,
  Sound
} from "./systems/index.js";
import { takeControlOfInputs } from "./input.js";
import { UIRendering } from "./ui/system.js";
import { initializeEntityDebugSystem } from "./debug.js";
import { Corpse } from "./entities/index.js";
import { Logger } from "./Logger.js";
import { HEIGHT, WIDTH } from "./config.js";

class Travel {
  static run(entities, world, display) {
    for (const { id, sprite, position, velocity, isPlayer } of entities) {
      if (!isPlayer) continue;
      if (position.x === 0 && velocity.x === -1) {
        world.travelWest();
        position.x = WIDTH;
        display.clear();
      }

      if (position.x === WIDTH - 1 && velocity.x === 1) {
        world.travelEast();
        position.x = -1;
        display.clear();
      }

        console.log(velocity)
      if (position.y === HEIGHT - 1 && velocity.y === 1) {
        world.travelSouth();
        position.y = -1;
        display.clear();
      }

      if (position.y === 0 && velocity.y === -1) {
        world.travelNorth();
        position.y = HEIGHT;
        display.clear();
      }
    }
  }
}

export class Game {
  constructor(bus, display, world, entities) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.entities = entities;
    this.player = this.entities[0];
    this.turn = 0;
    takeControlOfInputs(bus);
    initializeEntityDebugSystem(this.entities);
    this.ui = new UIRendering(bus);
    this.logger = new Logger(bus);
    this.sound = new Sound(bus);
  }

  runMainLoop() {
    this.world.generate();  
    Spawn.run(this.entities, this.world);
    Rendering.run(this.entities);
    this.ui.update(this.entities, this.turn);
    WorldRendering.run(this.world, this.display, this.player);

    this.bus.subscribe(EVENTS.TURN_PASSED, (action) => {
      this.world.generate();
      this.turn++;
      KeyboardControl.run(this.entities, action);
      Travel.run(this.entities, this.world, this.display);
      Movement.run(this.entities, this.world);
      Pickup.run(this.logger, this.entities, action);
      Targetting.run(this.entities, action);
      Pathfinding.run(this.entities, this.world);
      Collision.run(this.entities);
      Combat.run(this.bus, this.logger, this.entities);
      Animation.run(this.entities);
      Death.run(this.entities, this); // TODO: Is there a better way of killing stuff?
      Rendering.run(this.entities);
      WorldRendering.run(this.world, this.display, this.player)
      this.ui.update(this.entities, this.turn);
    });
  }

  reset(){
    window.location.reload()
  }

  kill(entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }
}
