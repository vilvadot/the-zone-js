import { Entities, Entity } from "../../entities/index.js";
import { Player } from "../../entities/Player.js";
import { EVENTS, ITEM_TRANSFERED } from "../../events.js";
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

      player.inventory.content.forEach((item) => {
        const text = `${item.name} - ${item.quantity}`;
        const row = playerColumn.querySelector(`#${item.id}`);
        if (!row) {
          const newRow = createNode({ type: "p", content: text, id: item.id, className: "item" });
          newRow?.addEventListener("click", () => {
            bus.emit(EVENTS.ITEM_TRANSFERED, { from: player, to: merchant, item: item, quantity: 1 } as ITEM_TRANSFERED)
          })
          playerColumn.appendChild(newRow);
        } else {
          row.innerHTML = text;
        }
      });



      merchant.inventory.content.forEach((item) => {
        const text = `${item.name} - ${item.quantity}`;
        const row = merchantColumn.querySelector(`#${item.id}`);
        if (!row) {
          const newRow = createNode({ type: "p", content: text, id: item.id, className: "item"});
          newRow?.addEventListener("click", () => {
            bus.emit(EVENTS.ITEM_TRANSFERED, { from: merchant, to: player, item: item, quantity: 1 } as ITEM_TRANSFERED)
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
