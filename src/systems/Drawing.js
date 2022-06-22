export class Drawing {
  static run(entities) {
    for (const { sprite, position } of entities) {
      if (!sprite || !position) return;

      const $node = sprite.node || addTileNodeToGame(sprite.id, sprite.tile);
      $node.style.top = `${canvasCoordinates(position.y)}px`;
      $node.style.left = `${canvasCoordinates(position.x)}px`;

      sprite.node = $node;
    }
  }
}

export const canvasCoordinates = (value) => {
  const CELL_SIZE = 20;
  return value * CELL_SIZE;
};

const addTileNodeToGame = (id, character = "") => {
  const $game = document.querySelector("#game");
  const $tile = document.createElement("div");
  $tile.className = "tile";
  $tile.innerHTML = character;
  $tile.id = id;

  $game.appendChild($tile);

  return $tile;
};
