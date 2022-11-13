import { Animation } from "./Animation";
import { Matrix } from "../data-structures/Matrix";
import { TILES } from "../tiles";

export class HitAnimation extends Animation {
  frames: Matrix[];

  constructor(x: number, y: number) {
    super();
    this.frames = [new Matrix().setValue(x, y, TILES.hit)];
  }
}
