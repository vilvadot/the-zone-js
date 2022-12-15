import { Matrix } from "../../../data-structures/Matrix.js";
import ROT from "../../../lib/rot.js";
import { TILES } from "../../../tiles.js";
import { CellularGenerator } from "./CellularGenerator.js";

export class GenerateGrass extends CellularGenerator {
  density: number;

  constructor(width: number, height: number, density: number = 0.2) {
    super();
    this.engine = new ROT.Map.Cellular(width, height);
    this.density = density;
  }

  run(result: Matrix) {
    return super.generate(result, this.density, (isFilled, originalTile) => isFilled ? TILES.grass : originalTile
    );
  }
}
