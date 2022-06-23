import { EVENTS } from "./events.js";
import { InputMovement, Drawing } from "./systems/index.js";

export class Game {
  constructor(bus, display, world, entities) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.entities = entities;
    this.world.generate();
  }

  runMainLoop() {
    this.world.draw();
    Spawn.run(this.entities, this.world);
    this.draw();
    this.bus.subscribe(EVENTS.INPUT_PRESSED, () => {
      InputMovement.run(this.entities, this.world);
      this.draw();
    });
  }

  draw() {
    Drawing.run(this.entities);
  }
}
