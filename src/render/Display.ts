import ROT from "../lib/rot.js";
import { WIDTH, HEIGHT, isTextMode, TILE_SIZE } from "../config.js";
import { spriteSheet, SPRITES } from '../sprites.js'

export const loadedTiles = document.createElement("img");
loadedTiles.src = spriteSheet;

export const OPTIONS_TILEMODE = {
  layout: "tile",
  width: WIDTH,
  height: HEIGHT,
  tileWidth: TILE_SIZE,
  tileHeight: TILE_SIZE,
  tileColorize: true,
  tileSet: loadedTiles,
  tileMap: SPRITES
};

export const OPTIONS_TEXTMODE = {
  width: WIDTH,
  height: HEIGHT,
  fontSize: 24,
};

const OPTIONS = isTextMode() ? OPTIONS_TEXTMODE : OPTIONS_TILEMODE;

export class Display {
  display: ROT.Display;

  constructor() {
    this.display = new ROT.Display(OPTIONS);

    const canvas = document.getElementById("board");
    canvas!.appendChild(this.display.getContainer());
  }

  draw(...params) {
    this.display.draw(...params);
  }

  clear(){
    this.display.clear();
  }
}
