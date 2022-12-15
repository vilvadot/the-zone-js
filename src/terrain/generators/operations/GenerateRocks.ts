import { Matrix } from "../../../data-structures/Matrix.js";
import ROT from "../../../lib/rot.js";
import { TILES } from "../../../tiles.js";
import { CellularGenerator } from "./CellularGenerator.js";

export class GenerateRocks extends CellularGenerator {
  constructor(width: number, height: number) {
    super();
    this.engine = new ROT.Map.Cellular(width, height);
  }

  run(result: Matrix) {
    return super.generate(result, 0.25, (isFilled, originalTile) => isFilled ? TILES.rock : originalTile
    );
  }
}
