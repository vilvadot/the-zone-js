import {
  KeyboardControl,
  Rendering,
  Death,
  Combat,
  Spawn,
  Pathfinding,
  Movement,
  Collision,
  Targetting,
  Animation,
  WorldRendering,
  Travel,
} from "./systems/index.js";
import { UIRendering } from "./ui/system.js";
import { initializeEntityDebugSystem } from "./debug.js";
import { Corpse } from "./entities/index.js";
import { Logger } from "./Logger.js";
import { FOVIndex } from "./fov-index.js";

export class Game {
  constructor(bus, display, world, entities, player) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.entities = [player, ...entities];
    this.player = player;
    this.turn = 0;
    this.ui = new UIRendering(bus);
    this.logger = new Logger(bus);
    this.fov = new FOVIndex();
    initializeEntityDebugSystem(this.entities);
    this.createNewArea();
  }

  createNewArea() {
    this.world.generate();
    Spawn.run(this.entities, this.world);
  }

  runMainLoop(action) {
    this.turn++;
    this.ui.update(this.entities, this.turn);
    KeyboardControl.run(this.entities, action);
    Travel.run(this.entities, this.world, this.display);
    Movement.run(this.entities, this.world);
    this.fov.update(this.player, this.world);
    WorldRendering.run(this.display, this.fov, this.world);
    Rendering.run(this.entities, this.fov);
    Targetting.run(this.entities, action);
    Pathfinding.run(this.entities, this.world);
    Collision.run(this.entities);
    Combat.run(this.bus, this.logger, this.entities);
    Animation.run(this.entities);
    Death.run(this.entities, this); // TODO: Is there a better way of killing stuff?
  }

  reset() {
    window.location.reload();
  }

  kill(entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }
}
