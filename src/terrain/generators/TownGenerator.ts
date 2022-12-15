import { GenerateBuildings } from "./operations/GenerateBuildings.js";
import { GenerateGrass } from "./operations/GenerateGrass.js";
import { GenearteDirt } from "./operations/GenerateDirt.js";
import { TerrainGenerator } from "./TerrainGenerator.js";

export class TownGenerator extends TerrainGenerator {
  constructor(width: number, height: number) {
    super();
    this.operations = [
      new GenearteDirt(width, height),
      new GenerateGrass(width, height, .6),
      new GenerateBuildings()
    ];
  }
}
