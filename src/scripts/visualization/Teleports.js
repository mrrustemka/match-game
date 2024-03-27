import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Teleports {
  constructor() {
    this.container = new PIXI.Container();
    const text = new PIXI.Text("Бонус: ", {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
      fontFamily: "Comic Sans",
      fill: "white",
      fontWeight: "900",
    });

    const value = new PIXI.Text(App.config.teleportCount, {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
      fontFamily: "Comic Sans",
      fill: "white",
      fontWeight: "900",
    });

    this.sprite = App.sprite("bonus");
    this.sprite.x = 1150;
    this.sprite.y = 400;
    this.sprite.addChild(text);
    this.sprite.addChild(value);
    text.anchor.set(-0.3, -1);
    value.anchor.set(-4, -2);
  }
}
