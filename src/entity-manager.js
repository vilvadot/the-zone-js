import { findTile } from "./util.js";
import { Corpse } from "./entities/Corpse.js";

export class EntityManager {
  constructor() {
    this.entities = [];
    this.player = null;
  }

  addPlayer(player){
    this.player = player
  }

  add(entities) {
    if (Array.isArray(entities))
      return (this.entities = [...this.entities, ...entities]);

    this.entities.push(entities);
  }

  kill(entity) {
    const tile = findTile(entity.id)
    tile.remove()
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }

  resetAllButPlayer() {
    this.entities.forEach((entity) => findTile(entity?.id)?.remove())
    this.entities = [this.player]
  }

  retrieveAll() {
    return this.entities;
  }
}
