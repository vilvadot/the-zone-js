import { Matrix } from "../data-structures/Matrix.js";
import ROT from "../lib/rot.js";
import { TILES } from "../tiles.js";

export class Generator {
  constructor(width, height) {
    this.generators = [
      new DirtGenerator(width, height),
      new WallGenerator(width, height),
      new GrassGenerator(width, height),
      new BuildingGenerator(width, height),
    ];
  }

  setSeed(seed) {
    ROT.RNG.setSeed(seed);
    return this;
  }

  generate() {
    let result = new Matrix();
    this.generators.forEach((generator) => generator.run(result));

    return result;
  }
}

class BuildingGenerator{
  run(result){
    result.setValue(10, 10, TILES.wallWood)
    return result
  }
}

class CellularGenerator {
  generate(result, fullness = 0.5, tileSelectorCallback) {
    this.engine.randomize(fullness).create((x, y, isFilled) => {
      const originalTile = result.getValue(x, y);
      const tile = tileSelectorCallback(isFilled, originalTile);
      result.setValue(x, y, tile);
    });
  }
}

class DirtGenerator extends CellularGenerator {
  constructor(width, height) {
    super();
    this.engine = new ROT.Map.Cellular(width, height);
  }

  run(result) {
    return super.generate(result, 0.5, (isFilled) =>
      isFilled ? TILES.dirt : TILES.empty
    );
  }
}

class WallGenerator extends CellularGenerator {
  constructor(width, height) {
    super()
    this.engine = new ROT.Map.Cellular(width, height);
  }

  run(result) {
    return super.generate(result, 0.25, (isFilled, originalTile) =>
      isFilled ? TILES.wall : originalTile
    );
  }
}

class GrassGenerator extends CellularGenerator {
  constructor(width, height) {
    super()
    this.engine = new ROT.Map.Cellular(width, height);
  }

  run(result) {
    return super.generate(result, 0.2, (isFilled, originalTile) =>
      isFilled ? TILES.grass : originalTile
    );
  }
}
