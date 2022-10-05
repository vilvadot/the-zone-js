import ROT from "../../lib/rot.js";
import { TILES } from "../../tiles.js";
import { CellularGenerator } from "./CellularGenerator.js";

export class GrassGenerator extends CellularGenerator {
  constructor(width, height) {
    super();
    this.engine = new ROT.Map.Cellular(width, height);
  }

  run(result) {
    return super.generate(result, 0.2, (isFilled, originalTile) => isFilled ? TILES.grass : originalTile
    );
  }
}
