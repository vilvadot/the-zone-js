export class WorldRendering {
  static run(display, fov, world) {
    display.clear();

    fov.forEach((x, y, distance) => {
      const tinting = `rgba(0,0,0, ${shadow(distance)}`;
      const value = world.getTileAt(x, y);
      display.draw(x, y, value, tinting);
    });
  }
}

const shadow = (distance) => {
  const shadowing = 1 / distance;

  return 1 - shadowing;
};
