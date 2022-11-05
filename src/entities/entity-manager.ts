import { Cache } from "../Cache.js";
import { Corpse } from "./Corpse.js";
import { Player } from "./Player.js";
import { Entities } from "./index.js";

export class EntityManager {
  cache: Cache;
  entities: Entities;
  player: Player | null; 

  constructor() {
    this.cache = new Cache()
    this.entities = [];
    this.player = null;
  }

  addPlayer(player: Player){
    this.player = player
  }

  add(entities: Entities) {
    this.entities = [...this.entities, ...entities]
  }

  kill(entity: any) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }

  reset(seed: string) {
    this.cache.push(seed, this.entities)
    this.entities = []
  }

  isCached(seed: string){
    return !!this.cache.retrieve(seed)
  }

  retrieveAll(seed?: string) {
    if(!seed) return this._getAll();
    
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


