import { ACTION, TRADE_PAYLOAD } from "../actions.js";
import { Item } from "../entities/items/index.js";

export class Trading {
  static run(action: ACTION) {
    if(action.name !== 'trade') return
    
    const { item, from, to, quantity } = action.payload as TRADE_PAYLOAD;
    // Send item
    if (item.quantity - quantity <= 0) {
      from.inventory.content = from.inventory.content.filter((inventoryItem) => inventoryItem.id !== item.id);
    } else {
      item.quantity -= quantity;
    }

    // Receive item
    const ownedItemOfSameKind = to.inventory.content.find(({ name }) => name === item.name);

    if (!!ownedItemOfSameKind) {
      ownedItemOfSameKind.quantity += quantity;
    } else {
      const itemCopy = new Item(item.name, quantity);
      to.inventory.content.push(itemCopy);
    }
  }
}
