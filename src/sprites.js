import { CELL_SIZE } from "./config.js";
import {TILES} from './tiles.js'

export const spriteSheet = "tiles.png"

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
const mapToSpriteSheet = ([x, y]) => [x * CELL_SIZE, y * CELL_SIZE];
export const spriteMap = {
  [TILES.wall]: mapToSpriteSheet(sprites.rock),
  [TILES.empty]: mapToSpriteSheet(sprites.nothing),
  [TILES.dirt]: mapToSpriteSheet(sprites.dirt),
  [TILES.grass]: mapToSpriteSheet(sprites.grassDry),
};

export const mapTospriteSheetCoordinates = (index) => -(index * CELL_SIZE)
