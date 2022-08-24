import { CELL_SIZE } from "../config.js";
import { addNodeToGame, positionNodeInCanvas, capitalize } from "../util.js";

export class Rendering {
  static run(entities) {
    for (const { id, sprite, position } of entities) {
      if (!sprite || !position) continue;

      let $node = findTile(id) || createTile(id, sprite);

      if (sprite.isHidden) $node.style.display = "none";

      positionNodeInCanvas($node, position.x, position.y);
    }
  }
}

export const createTile = (id, sprite) => {
  const $tile = document.createElement("div");

  $tile.style.width = CELL_SIZE;
  $tile.style.height = CELL_SIZE;
  $tile.style.fontSize = CELL_SIZE;
  $tile.style.zIndex = 2;
  $tile.style.background = `url(${sprite.tileset})`
  $tile.style.backgroundPosition = `${sprite.x}px ${sprite.y}px`
  
  $tile.className = "tile animate--movement";
  $tile.id = id;
  $tile.title = capitalize(id);

  addNodeToGame($tile);

  return $tile;
};

const findTile = id => document.querySelector(`#${id}`)
