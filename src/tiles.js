import { CELL_SIZE } from "./config.js";

const ascii = {
  wall: "◻︎",
  empty: "x",
  anomaly: "☸︎",
  player: "@",
  corpse: "X",
  enemy: "E",
};

export const TILES = ascii;

export const mapToTilesetCoordinates = (index) => -(index * CELL_SIZE)
const tileInMap = (x, y) => [x * CELL_SIZE, y * CELL_SIZE];
export const tileMap = {
  [TILES.wall]: tileInMap(7, 3),
  [TILES.empty]: tileInMap(0, 20),
};

export const tileset = "tiles.png"

