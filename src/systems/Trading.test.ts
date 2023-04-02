import { beforeEach, describe, expect, it } from 'vitest'
import { ACTION_NAME } from '../actions';
import { Inventory } from '../components';
import { Artifact } from '../entities/Artifact';
import { Ammo } from '../entities/items/Ammo';
import { PRICES } from '../entities/items/prices';
import { Merchant } from '../entities/Merchant';
import { Player } from '../entities/Player';
import { Bus } from '../infra/bus';
import { Logger } from '../infra/logger';
import { Trading } from './Trading';

// Both entities own ammo straight away

describe("Trading system", () => {
    const bus = new Bus()
    const logger = new Logger(bus)
    let player;
    let merchant;

    beforeEach(() => {
        player = new Player()
        player.inventory = new Inventory([new Ammo(100)])
        merchant = new Merchant(0, 0)
        merchant.inventory = new Inventory([new Ammo(100)])
    })

    it("trades items from two entities", () => {
        const artifact = new Artifact(1);
        player.inventory.content.push(artifact)
        const originalMerchantInventory = getItemsName(merchant.inventory)
        const action = {
            name: ACTION_NAME.TRADE,
            payload: {
                item: artifact,
                player,
                merchant,
                transaction: "sell",
                quantity: 1
            }
        }

        Trading.run(action, logger);

        const merchantItems = getItemsName(merchant.inventory)
        expect(merchantItems).toEqual([...originalMerchantInventory, "Artifact"])
        expect(itemsLength(player.inventory)).to.equal(1)
    });

    it("stacks items of same type", () => {
        merchant.inventory.content.push(new Artifact(1))
        const item = new Artifact(1)
        const originalMerchantItems = itemsLength(merchant.inventory)
        const action = {
            name: ACTION_NAME.TRADE,
            payload: {
                item,
                player,
                merchant,
                transaction: "sell",
                quantity: 1
            }
        }

        Trading.run(action, logger);

        const merchantItems = itemsLength(merchant.inventory)
        expect(merchantItems).toEqual(originalMerchantItems)
        const artifacts = merchant.inventory.content[1]
        expect(artifacts.quantity).toEqual(2)
    });

    it.todo("ammo can be traded?")

    it("items are sold for Ammo", () => {
        const buyPrice = PRICES.Artifact.buy;
        const item = new Artifact(1)
        player.inventory.content.push(item)
        const originalPlayertAmmo = countAmmo(player.inventory)
        const action = {
            name: ACTION_NAME.TRADE,
            payload: {
                item,
                player,
                merchant,
                transaction: "sell",
                quantity: 1
            }
        }

        Trading.run(action, logger);

        expect(itemsLength(player.inventory)).toEqual(1)
        const playerAmmo = countAmmo(player.inventory)
        expect(playerAmmo).toEqual(originalPlayertAmmo + buyPrice)
    })

    it("items are bought for Ammo", () => {
        const sellPrice = PRICES.Artifact.sell
        const item = new Artifact(1)
        merchant.inventory.content.push(item)
        const originalPlayertAmmo = 1000;
        findAmmo(player.inventory)!.quantity = originalPlayertAmmo;
        const action = {
            name: ACTION_NAME.TRADE,
            payload: {
                item,
                merchant,
                player,
                transaction: "buy",
                quantity: 1
            }
        }

        Trading.run(action, logger);

        expect(itemsLength(player.inventory)).toEqual(2)
        const playerAmmo = countAmmo(player.inventory)
        expect(playerAmmo).toEqual(originalPlayertAmmo - sellPrice)
    })

    it("only does trade if buyer has enough ammo", () => {
        const item = new Artifact(1)
        const originalPlayertAmmo = 0;
        findAmmo(player.inventory)!.quantity = originalPlayertAmmo;
        merchant.inventory.content.push(item)
        const action = {
            name: ACTION_NAME.TRADE,
            payload: {
                item,
                merchant,
                player,
                transaction: "buy",
                quantity: 1
            }
        }

        Trading.run(action, logger);

        const playerAmmo = countAmmo(player.inventory)
        expect(playerAmmo).toEqual(originalPlayertAmmo)
        expect(itemsLength(player.inventory)).toEqual(1)
    })
})



const itemsLength = (inventory: Inventory) => {
    return inventory.content.length;
}

const countAmmo = (inventory: Inventory) => {
    return findAmmo(inventory)?.quantity || 0
}

const findAmmo = (inventory: Inventory) => {
    return inventory.content.find((item) => item.name === "Ammo")
}

const getItemsName = (inventory: Inventory) => {
    return inventory.content.map((item) => item.name)
}