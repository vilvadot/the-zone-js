import { Animation } from "./Animation.js";
import { Matrix } from "../data-structures/Matrix.js";
import { TILES } from "../tiles.js";
import { Point } from "../data-structures/Point.js";
import { drawLine } from "../util/drawLine.js";

export class HitAnimation extends Animation {
  frames: Matrix[];

  constructor(x: number, y: number) {
    super();
    this.frames = [new Matrix().setValue(x, y, TILES.hit)];
  }
}

export class ShootAnimation extends Animation {
  frames: Matrix[];

  constructor(origin: Point, target: Point) {
    super();
    this.frames = [];

    const line = drawLine(origin, target);
    for (const point of line.slice(1)) {
      const frame = new Matrix().setValue(point.x, point.y, TILES.bullet);
      this.frames.push(frame);
    }
  }
}
