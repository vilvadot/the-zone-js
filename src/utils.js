export const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const addTileNodeToGame = (id) => {
  const $game = document.querySelector("#game");
  const $enemy = document.createElement("div");
  $enemy.className = 'tile';
  $enemy.id = id;

  $game.appendChild($enemy);

  return $enemy
};