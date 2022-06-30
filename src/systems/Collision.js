export class Collision {
  static run(entities) {
    for (const { id, position, collision } of entities) {
      if (!id || !position || !collision) continue;

      const collisions = {
        west: [],
        east: [],
        south: [],
        north: [],
        overlap: [],
      };

      entities.forEach((entity) => {
        if(entity.id === id) return;

        const isSameX = entity.position.x === position.x;
        const isSameY = entity.position.y === position.y;

        if (isSameY && entity.position.x === position.x + 1) {
          collisions.east.push(entity.id);
        }
        if (isSameY && entity.position.x === position.x - 1) {
          collisions.west.push(entity.id);
        }
        if (isSameX && entity.position.y === position.y - 1) {
          collisions.north.push(entity.id);
        }
        if (isSameX && entity.position.y === position.y + 1) {
          collisions.south.push(entity.id);
        }
        if (isSameX && isSameY) {
          collisions.overlap.push(entity.id);
        }

        collision.areas = {...collisions}
      });
    }
  }
}