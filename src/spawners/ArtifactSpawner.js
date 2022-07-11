import { repeat } from "../util.js";
import { Artifact } from "../entities/Artifact.js";

export class ArtifactSpawner {
  static spawn(quantity = 1) {
    const result = [];

    repeat(quantity, () => {
      result.push(new Artifact());
    });

    return result;
  }
}
