import * as PIXI from "pixi.js";
import { App } from "../visualization/App";
import { Field } from "./Field";
import { TileCreater } from "../visualization/TileCreater";
import { Combinations } from "./Combinations";

export class Grid {
  constructor() {
    this.container = new PIXI.Container();

    this.fields = [];
    this.rows = App.config.grid.rows;
    this.cols = App.config.grid.cols;
    this.create();
    this.setPosition();
  }

  swap(tile1, tile2) {
    const tile1Field = tile1.field;
    const tile2Field = tile2.field;

    tile1Field.tile = tile2;
    tile2.field = tile1Field;

    tile2Field.tile = tile1;
    tile1.field = tile2Field;
  }

  create() {
    this.createFields();
    this.createTiles();
  }

  createTiles() {
    this.fields.forEach((field) => this.createTile(field));
  }

  createTile(field) {
    const tile = TileCreater.generate();
    field.setTile(tile);
    this.container.addChild(tile.sprite);
    tile.sprite.interactive = true;
    tile.sprite.on("pointerdown", () => {
      this.container.emit("tile-touch-start", tile);
    });

    return tile;
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
      (window.innerWidth - this.width) / 6 + this.fieldSize / 6;
    this.container.y = (window.innerHeight - this.height) / 2 + this.fieldSize;
  }

  getField(row, col) {
    return this.fields.find((field) => field.row === row && field.col === col);
  }
}
