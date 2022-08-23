import ROT from "./lib/rot.js";
import { WIDTH, HEIGHT, CELL_SIZE } from "./config.js";

export const OPTIONS = {
  bg: "transparent",
  fontFamily: "Fira Mono",
  width: WIDTH,
  height: HEIGHT,
  fontSize: CELL_SIZE,
  forceSquareRatio: true,
};

export class Display {
  constructor() {
    this.display = new ROT.Display(OPTIONS);

    const canvas = document.getElementById("game");
    canvas.appendChild(this.display.getContainer());
  }

  draw(...params) {
    this.display.draw(...params);
  }
}
