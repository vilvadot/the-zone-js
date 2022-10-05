import { TILES } from "../tiles.js";
import { shadowMagnitude } from "./shadowMagnitude.js";

export class TerrainRenderer {
  static run(display, fov, terrain) {
    display.clear();

    fov.forEach((x, y, distance) => {
      const tinting = `rgba(0,0,0,${1 - shadowMagnitude(distance)}`;
      const sprite = getSprite(terrain, x, y);
      display.draw(x, y, sprite, tinting);
    });
  }
}

const getSprite = (terrain, x, y) => {
  const value = terrain.getTileAt(x, y);

  if (isWoodWall(value)) {
    return getWallSprite(terrain, x, y);
  }
  return value;
};

const isWoodWall = (tile) => tile === TILES.woodWall;
const getWallSprite = (terrain, x, y) => {
  const north = terrain.getTileAt(x, y - 1);
  const south = terrain.getTileAt(x, y + 1);
  const east = terrain.getTileAt(x + 1, y);
  const west = terrain.getTileAt(x - 1, y);
  if (isWoodWall(east) && isWoodWall(south)) return "wallTopLeft";
  if (isWoodWall(west) && isWoodWall(south)) return "wallTopRight";
  if (isWoodWall(north) && isWoodWall(east)) return "wallBottomRight";
  if (isWoodWall(north) && isWoodWall(west)) return "wallBottomLeft";
  if (isWoodWall(north) || isWoodWall(south)) return "wallVertical";
  return "wallHorizontal";
};
