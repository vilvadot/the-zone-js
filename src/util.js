export const isInrange = (positionA, positionB) => {
  const distanceX = Math.abs(positionA.x - positionB.x);
  const distanceY = Math.abs(positionA.y - positionB.y);

  const horizontallyInRange = distanceX === 0 && distanceY === 1;
  const verticallyInRange = distanceX === 1 && distanceY === 0;
  if (horizontallyInRange || verticallyInRange) return true;
  
  return false
};

export const addNodeToGame = ($node) => {
  const $game = document.querySelector("#game");

  $game.appendChild($node);
}

export const positionNodeInCanvas = ($node, x, y) => {
  $node.style.top = `${canvasCoordinates(y)}px`;
  $node.style.left = `${canvasCoordinates(x)}px`;
}

export const canvasCoordinates = (value) => {
  const CELL_SIZE = 20;
  return value * CELL_SIZE;
};