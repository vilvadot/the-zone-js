import { Animation } from "./Animation.js";
import { Matrix } from "../data-structures/Matrix.js";
import { TILES } from "../tiles.js";

export class HitAnimation extends Animation {
  frames: Matrix[];

  constructor(x: number, y: number) {
    super();
    this.frames = [new Matrix().setValue(x, y, TILES.hit)];
  }
}
