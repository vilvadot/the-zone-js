import { Area } from "./AreaManager";
import { KEYS } from "./input";

export enum EVENTS {
  ACTION_EXECUTED = "ACTION_EXECUTED",
  PLAYER_MOVED = "PLAYER_MOVED",
  LOG_EMITTED = "LOG_EMITTED",
  MOUSE_MOVED = "MOUSE_MOVED",
  HIT = "HIT",
  SHOT_FIRED = "SHOT_FIRED",
  TRAVELED = "TRAVELED",
  AREA_CREATED = "AREA_CREATED",
}

export type AREA_CREATED_PAYLOAD = { area: Area}
export type ACTION_EXECUTED_PAYLOAD = { key: KEYS, x?: number, y?: number}
