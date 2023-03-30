import { ACTION, TRADE_PAYLOAD } from "../actions.js";
import { Inventory } from "../components/index.js";
import { Item } from "../entities/items/index.js";
import { PRICES } from "../entities/items/prices.js";

export class Trading {
  static run(action: ACTION) {
    if(action.name !== 'trade') return
    const { item, player, merchant, quantity, transaction } = action.payload as TRADE_PAYLOAD;
    
    let to;
    let from;
    let price;
    // Exchange ammo
    if(transaction === 'buy'){
      to = player;
      from = merchant
      price = PRICES[item.name].sell
    }else{
      to = merchant;
      from = player
      price = PRICES[item.name].buy
    }

    const buyerAmmo = findAmmo(to.inventory)!.quantity
    if(buyerAmmo - (quantity * price) < 0) return

    findAmmo(from.inventory)!.quantity += (price * quantity)
    findAmmo(to.inventory)!.quantity -= (price * quantity)


    // Send item
    if (item.quantity - quantity <= 0) {
      from.inventory.content = from.inventory.content.filter((inventoryItem) => inventoryItem.id !== item.id)
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

const findAmmo = (inventory: Inventory) => {
  return inventory.content.find((item) => item.name === "Ammo")
}