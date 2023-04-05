import { describe, expect, it, beforeEach } from "vitest";
import { Artifact } from "../entities/Artifact.js";
import { ArtifactSpawner } from "./ArtifactSpawner.js";

describe("ArtifactSpawner", () => {
  it("spawns anomalies", () => {
    const quantity = 3;

    const anomalies = new ArtifactSpawner().spawn(quantity);

    expect(anomalies).toHaveLength(quantity);
    expect(anomalies[0]).toBeInstanceOf(Artifact);
  });
});
