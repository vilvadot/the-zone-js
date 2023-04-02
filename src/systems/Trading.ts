import { ACTION, TRADE_PAYLOAD } from "../actions.js";
import { duplicateEntity, findAmmo, findItemOfSameType, removeFromInventory } from "../entities/helpers.js";
import { PRICES } from "../entities/items/prices.js";
import { Logger } from "../infra/logger.js";

export class Trading {
  static run(action: ACTION, logger: Logger) {
    if(action.name !== 'trade') return

    // TODO: Refactor
      // action does not need all those entities
      // price selection is a trainwreck
      // cleanup the rest
    const { item, player, merchant, quantity, transaction } = action.payload as TRADE_PAYLOAD;
    
    let to;
    let from;
    let price;
    
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
    if(buyerAmmo - (quantity * price) < 0) {
      logger.log(`You don't have enough Ammo to buy that!`, "yellow");
      return
    }

    findAmmo(from.inventory)!.quantity += (price * quantity)
    findAmmo(to.inventory)!.quantity -= (price * quantity)

    // Send item
    removeFromInventory(from.inventory, item, quantity)

    // Receive item
    const ownedItem = findItemOfSameType(to.inventory, item)
    if (!!ownedItem) {
      ownedItem.quantity += quantity;
    } else {
      var itemCopy = duplicateEntity(item);
      itemCopy.quantity = quantity;
      to.inventory.content.push(itemCopy);
    }
  }
}