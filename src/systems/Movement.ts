import { Terrain } from "../terrain";

export class Movement {
  static run(entities, terrain: Terrain) {
    for (const { position, velocity } of entities) {
      if (!velocity || !position) continue;

      const candidate = { ...position };

      candidate.x = position.x + velocity.x;
      candidate.y = position.y + velocity.y;

      if (this._tileOccupied(entities, candidate, terrain)) {
        this._reset(velocity);
        continue;
      }

      position.x = candidate.x;
      position.y = candidate.y;

      this._reset(velocity);
    }
  }

  static _tileOccupied = (entities, candidate, terrain: Terrain) => {
    const isEntityPresent = entities.some(
      ({ position, isStatic }) => position.x === candidate.x && position.y === candidate.y && !isStatic
    );
    const isWall = terrain.isBlocked(candidate.x, candidate.y);

    return isEntityPresent || isWall;
  };

  static _reset(velocity) {
    velocity.x = 0;
    velocity.y = 0;
  }
}
