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

  generate(callback) {
    let result = this._generateBasicMap();
    result = this._addWalls(result);
    result = this._addGrass(result);

    for (const key in result) {
      const [x, y] = key.split(",");
      const tile = result[key];
      callback(x, y, tile);
    }
  }

  _addWalls(cells) {
    this.engine.randomize(0.25).create((x, y, isFilled) => {
      const originalTile = cells[`${x},${y}`]
      cells[`${x},${y}`] = isFilled ? TILES.wall : originalTile;
    })
    return cells;
  }

  _addGrass(cells) {
    this.engine.randomize(0.15).create((x, y, isFilled) => {
      const originalTile = cells[`${x},${y}`]
      cells[`${x},${y}`] = isFilled ? TILES.grass : originalTile;
    })
    return cells;
  }

  _generateBasicMap() {
    const result = {};

    this.engine.randomize(0.5).create((x, y, isFilled) => {
      const tile = isFilled ? TILES.dirt : TILES.empty;
      result[`${x},${y}`] = tile;
    });
    return result;
  }
}