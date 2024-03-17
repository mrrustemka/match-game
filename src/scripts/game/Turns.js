import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Turns {
  constructor() {
    this.container = new PIXI.Container();
    const text = new PIXI.Text(App.config.turns, {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
    });

    this.sprite = App.sprite("field-selected");
    this.sprite.x = 1200;
    this.sprite.y = 400;
    this.sprite.addChild(text);
  }
}
