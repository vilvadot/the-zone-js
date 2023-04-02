import { Entities } from ".";
import { Inventory } from "../components/index.js";
import { isAdjacent } from "../util/index.js";
import { Item } from "./items/index.js";
import { Player } from "./Player.js";

export const duplicateEntity = (entity) => Object.assign(Object.create(Object.getPrototypeOf(entity)), entity)

export const findPlayer = (entities: Entities) => entities.find(({ isPlayer }) => isPlayer) as Player;

export const removeFromInventory = (inventory: Inventory, item: Item, quantity: number) => {
    const itemInInventory = inventory.content.find(owned => owned.id === item.id)

    if (!itemInInventory) return;

    if (itemInInventory.quantity - quantity <= 0) {
        inventory.content = inventory.content.filter((inventoryItem) => inventoryItem.id !== item.id)
    } else {
        itemInInventory.quantity -= quantity;
    }
}

export const findAmmo = (inventory: Inventory) => {
    return inventory.content.find((item) => item.name === "Ammo")
}

export const findItemOfSameType = (inventory: Inventory, item: Item) => {
    return inventory.content.find((owned) => owned.name === item.name)
}

export const findAdjacent = (player: Player, entities: Entities) => {
    return entities.find((entitity) => isEntityAdjacent(player, entitity));
  };
  
  export const isEntityAdjacent = (entityA, entityB) => {
    return isAdjacent(entityA.position, entityB.position);
  };
  