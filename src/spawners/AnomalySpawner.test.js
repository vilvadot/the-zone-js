import { Anomaly } from "../entities/Anomaly";
import { AnomalySpawner } from "./AnomalySpawner";

describe("AnomalySpawner", () => {
  it("spawns anomalies", () => {
    const quantity = 3;

    const anomalies = AnomalySpawner.spawn(quantity);

    expect(anomalies).toHaveLength(quantity);
    expect(anomalies[0]).toBeInstanceOf(Anomaly);
  });
});