import { findOrCreateNode, createNode } from "../util.js";

export class Inventory {
  static update(inventoryContent) {
    if(!inventoryContent) return
    const $inventory = findOrCreateNode(
      "#ui_inventory",
      ".ui_bottom-bar"
    );
    $inventory.innerHTML = "Inventory:"

    const $items = findOrCreateNode(
      "#ui_inventory--items",
      "#ui_inventory"
    );
    
    inventoryContent.forEach(item => {
        const node = createNode({ type: 'div',  className: 'ui_inventory--item', content: item.sprite.tile, style:`color:${item.sprite.color}` })
        node.title = item.name

         $items.appendChild(node)
    })

  }
}