import { GenerateBuildings } from "./GenerateBuildings.js";
import { GenearteDirt } from "./GenerateDirt.js";
import { GenerateGrass } from "./GenerateGrass.js";
import { GenerateRocks } from "./GenerateRocks.js";

export type Operations = (GenearteDirt | GenerateRocks | GenerateGrass | GenerateBuildings)