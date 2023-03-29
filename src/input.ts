import { EVENTS, ACTION_NAME, MOVE_PAYLOAD, CLICK_PAYLOAD } from "./actions.js";
import { tileCoordinates } from "./util/index.js";

export enum KEYS {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Space = "Space",
  E = "KeyE",
  A = "KeyA",
  W = "KeyW",
  S = "KeyS",
  D = "KeyD",
  Click = "Click",
};

export const handleInput = (bus) => {
  window.addEventListener("keydown", (event) => {
    event.preventDefault();

    const { code } = event
    const actionEvent = EVENTS.ACTION_EXECUTED

    if (code === KEYS.E) bus.emit(actionEvent, { name: ACTION_NAME.PICKUP })
    if (code === KEYS.Space) bus.emit(actionEvent, { name: ACTION_NAME.TALK })
    if (code === KEYS.W || code === KEYS.ArrowUp) bus.emit(actionEvent, { name: ACTION_NAME.MOVE, payload: { direction: "north" } as MOVE_PAYLOAD })
    if (code === KEYS.S || code === KEYS.ArrowDown) bus.emit(actionEvent, { name: ACTION_NAME.MOVE, payload: { direction: "south" } as MOVE_PAYLOAD })
    if (code === KEYS.D || code === KEYS.ArrowRight) bus.emit(actionEvent, { name: ACTION_NAME.MOVE, payload: { direction: "east" } as MOVE_PAYLOAD })
    if (code === KEYS.A || code === KEYS.ArrowLeft) bus.emit(actionEvent, { name: ACTION_NAME.MOVE, payload: { direction: "west" } as MOVE_PAYLOAD })
    if (code === KEYS.Space) bus.emit(actionEvent, { name: ACTION_NAME.WAIT })
  });

  const canvas = document.querySelector("canvas")!;

  canvas.addEventListener("mousemove", (event: MouseEvent) => {
    bus.emit(EVENTS.MOUSE_MOVED, { // @ts-ignore
      x: tileCoordinates(event.layerX), // @ts-ignore
      y: tileCoordinates(event.layerY),
    });
  });

  canvas.addEventListener("mouseleave", () => {
    bus.emit(EVENTS.MOUSE_MOVED, {
      x: undefined,
      y: undefined,
    });
  });

  window.addEventListener("click", (event) => {
    bus.emit(EVENTS.ACTION_EXECUTED, {
      name: ACTION_NAME.SHOOT,
      payload: { // @ts-ignore
        x: tileCoordinates(event.layerX), // @ts-ignore
        y: tileCoordinates(event.layerY),
      } as CLICK_PAYLOAD
    });
  });
};
