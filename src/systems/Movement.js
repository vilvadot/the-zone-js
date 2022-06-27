export class Movement {
  static run(entities, world) {
    for (const { position, velocity } of entities) {
      if (!velocity || !position) continue;
      
      const candidate = { ...position };

      candidate.x = position.x + velocity.x;
      candidate.y = position.y + velocity.y;

      if (this._tileOccupied(entities, candidate, world)) {
        this._reset(velocity);
        continue;
      }

      position.x = candidate.x;
      position.y = candidate.y;

      this._reset(velocity);
    }
  }

  static _tileOccupied = (entities, candidate, world) => {
    const isEntityPresent = entities.some(
      (entity) =>
        entity.position.x === candidate.x && entity.position.y === candidate.y
    );
    const isWall = world.isBlocked(candidate.x, candidate.y);

    return isEntityPresent || isWall;
  };

  static _reset(velocity) {
    velocity.x = 0;
    velocity.y = 0;
  }
}