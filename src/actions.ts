import { Item } from "./entities/items";
import { Merchant } from "./entities/Merchant";
import { Player } from "./entities/Player";

export enum EVENTS {
  ACTION_EXECUTED = "ACTION_EXECUTED",
  LOG_EMITTED = "LOG_EMITTED",
  MOUSE_MOVED = "MOUSE_MOVED",
  HIT = "HIT",
  SHOT_FIRED = "SHOT_FIRED",
  AREA_CHANGED = "AREA_CHANGED",
}

export enum ACTION_NAME {
  TARGET = "target",
  AIM = "aim",
  MOVE = "move",
  PICKUP = "pickup",
  WAIT = "wait",
  TALK = "talk",
  TRADE = "trade",
  USE = "use",
}

export type MOVE_PAYLOAD = { direction: "north" | "south" | "east" | "west" };
export type CLICK_PAYLOAD = { x: number; y: number };
export type TRADE_PAYLOAD = {
  player: Player;
  merchant: Merchant;
  item: Item;
  quantity: number;
  transaction: "sell" | "buy";
};
export type USE_PAYLOAD = { item: Item };

export type ACTION = { name: ACTION_NAME; payload?: any };
