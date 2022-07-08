import { INPUTS } from "../input.js";
import { ANIMATIONS } from "./Animation.js";

// CONCERN: maybe this is responsibility of KeyboardControl to issue commands like pickup and move?
export class Pickup {
  static run(logger, entities, action) {
    for (const { collision, inventory, animation } of entities) {
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
      
      if (animation) animation.set(ANIMATIONS.pickup.name)
      inventory.add(firstPickable);
      logger.log(`picked up "${firstPickable.name}"`, firstPickable.sprite.color)
    }
  }
}