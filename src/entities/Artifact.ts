import { Position, Sprite } from "../components/index.js";
import {uid} from '../util/index.js'
import { Item, Artifact as ArtifactItem } from "./items/index.js";

export class Artifact{
  id: string;
  name: string;
  sprite: Sprite;
  position: Position;
  isWalkable: boolean;
  inventoryVersion: Item;

  constructor(x: number, y: number) {
    this.id = `anomaly-${uid()}`;
    this.name = "Artifact";
    this.sprite = new Sprite('flame');
    this.position = new Position(x, y);
    this.isWalkable = true;
    this.inventoryVersion = new ArtifactItem()
  }
}

