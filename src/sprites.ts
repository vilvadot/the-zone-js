import { TILE_SIZE } from "./config.js";
import { Coordinate } from "./Coordinate.js";

const sprite = (x:number, y: number) => [x * TILE_SIZE, y * TILE_SIZE]

export const SPRITES = {
  anomaly: sprite(17, 2),
  bullet: sprite(15, 2),
  cheese: sprite(7,6),
  corpse: sprite(8, 18),
  dirt: sprite(8, 2),
  dog: sprite(6, 8),
  empty: sprite(17, 0),
  flame: sprite(12, 10),
  grass: sprite(12, 4),
  hit: sprite(4, 10),
  knight: sprite(0, 8),
  man: sprite(4, 8),
  plank: sprite(12, 3),
  rock: sprite(18, 2),
  snake: sprite(8, 8),
  leather: sprite(12, 7),
  wallBottomLeft: sprite(11, 16),
  wallBottomRight: sprite(10, 16),
  wallHorizontal: sprite(1, 16),
  wallTopLeft: sprite(0, 16),
  wallTopRight: sprite(2, 16),
  wallVertical: sprite(12, 16),
};

export const spriteSheet = "./static/tiles24x24.png";

export const mapTospriteSheetCoordinates = (index: number) => -index;
