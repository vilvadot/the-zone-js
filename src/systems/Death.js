export class Death {
  static run(entities, entityManager) {
    for (const entity of entities) {
      const { health, sprite } = entity;
      if (!health || !sprite) continue;

      if (health.value <= 0) {
        entityManager.kill(entity);
      }
    }
  }
}
