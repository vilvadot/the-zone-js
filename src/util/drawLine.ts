// Source: https://www.redblobgames.com/grids/line-drawing.html

import { Point } from "../data-structures/Point.js";

export const drawLine = (start: Point, end: Point, steps = 3): Point[] => {
  const result: Point[] = [];
  const distance = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2)
  const defaultSteps = Math.floor(distance);
  const STEPS = steps || defaultSteps;
  
  for (let step = 1; step < STEPS; step++) {
    const time = step / STEPS;

    result.push(linearInterpolatePoint(start, end, time));
  }

  return [start, ...result, end];
};

const linearInterpolatePoint = (
  start: Point,
  end: Point,
  time: number
): Point => {
  const x = linearInterpolate(start.x, end.x, time);
  const y = linearInterpolate(start.y, end.y, time);
  return new Point(x, y);
};

const linearInterpolate = (
  start: number,
  end: number,
  time: number
): number => {
  return Math.ceil(start * (1.0 - time) + end * time);
};
