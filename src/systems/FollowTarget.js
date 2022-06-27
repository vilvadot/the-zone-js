export class FollowTarget {
// TODO: Use line of sight algorithm to calculate this
  static run(entities) {
    for (const { id, target, position, velocity, keyboardControlled } of entities) {
      if (!target || !position || !velocity || keyboardControlled) continue;

      const targetEntity = entities.find(({ id }) => id === target.id);
      if (!targetEntity) continue;

      const xDifference = targetEntity.position.x - position.x;
      const yDifference = targetEntity.position.y - position.y;

      if (xDifference < 0) velocity.x--;
      if (xDifference > 0) velocity.x++;
      if (yDifference < 0) velocity.y--;
      if (yDifference > 0) velocity.y++;
    }
  }
}
