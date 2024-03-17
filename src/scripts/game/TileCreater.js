import { App } from "../system/App";
import { Tools } from "../system/Tools";
import { Tile } from "./Tile";

export class TileCreater {
  static generate() {
    const color =
      App.config.C[
        Tools.randomNumber(0, App.config.C.length - 1)
      ];
    return new Tile(color);
  }
}
