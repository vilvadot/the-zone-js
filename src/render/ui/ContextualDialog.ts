import { Entities } from "../../entities/index.js";
import { Player } from "../../entities/Player.js";
import { ACTION_NAME, EVENTS, TRADE_PAYLOAD } from "../../actions.js";
import { GameMode } from "../../GameMode.js";
import { Bus } from "../../infra/bus.js";
import { createNode } from "../../util/dom.js";
import { findAdjacent } from "../../util/entities.js";

export class ContextualDialog {
  static update(mode: GameMode, bus: Bus, player: Player, entities: Entities) {

    const $container = document.querySelector("#contextual-layer") as HTMLDivElement;

    if (mode.isDialog()) {
      $container.style.visibility = "visible";

      const playerColumn = $container.querySelector("#player .items") as HTMLDivElement;
      const merchant = findAdjacent(player, entities); // TODO: this every render sounds overkill
      const merchantColumn = $container.querySelector("#merchant .items") as HTMLDivElement;

      playerColumn.innerHTML = ""
      player.inventory.content.forEach((item) => {
        const text = `${item.name} - ${item.quantity}`;
        const row = playerColumn.querySelector(`#${item.id}`);
        if (!row) {
          const newRow = createNode({ type: "p", content: text, id: item.id, className: "item" });
          newRow?.addEventListener("click", () => {
            bus.emit(EVENTS.ACTION_EXECUTED, { name: ACTION_NAME.TRADE, payload: { from: player, to: merchant, item, quantity: 1 } as TRADE_PAYLOAD })
          })
          playerColumn.appendChild(newRow);
        } else {
          row.innerHTML = text;
        }
      });


      merchantColumn.innerHTML = ""
      merchant.inventory.content.forEach((item) => {
        const text = `${item.name} - ${item.quantity}`;
        const row = merchantColumn.querySelector(`#${item.id}`);
        if (!row) {
          const newRow = createNode({ type: "p", content: text, id: item.id, className: "item" });
          newRow?.addEventListener("click", () => {
            bus.emit(EVENTS.ACTION_EXECUTED, { name:  ACTION_NAME.TRADE, payload: { from: merchant, to: player, item, quantity: 1 } as TRADE_PAYLOAD })
          })
          merchantColumn.appendChild(newRow);
        } else {
          row.innerHTML = text;
        }
      });
    } else {
      $container.style.visibility = "hidden";
    }
  }
}
