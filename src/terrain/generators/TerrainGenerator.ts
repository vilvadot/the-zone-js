import { Matrix } from "../../data-structures/Matrix.js";
import ROT from "../../lib/rot.js";
import { Operations } from "./operations/Operations.js";

export class TerrainGenerator {
  seed: number;
  operations: Operations[];

  constructor() {
    this.seed = 0;
    this.operations = [];
  }

  setSeed(seed) {
    this.seed = seed;
    return this;
  }

  generate() {
    ROT.RNG.setSeed(this.seed);

    let result = new Matrix();
    this.operations.forEach((generator) => generator.run(result));

    return result;
  }
}
