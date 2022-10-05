import ROT from "../../lib/rot.js";
import { TILES } from "../../tiles.js";
import { CellularGenerator } from "./CellularGenerator.js";

export class RockGenerator extends CellularGenerator {
  constructor(width, height) {
    super();
    this.engine = new ROT.Map.Cellular(width, height);
  }

  run(result) {
    return super.generate(result, 0.25, (isFilled, originalTile) => isFilled ? TILES.rock : originalTile
    );
  }
}
