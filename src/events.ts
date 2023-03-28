import { Area } from "./AreaManager";
import { Entity } from "./entities";
import { Item } from "./entities/items";
import { Merchant } from "./entities/Merchant";
import { Player } from "./entities/Player";
import { KEYS } from "./input";

export enum EVENTS {
  ACTION_EXECUTED = "ACTION_EXECUTED",
  PLAYER_MOVED = "PLAYER_MOVED",
  LOG_EMITTED = "LOG_EMITTED",
  MOUSE_MOVED = "MOUSE_MOVED",
  HIT = "HIT",
  ITEM_TRANSFERED = "ITEM_TRANSFERED",
  SHOT_FIRED = "SHOT_FIRED",
  TRAVELED = "TRAVELED",
  AREA_CREATED = "AREA_CREATED",
}

export type MOUSE_MOVED = { x: number | undefined, y: number | undefined}
export type AREA_CREATED_PAYLOAD = { area: Area}
export type ITEM_TRANSFERED = { item: Item, from: Merchant | Player, to: Merchant | Player, quantity: number}
export type ACTION_EXECUTED_PAYLOAD = { key: KEYS, x?: number, y?: number}
