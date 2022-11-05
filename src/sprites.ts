import { CELL_SIZE } from "./config.js";
import { Coordinate } from "./Coordinate.js";

const graphicCoordinates = {
  nothing: [17, 0],
  brickWall: [5, 3],
  woodWall: {
    horizontal: [1, 16],
    vertical: [12, 16],
    topLeft: [0, 16],
    topRight: [2, 16],
    bottomLeft: [11, 16],
    bottomright: [10, 16],
  },
  plank: [12, 3],
  rock: [18, 2],
  myRock: [19, 2],
  snake: [8, 8],
  knight: [0, 8],
  bottle: [14, 6],
  mushroom: [17, 4],
  grass: [12, 4],
  grassDry: [11, 4],
  corpse: [8, 18],
  dirt: [8, 2],
};

const mapToSpriteSheet = ([x, y] : Coordinate) => [x * CELL_SIZE, y * CELL_SIZE];

export const SPRITES = {
  wallVertical: mapToSpriteSheet(graphicCoordinates.woodWall.vertical),
  wallHorizontal: mapToSpriteSheet(graphicCoordinates.woodWall.horizontal),
  wallTopLeft: mapToSpriteSheet(graphicCoordinates.woodWall.topLeft),
  wallTopRight: mapToSpriteSheet(graphicCoordinates.woodWall.topRight),
  wallBottomLeft: mapToSpriteSheet(graphicCoordinates.woodWall.bottomLeft),
  wallBottomRight: mapToSpriteSheet(graphicCoordinates.woodWall.bottomright),
  knight: mapToSpriteSheet(graphicCoordinates.knight),
  snake: mapToSpriteSheet(graphicCoordinates.snake),
  corpse: mapToSpriteSheet(graphicCoordinates.corpse),
  rock: mapToSpriteSheet(graphicCoordinates.rock),
  plank: mapToSpriteSheet(graphicCoordinates.plank),
  empty: mapToSpriteSheet(graphicCoordinates.nothing),
  dirt: mapToSpriteSheet(graphicCoordinates.dirt),
  grass: mapToSpriteSheet(graphicCoordinates.grassDry),
};


export const spriteSheet = "./static/tiles.png";

export const mapTospriteSheetCoordinates = (index: number) => -index;
