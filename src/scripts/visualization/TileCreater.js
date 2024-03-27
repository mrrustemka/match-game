import { App } from "./App";
import { Tools } from "./Tools";
import { Tile } from "../game/Tile";

export class TileCreater {
  static generate() {
    return new Tile(
      App.config.tilesColors[
        Tools.randomNumber(0, App.config.tilesColors.length - 1)
      ]
    );
  }
}
