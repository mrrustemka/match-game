import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Field } from "./Field";
import { Tile } from "./Tile";

export class Grid {
  constructor() {
    this.container = new PIXI.Container();

    this.fields = [];
    this.rows = App.config.grid.rows;
    this.cols = App.config.grid.cols;
    this.create();
    this.setPosition();
  }

  create() {
    this.createFields();
    this.createTiles();
  }

  createTiles() {
    const tile = new Tile("green");
    this.container.addChild(tile.sprite);
  }

  createFields() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createField(row, col);
      }
    }
  }

  createField(row, col) {
    const field = new Field(row, col);
    this.fields.push(field);
    this.container.addChild(field.sprite);
  }

  setPosition() {
    this.fieldSize = this.fields[0].sprite.width;
    this.width = this.cols * this.fieldSize;
    this.height = this.rows * this.fieldSize;
    this.container.x =
      (window.innerWidth - this.width) / 2 + this.fieldSize / 2;
    this.container.y =
      (window.innerHeight - this.height) / 2 + this.fieldSize / 2;
  }
}
