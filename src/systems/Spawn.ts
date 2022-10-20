export class Spawn {
  static run(entities, terrain?) {
    for (const { position } of entities) {
      if (!position) continue;
      if (position.x && position.y) continue;

      const coordinates = terrain.getRandomFreeCoordinate();

      position.x = coordinates.x;
      position.y = coordinates.y;
    }
  }
}
