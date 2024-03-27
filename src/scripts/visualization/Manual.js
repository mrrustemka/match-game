import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Manual {
  constructor() {
    this.container = new PIXI.Container();
    this.sprite = App.sprite("manual");
    this.sprite.x = 100;
    this.sprite.y = 200;

    const lineOne = new PIXI.Text("Для победы необходимо", {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
      fontFamily: "Comic Sans",
      fontWeight: "900",
    });

    const lineTwo = new PIXI.Text("набрать 42 очка за 10 ходов.", {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
      fontFamily: "Comic Sans",
      fontWeight: "900",
    });

    const lineThree = new PIXI.Text("Бонусный ход позволяет поменять", {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
      fontFamily: "Comic Sans",
      fontWeight: "900",
    });

    const lineFour = new PIXI.Text("местами любые элементы!", {
      align: "center",
      cacheAsBitmap: true,
      height: 57,
      width: 82,
      fontFamily: "Comic Sans",
      fontWeight: "900",
    });
    lineOne.anchor.set(-0.2, -1);
    lineTwo.anchor.set(-0.1, -2);
    lineThree.anchor.set(-0.02, -3);
    lineFour.anchor.set(-0.1, -4);

    this.sprite.addChild(lineOne);
    this.sprite.addChild(lineTwo);
    this.sprite.addChild(lineThree);
    this.sprite.addChild(lineFour);
  }
}
