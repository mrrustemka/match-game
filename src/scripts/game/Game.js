import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Grid } from "./Grid";

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();

    this.grid = new Grid();
    this.container.addChild(this.grid.container);

    this.grid.container.on("tile-touch-start", this.onTileClick.bind(this));
  }

  onTileClick(tile) {
    if (this.disabled) {
      return;
    }
    if (this.selectedTile) {
      if (!this.selectedTile.isNeighbour(tile)) {
        this.clearSelection(tile);
        this.selectTile(tile);
      } else {
        this.swap(this.selectedTile, tile);
      }
    } else {
      this.selectTile(tile);
    }
  }

  swap(selectedTile, tile) {
    this.disabled = true;
    this.clearSelection();
    selectedTile.sprite.zIndex = 2;

    selectedTile.moveTo(tile.field.position, 0.2);

    tile.moveTo(selectedTile.field.position, 0.2).then(() => {
      this.grid.swap(selectedTile, tile);
      this.disabled = false;
      // if (!reverse) {
      //     const matches = this.combinationManager.getMatches();
      //     if (matches.length) {
      //         this.processMatches(matches);
      //     } else {
      //         this.swap(tile, selectedTile, true);
      //     }
      // } else {
      //     this.disabled = false;
      // }
    });
  }

  clearSelection() {
    this.selectedTile.field.unselect();
    this.selectedTile = null;
  }

  selectTile(tile) {
    this.selectedTile = tile;
    this.selectedTile.field.select();
  }

  createBackground() {
    this.bg = App.sprite("bg");
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }
}
