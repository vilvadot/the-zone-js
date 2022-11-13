import { Matrix } from "../data-structures/Matrix.js";
import { TILES } from "../tiles.js";

type Point = [number, number];

export const drawLine = ([startX, startY]: Point, [endX, endY]: Point) => {
  const layer = new Matrix();
  
  const distanceX = endX - startX;
  const distanceY = endY - startY;

  for (let x = startX; x <= endX; x++) {
    console.log(startY + (distanceY * (x - startX)), distanceX)
    const y = Math.floor(startY + (distanceY * (x - startX)) / distanceX);
    
    layer.setValue(x, y, TILES.corpse);
  }
  return layer;
};