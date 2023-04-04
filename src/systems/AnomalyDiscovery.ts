import { findPlayer } from "../entities/helpers.js";

export class AnomalyDiscovery {
  static run(entities) {
    const player = findPlayer(entities);

    const playerCollisions = player.collision.areas;
    for (const areaName in playerCollisions) {
      const area = playerCollisions[areaName];
      const anomalyFound = area.find((entityName) =>
        entityName.includes("anomaly")
      );

      if (!anomalyFound) continue;

      const anomaly = entities.find((entity) => entity.id === anomalyFound);
      anomaly.isInvisible = false;
    }
  }
}
