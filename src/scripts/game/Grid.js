import * as PIXI from "pixi.js";
import { App } from "../visualization/App";
import { Field } from "./Field";
import { TileCreater } from "../visualization/TileCreater";

export class Grid {
  constructor() {
    this.container = new PIXI.Container();
    // console.log("4", "Grid constructor");

    this.fields = [];
    this.rows = App.config.grid.rows;
    this.cols = App.config.grid.cols;
    this.tiles = [];
    this.create();
    this.setPosition();
    // console.log(this.tiles);
  }

  swap(tile1, tile2) {
    // console.log("28", "swap");

    const tile1Field = tile1.field;
    const tile2Field = tile2.field;

    tile1Field.tile = tile2;
    tile2.field = tile1Field;

    tile2Field.tile = tile1;
    tile1.field = tile2Field;
  }

  create() {
    // console.log("5", "create");

    this.createFields();
    this.createTiles();
  }

  createTiles() {
    // console.log("10", "createTiles");

    this.fields.forEach((field) => this.createTile(field));
  }

  createTile(field) {
    // console.log("11", "createTile");

    const tile = TileCreater.generate();
    field.setTile(tile);
    this.container.addChild(tile.sprite);
    this.tiles.push(tile.color);
    tile.sprite.interactive = true;
    tile.sprite.on("pointerdown", () => {
      this.container.emit("tile-touch-start", tile);
    });

    // console.log(this.tiles);
    return tile;
  }

  createFields() {
    // console.log("6", "createFields");

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createField(row, col);
      }
    }
  }

  createField(row, col) {
    // console.log("7", "createField");

    const field = new Field(row, col);
    this.fields.push(field);
    this.container.addChild(field.sprite);
  }

  setPosition() {
    // console.log("34", "setposition");

    this.fieldSize = this.fields[0].sprite.width;
    this.width = this.cols * this.fieldSize;
    this.height = this.rows * this.fieldSize;
    this.container.x =
      (window.innerWidth - this.width) / 2 + this.fieldSize / 2;
    this.container.y =
      (window.innerHeight - this.height) / 2 + this.fieldSize / 2;
  }

  getField(row, col) {
    // console.log("35", "getField");

    return this.fields.find((field) => field.row === row && field.col === col);
  }
}
