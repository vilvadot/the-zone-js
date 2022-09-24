import { CELL_SIZE } from "./config.js";

const ascii = {
  wall: "◻︎",
  empty: "x",
  dirt: ".",
  grass: ",",
  anomaly: "☸︎",
  player: "@",
  corpse: "X",
  enemy: "E",
};

export const sprites = {
  nothing: [20, 0],
  brickWall: [5, 3],
  rock: [18, 2],
  myRock: [19, 2],
  snake: [8,8],
  knight: [0, 8],
  bottle: [14, 6],
  mushroom: [17, 4],
  grass: [12, 4],
  grassDry: [11, 4],
  corpse: [8, 18],
  dirt: [8, 2],
}

export const TILES = ascii;

export const mapToTilesetCoordinates = (index) => -(index * CELL_SIZE)
const tileInMap = ([x, y]) => [x * CELL_SIZE, y * CELL_SIZE];

export const tileMap = {
  [TILES.wall]: tileInMap(sprites.rock),
  [TILES.empty]: tileInMap(sprites.nothing),
  [TILES.dirt]: tileInMap(sprites.dirt),
  [TILES.grass]: tileInMap(sprites.grassDry),
};

export const tileset = "tiles.png"

