import { ACTION_NAME, EVENTS, TRADE_PAYLOAD } from "../../actions.js";
import { Bus } from "../../infra/bus.js";
import { createNode } from "../../util/dom.js";
import { findAdjacent } from "../../util/entities.js";
import { GameState } from "../../Game.js";
import { Player } from "../../entities/Player.js";
import { Merchant, PriceTable } from "../../entities/Merchant.js";
import { UIComponent } from "./UIComponent.js";
import { PRICES } from "../../entities/items/prices.js";

export class TradeDialog implements UIComponent {
  bus: Bus;
  node: HTMLElement;

  constructor(bus: Bus) {
    this.bus = bus;
    this.node = document.querySelector("#trade-dialog")!;
    this.create()
  }

  create() {
    this.node.innerHTML = `
        <div class="dialog">
          <div>
            <h2>Player's inventory</h2>
            <div id="sell"></div>
          </div>
          <div>
            <h2>Merchant's inventory</h2>
            <div id="buy"></div>
          </div>
        </div>
      `
  }

  private hide() {
    this.node.style.visibility = 'hidden';
  }

  private show() {
    this.create()
    this.node.style.visibility = 'visible';
  }

  update({ mode, player, entities }: GameState) {
    if (!mode.isDialog()) return this.hide()

    this.show()

    const merchant = findAdjacent(player, entities); // TODO: This shouldnt be here but in the game core
    this.createItemList(player, merchant, "sell");
    this.createItemList(player, merchant, 'buy');
  }

  private createItemList(
    player: Player,
    merchant: Merchant,
    transaction: "sell" | "buy"
  ) {
    const inventory = transaction === "sell" ? player.inventory : merchant.inventory;
    const itemsWithoutAmmo = inventory.content.filter((item) => item.name !== "Ammo");

    itemsWithoutAmmo.forEach((item) => {
      const price = transaction === "sell" ? PRICES[item.name].buy : PRICES[item.name].sell
      const row = createNode({ type: "a" });
      row.innerHTML = `
        <span>${item.name} (${item.quantity})</span>
        <span style="color: orange;">${price} ⚬</span>
      `

      row.addEventListener("click", () => {
        const action = {
          name: ACTION_NAME.TRADE,
          payload: {
            player,
            merchant,
            item,
            transaction,
            quantity: 1
          } as TRADE_PAYLOAD
        }

        this.bus.emit(EVENTS.ACTION_EXECUTED, action);
      });

      const $container = this.node.querySelector(`#${transaction}`) as HTMLDivElement;
      $container.appendChild(row);
    });
  }
}
