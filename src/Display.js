import { OPTIONS } from "./config.js";

export const initDisplay = () => {
  const asciiDisplay = new ROT.Display(OPTIONS);

  const canvas = document.getElementById("game");
  canvas.appendChild(asciiDisplay.getContainer());

  return asciiDisplay;
};

export class Display {
  constructor() {
    this.display = new ROT.Display(OPTIONS);

    const canvas = document.getElementById("game");
    canvas.appendChild(this.display.getContainer());
  }

  init(){
    return this.display;
  }
}
