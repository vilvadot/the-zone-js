import { ACTION_NAME, EVENTS, TRADE_PAYLOAD } from "../../actions.js";
import { Bus } from "../../infra/bus.js";
import { createNode } from "../../util/dom.js";
import { findAdjacent } from "../../util/entities.js";
import { GameState } from "../../Game.js";
import { Player } from "../../entities/Player.js";
import { Merchant } from "../../entities/Merchant.js";
import { UIComponent } from "./UIComponent.js";

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
            <div id="sender"></div>
          </div>
          <div>
            <h2>Merchant's inventory</h2>
            <div id="receiver"></div>
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
    this.createItemList(player, merchant, "sender");
    this.createItemList(merchant, player, 'receiver');
  }

  private createItemList(sender: Player | Merchant, receiver: Player | Merchant, id: string) {
    sender.inventory.content.forEach((item) => {
      const text = `${item.name} - ${item.quantity}`;
      const row = createNode({ type: "a", content: text, id: item.id, className: "item" });

      row.addEventListener("click", () => {
        const action = {
          name: ACTION_NAME.TRADE,
          payload: {
            from: sender,
            to: receiver,
            item,
            quantity: 1
          } as TRADE_PAYLOAD
        }

        this.bus.emit(EVENTS.ACTION_EXECUTED, action);
      });

      const $container = this.node.querySelector(`#${id}`) as HTMLDivElement;
      $container.appendChild(row);
    });
  }
}
