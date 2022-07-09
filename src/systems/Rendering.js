import { addNodeToGame, positionNodeInCanvas } from "../util.js";

export class Rendering {
  static run(entities) {
    for (const { id, name, sprite, position } of entities) {
      if (!sprite || !position) continue;

      const $node = sprite.node || addTileNodeToGame(id, name);

      if (sprite.isHidden) {
        $node.style.display = "none";
      }
      $node.style.zIndex = sprite.zIndex;
      $node.style.color = sprite.color;
      positionNodeInCanvas($node, position.x, position.y);

      sprite.node = $node;

      const $glyph = $node.querySelector("#glyph");
      if ($glyph.innerHTML !== sprite.tile) $glyph.innerHTML = sprite.tile;
      $glyph.className = sprite.className;
    }
  }
}

export const addTileNodeToGame = (id, name) => {
  const $tile = document.createElement("div");
  $tile.className = "tile animate--movement";
  const $glyph = document.createElement("span");
  $glyph.id = "glyph";
  $tile.appendChild($glyph);

  $tile.id = id;
  $tile.title = name;

  addNodeToGame($tile);

  return $tile;
};
