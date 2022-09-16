import { CELL_SIZE } from "../config.js";
import { addNodeToGame, positionNodeInCanvas, findTile, shadowMagnitude } from "../util.js";

export class Rendering {
  static run(entities, fov) {
    for (const { id, sprite, position, isPlayer } of entities) {
      if (!sprite || !position) continue;

      let $node = findTile(id) || addTileToGame(id, sprite);

      const distanceToPlayer = fov.getDistance(position.x, position.y)

      if (!distanceToPlayer && !isPlayer){
        $node.remove()
      }

      if(!isPlayer){
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
  $tile.style.background = `url(${sprite.tileset})`;
  $tile.style.backgroundPosition = `${sprite.x}px ${sprite.y}px`;
  $tile.className = `tile ${sprite.additionalClass}`;
  $tile.id = id;
  $tile.title = id;

  return $tile;
};