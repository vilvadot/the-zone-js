export class Game {
  constructor(display, world) {
    this.display = display;
    this.world = world;
    this.world.generate()
  }

  init() {
    this.draw();
  }

  draw() {
    this.display.clear();
    this.world.draw();
  }
}