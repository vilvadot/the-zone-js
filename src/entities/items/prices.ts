import { ItemName } from "."

export type PriceTable = Record<ItemName, {
    buy: number,
    sell: number
}>

export const PRICES: PriceTable = {
    "Artifact": { buy: 100, sell: 1000 },
    "Pseudo Dog Skin": {buy: 30, sell: 100 },
    "Ammo": { buy: 1, sell: 1 }
}