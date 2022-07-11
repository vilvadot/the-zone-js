import { OPTIONS } from "./config.js";
import ROT from './lib/rot.js'

export class Display {
  constructor() {
    this.display = new ROT.Display(OPTIONS);

    const canvas = document.getElementById("game");
    canvas.appendChild(this.display.getContainer());
  }

  draw(...params){
    this.display.draw(...params)
  }
}
