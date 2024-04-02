import * as PIXI from "pixi.js";
import { App } from "./App";

export class Points {
  constructor() {
    this.container = new PIXI.Container();
    this.sprite = App.sprite("points");
    this.sprite.x = 375;
    this.sprite.y = 0;

    const textPoints = new PIXI.Text(
      "Points: " + App.config.points + "/" + App.config.goal,
      {
        align: "center",
        cacheAsBitmap: true,
        height: 57,
        width: 82,
        fontFamily: "Comic Sans",
        fill: "white",
        fontWeight: "900",
      }
    );

    const textTurns = new PIXI.Text("Steps: " + App.config.turns, {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
      fontFamily: "Comic Sans",
      fill: "white",
      fontWeight: "900",
    });

    textPoints.anchor.set(-0.2, -1.75);
    textTurns.anchor.set(-0.4, -3.75);
    this.sprite.addChild(textPoints);
    this.sprite.addChild(textTurns);
  }
}
