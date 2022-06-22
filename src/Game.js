import { EVENTS } from "./events.js";
import { InputMovement, Drawing } from "./systems/index.js";

export class Game {
  constructor(bus, display, world, entities) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.entities = entities;
    this.world.generate();
    this.world.draw();
    this.draw()
  }

  runMainLoop() {
    this.bus.subscribe(EVENTS.INPUT_PRESSED, () => {
      InputMovement.run(this.entities);
      this.draw();
    });
  }

  draw() {
    Drawing.run(this.entities);
  }
}
