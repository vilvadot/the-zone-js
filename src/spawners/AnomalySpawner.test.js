import { Artifact } from "../entities/Artifact";
import { ArtifactSpawner } from "./ArtifactSpawner";

describe("ArtifactSpawner", () => {
  it("spawns anomalies", () => {
    const quantity = 3;

    const anomalies = ArtifactSpawner.spawn(quantity);

    expect(anomalies).toHaveLength(quantity);
    expect(anomalies[0]).toBeInstanceOf(Artifact);
  });
});