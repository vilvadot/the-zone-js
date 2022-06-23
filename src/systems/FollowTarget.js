export class FollowTarget {
  static run(entities, world) {
    for (const { target, position } of entities) {
      if (!target || !position) continue;
      
      const victim = entities.find(({ id }) => id === target.id);
      const victimX = victim.position.x;
      const victimY = victim.position.y;

      const xDifference = victimX - position.x;
      const yDifference = victimY - position.y;
      const candidate = { ...position };

      if (xDifference < 0) {
        candidate.x--;
      } else if (xDifference > 0) {
        candidate.x++;
      }

      if (yDifference < 0) {
        candidate.y--;
      } else if (yDifference > 0) {
        candidate.y++;
      }

      if (candidate.x === victimX && candidate.y === victimY) {
        return;
      }

      if(entities.some(entity => entity.position.x === candidate.x && entity.position.y === candidate.y)) continue;
      if(world.isBlocked(candidate.x, candidate.y)) continue;

      position.x = candidate.x;
      position.y = candidate.y;
    }
  }
}
