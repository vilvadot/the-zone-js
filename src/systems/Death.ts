import { Entities } from "../entities";
import { EntityManager } from "../entities/entity-manager";

export class Death {
  static run(entities: Entities, entityManager: EntityManager) {
    for (const entity of entities) {
      const { health, sprite } = entity;
      if (!health || !sprite) continue;

      if (health.value <= 0) {
        if(entity.isPlayer) window.location.reload()
        
        const inventory = entity.inventory
        if(inventory){
          inventory.content.forEach((item) => {
            item.position = entity.position;
            entityManager.add(item)
          })
        }

        entityManager.remove(entity);
      }

    }
  }
}
