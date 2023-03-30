import { Item } from "./entities/items";
import { Merchant } from "./entities/Merchant";
import { Player } from "./entities/Player";

export enum EVENTS {
  ACTION_EXECUTED = "ACTION_EXECUTED",
  LOG_EMITTED = "LOG_EMITTED",
  MOUSE_MOVED = "MOUSE_MOVED",
  HIT = "HIT",
  SHOT_FIRED = "SHOT_FIRED",
  TRAVELED = "TRAVELED",
  AREA_CREATED = "AREA_CREATED",
}

export enum ACTION_NAME {
  MOVE = "move",
  SHOOT = "shoot",
  PICKUP = "pickup",
  WAIT = "wait",
  TALK = "talk",
  TRADE = "trade"
}

export type MOVE_PAYLOAD = { direction: "north" | "south" | "east" | "west" }
export type CLICK_PAYLOAD = { x: number, y: number }
export type TRADE_PAYLOAD = { player: Player, merchant: Merchant, item: Item, quantity: number, transaction: "sell" | "buy" }

export type ACTION = { name: ACTION_NAME, payload: any }