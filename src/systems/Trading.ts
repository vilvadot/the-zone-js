import { Bus } from "../infra/bus.js";
import { EVENTS, ITEM_TRANSFERED } from "../events.js";
import { Item } from "../entities/items/index.js";

export class Trading {
  bus: Bus;

  constructor(bus) {
    this.bus = bus;
  }

  handleSubscriptions() {
    this.bus.subscribe(EVENTS.ITEM_TRANSFERED, ({ item, from, to, quantity }: ITEM_TRANSFERED) => {
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
    });
  }
}
