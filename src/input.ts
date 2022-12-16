import { ACTION_EXECUTED_PAYLOAD, EVENTS } from "./events.js";
import { tileCoordinates } from "./util/index.js";

export enum KEYS {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Space = "Space",
  KeyE = "KeyE",
  KeyA = "KeyA",
  KeyW = "KeyW",
  KeyS = "KeyS",
  KeyD = "KeyD",
  Click = "Click",
};

export const isInputKey = (code): KEYS => KEYS[code];

export const handleInput = (bus) => {
  window.addEventListener("keydown", (event) => {
    if (isInputKey(event.code)) {
      event.preventDefault();

      bus.emit(EVENTS.ACTION_EXECUTED, { key: KEYS[event.code] } as ACTION_EXECUTED_PAYLOAD);
    }
  });

  const canvas = document.querySelector("canvas")!;

  canvas.addEventListener("mousemove", (event: MouseEvent) => {
    bus.emit(EVENTS.MOUSE_MOVED, tileCoordinatesFromMouse(event));
  });

  canvas.addEventListener("mouseleave", () => {
    bus.emit(EVENTS.MOUSE_MOVED, {
      x: undefined,
      y: undefined,
    });
  });

  window.addEventListener("click", (event) => {
    bus.emit(EVENTS.ACTION_EXECUTED, {
      key: KEYS["Click"],
      ...tileCoordinatesFromMouse(event),
    } as ACTION_EXECUTED_PAYLOAD);
  });
};

const tileCoordinatesFromMouse = (event) => {
  return {
    x: tileCoordinates(event.layerX),
    y: tileCoordinates(event.layerY),
  };
};
