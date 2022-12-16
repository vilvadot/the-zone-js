import { AnimationQueue } from "../animations/index.js";
import { DEBUG_ENABLED } from "../config.js";
import { FOVIndex } from "../fov-index.js";
import { Debug } from "../infra/debug.js";
import { Terrain } from "../terrain/Terrain.js";
import { TILES } from "../tiles.js";
import { Display } from "./Display.js";
import { shadowMagnitude } from "./shadowMagnitude.js";

export class TileRenderer {
  static run(
    display: Display,
    fov: FOVIndex,
    terrain: Terrain,
    entities,
    animations: AnimationQueue,
    mouse?
  ) {
    display.clear();
    const animation = animations.composeNextFrame();
    
    fov.forEach((x, y, { distance, isBlocked }) => {
      const isMouseHover = x === mouse?.x && y === mouse?.y;
      
      const stack = this.generateTileStack(x, y, terrain, entities, animation);
      
      if (isMouseHover) {
        Debug.log(`${x}, ${y}, ${distance}, ${isBlocked}, ${stack}`)
      };
      
      const tint = getTint(distance, isBlocked, isMouseHover);
      display.draw(x, y, stack, tint);
    });
  }

  private static generateTileStack(x, y, terrain, entities, animation) {
    const stack: string[] = [];

    const base = getTerrainSprite(terrain, x, y);
    const entity = getEntitySprite(entities, x, y);
    const animationTile = animation?.getValue(x, y);

    if (base) stack.push(base);
    if (entity) stack.push(entity);
    if (animationTile) stack.push(animationTile);

    return stack;
  }
}

const getTint = (distance, isBlocked, isMouseHover) => {
  if (isMouseHover) return `rgba(255,255,255, .3)`
  if (DEBUG_ENABLED && isBlocked) return `rgba(0,0,255, .3)`
  if (DEBUG_ENABLED) return `rgba(255,0,255, .3)`

  const opacity = 1 - shadowMagnitude(distance);
  return `rgba(0,0,0, ${opacity})`;
};

const getEntitySprite = (entities, x, y) => {
  const entity = entities.find(
    ({ position }) => position.x === x && position.y === y
  );

  return entity?.sprite?.name;
};

const getTerrainSprite = (terrain, x, y) => {
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
