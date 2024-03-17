import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Points {
  constructor() {
    this.container = new PIXI.Container();
    this.sprite = App.sprite("points");
    this.sprite.x = 1100;
    this.sprite.y = 200;

    const textPoints = new PIXI.Text("ОЧКИ: " + App.config.points, {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
      fontFamily: "Comic Sans",
      fill: "white",
      fontWeight: "900",
    });

    const textTurns = new PIXI.Text("ХОДЫ: " + App.config.turns, {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
      fontFamily: "Comic Sans",
      fill: "white",
      fontWeight: "900",
    });

    textPoints.anchor.set(-0.4, -1.75);
    textTurns.anchor.set(-0.4, -3.75);
    this.sprite.addChild(textPoints);
    this.sprite.addChild(textTurns);
  }
}
