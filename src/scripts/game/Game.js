import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Grid } from "./Grid";

export class Game extends Scene {
  create() {
    this.createBackground();

    this.grid = new Grid();
    this.container.addChild(this.grid.container);
  }
  
  createBackground() {
    this.bg = App.sprite("bg");
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }
}
