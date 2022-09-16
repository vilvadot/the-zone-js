import { findTile } from "./util.js";
import { Corpse } from "./entities/Corpse.js";

export class EntityManager {
  constructor(entitites = []) {
    this.entities = entitites;
  }

  add(entities) {
    if (Array.isArray(entities))
      return (this.entities = [...this.entities, ...entities]);

    this.entities.push(entities);
  }

  kill(entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }

  resetAllButPlayer() {
    this.entities.forEach((entity) => {
      if (entity) findTile(entity?.id)?.remove(); // Responsabilidad de rendering
    });
  }

  retrieveAll() {
    return this.entities;
  }
}
