export class Rendering {
  static run(entities) {
    for (const { sprite, position } of entities) {
      if (!sprite || !position) continue;

      const $node = sprite.node || addTileNodeToGame(sprite.id);

      if ($node.innerHTML !== sprite.tile) $node.innerHTML = sprite.tile
      $node.style.top = `${canvasCoordinates(position.y)}px`;
      $node.style.left = `${canvasCoordinates(position.x)}px`;
      $node.style.zIndex = sprite.zIndex;
      $node.style.color = sprite.color;

      sprite.node = $node;
    }
  }
}

export const canvasCoordinates = (value) => {
  const CELL_SIZE = 20;
  return value * CELL_SIZE;
};

const addTileNodeToGame = (id) => {
  const $game = document.querySelector("#game");
  const $tile = document.createElement("div");
  $tile.className = "tile";
  $tile.id = id;

  $game.appendChild($tile);

  return $tile;
};
