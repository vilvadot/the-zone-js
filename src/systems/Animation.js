export const ANIMATIONS = {
  hit: { duration: 200, name: "hit"},
  pickup: { duration: 100, name: "pickup"},
};

export class Animation {
  static run(entities) {
    for (const { animation, sprite } of entities) {
      if (!animation || !animation) continue;

      const animationClassName = `animation--${animation.name}`;

      if (animation.isActive) {
        sprite.node.classList.add(animationClassName);
        setTimeout(() => {
          animation.isActive = false;
          sprite.node.classList.remove(animationClassName);
        }, ANIMATIONS[animation.name].duration);
      }
    }
  }
}
