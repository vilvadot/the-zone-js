import { Inventory } from "../../components/index.js";
import { createNode } from "../../util/index.js";

export class InventoryScreen {
  static update(playerInventory: Inventory) {
    const $container = document.querySelector(
      "#inventory .ui_panel--content"
    ) as HTMLDivElement;

    $container.innerHTML = ""
    playerInventory.content.forEach((item) => {
      const text = `${item.name} - ${item.quantity}`;
      const row = $container.querySelector(`#${item.id}`);
      if (!row) {
        const newRow = createNode({ type: "p", content: text, id: item.id });
        $container.appendChild(newRow);
      } else {
        row.innerHTML = text;
      }
    });
  }
}
