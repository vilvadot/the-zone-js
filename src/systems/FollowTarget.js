export class FollowTarget {
  static run(entities) {
    for (const { target: targetId, position, velocity } of entities) {
      if (!targetId || !position || !velocity) continue;
      
      const target = entities.find(({ id }) => id === targetId);

      const xDifference = target.position.x - position.x;
      const yDifference = target.position.y - position.y;

      if (xDifference < 0) velocity.x--
      if (xDifference > 0) velocity.x++
      if (yDifference < 0) velocity.y--;
      if (yDifference > 0) velocity.y++;
    }
  }
}
