import { Matrix } from "../../data-structures/Matrix.js";
import ROT from "../../lib/rot.js";
import { BuildingGenerator } from "./BuildingGenerator.js";
import { DirtGenerator } from "./DirtGenerator.js";
import { GrassGenerator } from "./GrassGenerator.js";
import { RockGenerator } from "./RockGenerator.js";

export class TerrainGenerator {
  constructor(width, height) {
    this.generators = [
      new DirtGenerator(width, height),
      new RockGenerator(width, height),
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


