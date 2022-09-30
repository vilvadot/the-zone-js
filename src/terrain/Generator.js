import { Matrix } from "../data-structures/Matrix.js";
import ROT from "../lib/rot.js";
import { TILES } from "../tiles.js";

export class Generator {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.engine = new ROT.Map.Cellular(width, height);
  }

  setSeed(seed) {
    ROT.RNG.setSeed(seed);
    return this;
  }

  generate() {
    let result = new Matrix();
    result = this._generateBasicMap(result);
    result = this._addWalls(result);
    result = this._addGrass(result);

    return result;
  }

  _addWalls(result) {
    this.engine.randomize(0.25).create((x, y, isFilled) => {
      const originalTile = result.getValue(x, y);
      const value = isFilled ? TILES.wall : originalTile;
      result.setValue(x, y, value);
    });

    return result;
  }

  _addGrass(result) {
    this.engine.randomize(0.25).create((x, y, isFilled) => {
      const originalTile = result.getValue(x, y);
      const value = isFilled ? TILES.grass : originalTile;
      result.setValue(x, y, value);
    });
    
    return result;
  }

  _generateBasicMap(result) {
    this.engine.randomize(0.5).create((x, y, isFilled) => {
      const tile = isFilled ? TILES.dirt : TILES.empty;
      result.setValue(x, y, tile);
    });

    return result;
  }
}
