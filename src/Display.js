import ROT from "./lib/rot.js";
import { WIDTH, HEIGHT } from "./config.js";
import { tileset, tileMap } from './tiles.js'

export const loadedTiles = document.createElement("img");
loadedTiles.src = tileset;

export const OPTIONS = {
  layout: "tile",
  bg: "transparent",
  width: WIDTH,
  height: HEIGHT,
  tileWidth: 24,
  tileHeight: 24,
  forceSquareRatio: true,
  tileSet: loadedTiles,
  tileMap
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
