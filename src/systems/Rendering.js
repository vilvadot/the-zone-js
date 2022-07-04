import { addNodeToGame, positionNodeInCanvas } from "../util.js";

export class Rendering {
  static run(entities) {
    for (const { sprite, position } of entities) {
      if (!sprite || !position) continue;

      const $node = sprite.node || addTileNodeToGame(sprite.id);
      
      if(sprite.isHidden){
        $node.style.display = 'none';
      }

      if ($node.innerHTML !== sprite.tile) $node.innerHTML = sprite.tile;
      positionNodeInCanvas($node, position.x, position.y)
      $node.style.zIndex = sprite.zIndex;
      $node.style.color = sprite.color;


      sprite.node = $node;
    }
  }
}

export const addTileNodeToGame = (id) => {
  const $tile = document.createElement("div");
  $tile.className = "tile animate--movement";
  $tile.id = id;
  $tile.title = id;

  addNodeToGame($tile);

  return $tile;
};
