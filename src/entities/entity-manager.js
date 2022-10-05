import { findTile } from "../util.js";
import { Cache } from "../Cache.js";
import { Corpse } from "./Corpse.js";

export class EntityManager {
  constructor() {
    this.cache = new Cache()
    this.entities = [];
    this.player = null;
  }

  addPlayer(player){
    this.player = player
  }

  add(entities) {
    this.entities = [...this.entities, ...entities]
  }

  kill(entity) {
    const tile = findTile(entity.id)
    tile.remove()
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }

  reset(seed) {
    this.cache.push(seed, this.entities)
    this.entities.forEach((entity) => findTile(entity?.id)?.remove())
    this.entities = []
  }

  isCached(seed){
    return !!this.cache.retrieve(seed)
  }

  retrieveAll(seed) {
    if(this.isCached(seed)) {
      this.entities = this.cache.retrieve(seed)
      return this.entities
    }
    return this._getAll();
  }

  _getAll(){
    return [this.player, ...this.entities]
  }
}


