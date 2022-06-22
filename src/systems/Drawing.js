export class Drawing {
  static run(entities){
    for (const { sprite, position } of entities) {
    if (!sprite || !position) return;

    const $node = sprite.node || addTileNodeToGame(sprite.id, sprite.tile);
    $node.style.top = position.y * 20;
    $node.style.left = position.x * 20;

    sprite.node = $node;
  }
  }
}


export const addTileNodeToGame = (id, character = "") => {
  const $game = document.querySelector("#game");
  const $enemy = document.createElement("div");
  $enemy.className = 'tile';
  $enemy.innerHTML = character;
  $enemy.id = id;

  $game.appendChild($enemy);

  return $enemy
};