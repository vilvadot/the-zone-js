import { EVENTS } from "./events.js";
import { tileCoordinates } from "./util.js";

const ACTIONS = {
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Space: "Space",
  KeyE: "KeyE",
};

export const INPUTS = {
  ...ACTIONS,
  Click: "Click",
};

export const isInputKey = (code) => INPUTS[code];
export const isActionKey = (code) => ACTIONS[code];

export const takeControlOfInputs = (bus) => {
  window.addEventListener("keydown", (event) => {
    if (isInputKey(event.code)) {
      event.preventDefault();

      if (isActionKey(event.code))
        bus.emit(EVENTS.TURN_PASSED, { key: INPUTS[event.code] });
    }
  });

  const canvas = document.querySelector("canvas")!;
  canvas.addEventListener("mousemove", (event: MouseEvent) => {
    bus.emit(EVENTS.MOUSE_MOVED, {
      ...tileCoordinatesFromMouse(event)
    });
  });

  canvas.addEventListener("mouseleave", (event: MouseEvent) => {
    bus.emit(EVENTS.MOUSE_MOVED, {
      x: undefined,
      y: undefined,
    });
  });

  window.addEventListener("click", (event) => {
    bus.emit(EVENTS.TURN_PASSED, {
      key: INPUTS["Click"],
      ...tileCoordinatesFromMouse(event)
    });
  });
};

const tileCoordinatesFromMouse = (event) => {
  return {
    x: tileCoordinates(event.layerX),
    y: tileCoordinates(event.layerY),
  };
};
