import { CELL_SIZE } from "../config.js";
import {
  addNodeToGame,
  positionNodeInCanvas,
  findTile,
  shadowMagnitude,
} from "../util.js";
import { spriteSheet, mapTospriteSheetCoordinates } from "../sprites.js";
import { ANIMATIONS } from "./animations.js";

export class EntityRenderer {
  static run(entities, fov) {
    for (const { id, sprite, position, isPlayer, animation } of entities) {
      if (!sprite || !position) continue;

      let $node = findTile(id) || addTileToGame(id, sprite);

      const distanceToPlayer = fov.getDistance(position.x, position.y);

      if (!distanceToPlayer && !isPlayer) {
        $node.style.visibility = "hidden";
      } else {
        $node.style.visibility = "visible";
      }

      if (animation?.isActive) {
        const animationClassName = `animation--${animation.name}`;
        $node.classList.add(animationClassName);
        setTimeout(() => {
          animation.isActive = false;
          $node.classList.remove(animationClassName);
        }, ANIMATIONS[animation.name].duration);
      }

      if (!isPlayer) {
        $node.style.filter = `brightness(${shadowMagnitude(distanceToPlayer)})`;
      }

      positionNodeInCanvas($node, position.x, position.y);
    }
  }
}

const addTileToGame = (id, sprite) => {
  const $tile = createTile(id, sprite);
  addNodeToGame($tile);

  return $tile;
};

export const createTile = (id, sprite) => {
  const $tile = document.createElement("div");

  $tile.style.width = CELL_SIZE;
  $tile.style.height = CELL_SIZE;
  $tile.style.fontSize = CELL_SIZE;
  $tile.style.zIndex = sprite.zIndex;
  $tile.style.background = `url(${spriteSheet})`;
  $tile.style.backgroundPosition = `${mapTospriteSheetCoordinates(
    sprite.x
  )}px ${mapTospriteSheetCoordinates(sprite.y)}px`;
  $tile.className = `tile ${sprite.additionalClass}`;
  $tile.id = id;
  $tile.title = id;

  return $tile;
};
