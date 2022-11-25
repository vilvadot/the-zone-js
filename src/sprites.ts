import { TILE_SIZE } from "./config.js";
import { Coordinate } from "./Coordinate.js";

const graphicCoordinates = {
  nothing: [17, 0],
  brickWall: [5, 3],
  blood: [4, 10],
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
  bullet: [15, 2],
  snake: [8, 8],
  dog: [6, 8],
  knight: [0, 8],
  bottle: [14, 6],
  mushroom: [17, 4],
  grass: [12, 4],
  grassDry: [11, 4],
  corpse: [8, 18],
  dirt: [8, 2],
};

const mapToSpriteSheet = ([x, y] : Coordinate) => [x * TILE_SIZE, y * TILE_SIZE];

export const SPRITES = {
  bullet: mapToSpriteSheet(graphicCoordinates.bullet),
  corpse: mapToSpriteSheet(graphicCoordinates.corpse),
  dirt: mapToSpriteSheet(graphicCoordinates.dirt),
  dog: mapToSpriteSheet(graphicCoordinates.dog),
  empty: mapToSpriteSheet(graphicCoordinates.nothing),
  grass: mapToSpriteSheet(graphicCoordinates.grassDry),
  hit: mapToSpriteSheet(graphicCoordinates.blood),
  knight: mapToSpriteSheet(graphicCoordinates.knight),
  plank: mapToSpriteSheet(graphicCoordinates.plank),
  rock: mapToSpriteSheet(graphicCoordinates.rock),
  snake: mapToSpriteSheet(graphicCoordinates.snake),
  wallBottomLeft: mapToSpriteSheet(graphicCoordinates.woodWall.bottomLeft),
  wallBottomRight: mapToSpriteSheet(graphicCoordinates.woodWall.bottomright),
  wallHorizontal: mapToSpriteSheet(graphicCoordinates.woodWall.horizontal),
  wallTopLeft: mapToSpriteSheet(graphicCoordinates.woodWall.topLeft),
  wallTopRight: mapToSpriteSheet(graphicCoordinates.woodWall.topRight),
  wallVertical: mapToSpriteSheet(graphicCoordinates.woodWall.vertical),
};


export const spriteSheet = "./static/tiles24x24.png";

export const mapTospriteSheetCoordinates = (index: number) => -index;
