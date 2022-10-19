import { positionNodeInCanvas, createNode, addNodeToGame } from "../util.js";
import { DEBUG_ENABLED } from "../config.js";

export class Debug {
  static log(value) {
    if (!DEBUG_ENABLED) return;
    console.log(value);
  }

  static timeStart(value) {
    if (!DEBUG_ENABLED) return;
    console.time(value);
  }

  static timeEnd(value) {
    if (!DEBUG_ENABLED) return;
    console.timeEnd(value);
  }
}

export class DebugPath {
  // NOTE: This is very expensive!
  static draw(id, path) {
    if (!DEBUG_ENABLED) return;
    const markerClassName = `path-marker-${id}`;
    this._cleanOldPaths(markerClassName);

    path.forEach(([x, y]) => {
      const $marker = createNode({
        type: "div",
        style: `height: 3px; width: 3px; background: rgba(255,255,255,.5);`,
      });
      $marker.className = markerClassName;
      $marker.id = `path-${id}-${x}-${y}`;
      positionNodeInCanvas($marker, x, y);
      addNodeToGame($marker);
    });
  }

  static _cleanOldPaths(identifier) {
    document.querySelectorAll(`.${identifier}`).forEach((node) => {
      node.remove();
    });
  }
}
