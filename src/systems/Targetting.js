import { TargetClosest } from "../components/index.js";
import { isInrange } from "../util.js";

export class Targetting {
  static run(entities) {
    for (const { position, target } of entities) {
      if (!position || !target) continue;
      if (!(target instanceof TargetClosest)) continue;


      const enemyInContact = entities.find((entity) => {
        return isInrange(entity.position, position);
      });
      if(!enemyInContact) {
        target.id = null;
        continue;
      }

      target.id = enemyInContact.id;
    }
  }
}
