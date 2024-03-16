import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Grid } from "./Grid";
import { Combinations } from "./Combinations";

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    this.createBackground();

    this.grid = new Grid();
    this.container.addChild(this.grid.container);

    this.grid.container.on("tile-touch-start", this.onTileClick.bind(this));

    this.combinations = new Combinations(this.grid);
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
      const matches = this.combinations.getMatches();
      if (matches.length) {
        this.processMatches(matches);
      }
      this.disabled = false;
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

  processMatches(matches) {
    this.removeMatches(matches);
  }

  removeMatches(matches) {
    matches.forEach((element) => {
      element.forEach((tile) => {
        tile.remove();
      });
    });
  }
}
