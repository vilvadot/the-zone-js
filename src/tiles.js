import { CELL_SIZE } from "./config.js";

const ascii = {
  wall: "◻︎",
  empty: "x",
  anomaly: "☸︎",
  player: "@",
  corpse: "X",
  enemy: "E",
};

export const sprites = {
  wall: [5, 3],
  snake: [8,8],
  knight: [0, 8],
  bottle: [14, 6],
  mushroom: [17, 4],
  // nothing: [0, 20],
  nothing: [12, 4],
  corpse: [8, 18]
}

export const TILES = ascii;

export const mapToTilesetCoordinates = (index) => -(index * CELL_SIZE)
const tileInMap = ([x, y]) => [x * CELL_SIZE, y * CELL_SIZE];

export const tileMap = {
  [TILES.wall]: tileInMap(sprites.wall),
  [TILES.empty]: tileInMap(sprites.nothing),
};

export const tileset = "tiles.png"

