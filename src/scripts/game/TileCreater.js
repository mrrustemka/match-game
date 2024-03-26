import { App } from "../system/App";
import { Tools } from "../system/Tools";
import { Tile } from "./Tile";

export class TileCreater {
  static generate() {
    return new Tile(
      App.config.tilesColors[
        Tools.randomNumber(0, App.config.tilesColors.length - 1)
      ]
    );
  }
}
