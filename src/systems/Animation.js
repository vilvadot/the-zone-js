import { findTile } from '../util.js';

export const ANIMATIONS = {
  hit: { duration: 200, name: "hit"},
  pickup: { duration: 100, name: "pickup"},
};

export class Animation {
  static run(entities) {
    for (const { animation, id } of entities) {
      if (!animation || !animation) continue;

      const animationClassName = `animation--${animation.name}`;
      let $node = findTile(id)

      if (animation.isActive) {
        $node.classList.add(animationClassName);
        setTimeout(() => {
          animation.isActive = false;
          $node.classList.remove(animationClassName);
        }, ANIMATIONS[animation.name].duration);
      }
    }
  }
}
