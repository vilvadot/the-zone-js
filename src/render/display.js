import ROT from "../lib/rot.js";
import { WIDTH, HEIGHT } from "../config.js";
import { spriteSheet, SPRITES } from '../sprites.js'

export const loadedTiles = document.createElement("img");
loadedTiles.src = spriteSheet;

export const OPTIONS = {
  layout: "tile",
  width: WIDTH,
  height: HEIGHT,
  tileWidth: 24,
  tileHeight: 24,
  tileColorize: true,
  tileSet: loadedTiles,
  tileMap: SPRITES
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

  clear(...params){
    this.display.clear(...params);
  }
}
