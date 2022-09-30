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
    return this._generate(result, 0.25, (isFilled, originalTile) =>
      isFilled ? TILES.wall : originalTile
    );
  }


  _addGrass(result) {
    return this._generate(result, 0.25, (isFilled, originalTile) =>
      isFilled ? TILES.grass : originalTile
    );
  }

  _generateBasicMap(result) {
    return this._generate(result, 0.5, (isFilled) =>
      isFilled ? TILES.dirt : TILES.empty
    );
  }

  _generate(result, fullness = 0.5, tileSelectorCallback) {
    this.engine.randomize(fullness).create((x, y, isFilled) => {
      const originalTile = result.getValue(x,y)
      const tile = tileSelectorCallback(isFilled, originalTile);
      result.setValue(x, y, tile);
    });

    return result;
  }
}
