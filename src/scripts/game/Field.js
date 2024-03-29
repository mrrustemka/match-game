import { App } from "../visualization/App";

export class Field {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.sprite = App.sprite("field");
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.anchor.set(0.5);

    this.selected = App.sprite("field-selected");
    this.sprite.addChild(this.selected);
    this.selected.visible = false;
    this.selected.anchor.set(0.5);
    // console.log("9", "Field constructor");
  }

  unselect() {
    // console.log("21", "unselect");

    this.selected.visible = false;
  }

  select() {
    // console.log("22", "select");

    this.selected.visible = true;
  }

  get position() {
    // console.log("8", "get position");

    return {
      x: this.col * this.sprite.width,
      y: this.row * this.sprite.height,
    };
  }

  setTile(tile) {
    // console.log("13", "setTile");

    this.tile = tile;
    tile.field = this;
    tile.setPosition(this.position);
  }
}
