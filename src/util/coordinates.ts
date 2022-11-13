import { TILE_SIZE } from "../config.js";

export const canvasCoordinates = (tileCoordinates) => {
  return tileCoordinates * TILE_SIZE;
};

export const tileCoordinates = (canvasCoordinates) => {
  if (!canvasCoordinates) return;
  return Math.floor(canvasCoordinates / TILE_SIZE);
};

export const isAdjacent = (positionA, positionB) => {
  const distanceX = Math.abs(positionA.x - positionB.x);
  const distanceY = Math.abs(positionA.y - positionB.y);

  const horizontallyInRange = distanceX === 0 && distanceY === 1;
  const verticallyInRange = distanceX === 1 && distanceY === 0;
  if (horizontallyInRange || verticallyInRange) return true;

  return false;
};
