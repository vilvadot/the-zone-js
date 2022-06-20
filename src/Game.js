import { EVENTS } from "./Bus.js";

export class Game {
  constructor(bus, display, world, actors) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.actors = actors;
    this.world.generate()
  }

  runMainLoop() {
    this.bus.subscribe(EVENTS.PLAYER_MOVED, () => {
      this.draw()
    })
  }

  init() {
    this.draw();
    this.runMainLoop()
  }

  draw() {
    this.display.clear();
    this.world.draw();
    this.actors.forEach(actor => actor.draw())
  }
}