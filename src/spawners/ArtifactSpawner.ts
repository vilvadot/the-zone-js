import { randomInteger, repeat } from "../util/index.js";
import { Artifact } from "../entities/Artifact.js";
import { HEIGHT, WIDTH } from "../config.js";

export class ArtifactSpawner {
  static spawn(quantity = 1) {
    const result: Artifact[] = [];

    repeat(quantity, () => {
      const x = randomInteger(WIDTH, 0);
      const y = randomInteger(HEIGHT, 0);
      
      result.push(new Artifact(1, x, y));
    });

    return result;
  }
}
