import { EVENTS } from "./Bus.js";

export class Game {
  constructor(bus, display, world, character) {
    this.bus = bus;
    this.display = display;
    this.world = world;
    this.character = character;
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
    this.character.draw();
  }
}