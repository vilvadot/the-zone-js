import { INPUTS } from "../input.js";

// CONCERN: maybe this is responsibility of KeyboardControl to issue commands like pickup and move?
export class Pickup {
  static run(entities, action, logger) {
    for (const { id, collision, inventory } of entities) {
      if (!collision || !inventory) continue;
      if (action.key != INPUTS.KeyE) return;

      const items = collision.areas.overlap;
      // CONCERN: I'm searching in the whole list of entities. This does not look good
      const firstPickable = entities.find((entity) => {
        const isOnFloor = items.includes(entity.id)
        return isOnFloor && entity.pickable && !entity.pickable.isPicked;
      })
     
      if(!firstPickable) continue;

      firstPickable.pickable.isPicked = true;
      firstPickable.sprite.isHidden = true;
      inventory.add(firstPickable.id);
      logger.log(`picked up "${firstPickable.name}"`, firstPickable.sprite.color)
    }
  }
}