import { GenerateBuildings } from "./operations/GenerateBuildings.js";
import { GenerateGrass } from "./operations/GenerateGrass.js";
import { GenearteDirt } from "./operations/GenerateDirt.js";
import { GenerateRocks } from "./operations/GenerateRocks.js";
import { TerrainGenerator } from "./TerrainGenerator.js";

export class WilderNessGenerator extends TerrainGenerator {
  constructor(width: number, height: number) {
    super();
    this.operations = [
      new GenearteDirt(width, height),
      new GenerateRocks(width, height),
      new GenerateGrass(width, height),
      new GenerateBuildings(),
    ];
  }
}
