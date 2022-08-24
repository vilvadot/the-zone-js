import { CELL_SIZE } from "./config.js";

const ascii = {
  wall: "◻︎",
  empty: "x",
  anomaly: "☸︎",
  player: "@",
  corpse: "X",
  enemy: "E",
};

export const tileSet = document.createElement("img");
tileSet.src = "tiles.png";


export const tile = (x, y) => [x * CELL_SIZE, y * CELL_SIZE];

export const TILES = ascii;

export const tileMap = {
  [TILES.wall]: tile(7, 3),
  [TILES.empty]: tile(0, 20),
};

