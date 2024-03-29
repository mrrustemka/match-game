import * as PIXI from "pixi.js";
import { App } from "../visualization/App";
import { Grid } from "./Grid";
import { Combinations } from "./Combinations";
import { Points } from "../visualization/Points";
import { Teleports } from "../visualization/Teleports";
import { Manual } from "../visualization/Manual";

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    // console.log("1", "Game constructor 1");
    this.createBackground();
    // console.log("3", "Game constructor 2");

    this.grid = new Grid();
    // console.log("36", "Game constructor 3");

    this.container.addChild(this.grid.container);
    // console.log("27", "Game constructor 4");

    this.grid.container.on("tile-touch-start", this.onTileClick.bind(this));
    // console.log("29", "Game constructor 5");

    this.combinations = new Combinations(this.grid);
    // console.log("32", "Game constructor 6");

    this.removeStartMatches();
    // console.log("33", "Game constructor 7");

    this.container.addChild(new Manual().sprite);
  }

  onTileClick(tile) {
    // console.log("23", "onTileClick");

    if (this.disabled) {
      return;
    }
    if (this.selectedTile) {
      if (!this.selectedTile.isNeighbour(tile)) {
        if (App.config.teleportCount > 0) {
          App.config.teleportCount--;
          this.swap(this.selectedTile, tile);
        } else {
          this.clearSelection(tile);
          this.selectTile(tile);
        }
      } else {
        this.swap(this.selectedTile, tile);
      }
    } else {
      this.selectTile(tile);
    }
  }

  swap(selectedTile, tile) {
    // console.log("20", "swap");

    App.config.turns--;
    this.container.addChild(new Points().sprite);
    this.container.addChild(new Teleports().sprite);

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

    if (App.config.turns % 5 === 0) {
      App.config.teleportCount++;
    }
  }

  clearSelection() {
    // console.log("30", "clearSelection");

    if (this.selectedTile) {
      this.selectedTile.field.unselect();
      this.selectedTile = null;
    }
  }

  selectTile(tile) {
    // console.log("31", "selectTile");

    this.selectedTile = tile;
    this.selectedTile.field.select();
  }

  createBackground() {
    // console.log("2", "createBackground");

    this.bg = App.sprite("bg");
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }

  processMatches(matches) {
    // console.log("24", "processMatches");

    this.removeMatches(matches);
    this.processFallDown()
      .then(() => this.addTiles())
      .then(() => this.onFallDownOver());
  }

  removeMatches(matches) {
    // console.log("38", "removeMatches");

    App.config.points += matches[0].length + matches.length - 1;
    matches.forEach((element) => {
      element.forEach((tile) => {
        tile.remove();
      });
    });
    this.container.addChild(new Points().sprite);

    if (App.config.points >= 42) {
      alert("Вы выиграли!");
    }
    if (App.config.turns <= 0) {
      alert("Вы проиграли");
    }
  }

  processFallDown() {
    // console.log("15", "processFallDown");

    return new Promise((resolve) => {
      let completed = 0;
      let started = 0;

      for (let row = this.grid.rows - 1; row >= 0; row--) {
        for (let col = this.grid.cols - 1; col >= 0; col--) {
          const field = this.grid.getField(row, col);

          if (!field.tile) {
            ++started;
            this.fallDownTo(field).then(() => {
              ++completed;
              if (completed >= started) {
                resolve();
              }
            });
          }
        }
      }
    });
  }

  fallDownTo(emptyField) {
    // console.log("16", "fallDownTo");

    for (let row = emptyField.row - 1; row >= 0; row--) {
      let fallingField = this.grid.getField(row, emptyField.col);

      if (fallingField.tile) {
        const fallingTile = fallingField.tile;
        fallingTile.field = emptyField;
        emptyField.tile = fallingTile;
        fallingField.tile = null;
        return fallingTile.fallDownTo(emptyField.position);
      }
    }

    return Promise.resolve();
  }

  addTiles() {
    // console.log("17", "addTiles");

    return new Promise((resolve) => {
      const fields = this.grid.fields.filter((field) => field.tile === null);
      let total = fields.length;
      let completed = 0;

      fields.forEach((field) => {
        const tile = this.grid.createTile(field);
        tile.sprite.y = -500;
        const delay = (Math.random() * 2) / 10 + 0.3 / (field.row + 1);
        tile.fallDownTo(field.position, delay).then(() => {
          ++completed;
          if (completed >= total) {
            resolve();
          }
        });
      });
      // console.log(fields);
    });
    ``;
  }

  onFallDownOver() {
    // console.log("18", "onFallDownOver");

    const matches = this.combinations.getMatches();

    if (matches.length) {
      this.processMatches(matches);
    } else {
      this.disabled = false;
    }
  }

  removeStartMatches() {
    // console.log("19", "removeStartMatches");

    let matches = this.combinations.getMatches();

    while (matches.length) {
      // this.removeMatches(matches);
      matches.forEach((element) => {
        element.forEach((tile) => {
          tile.remove();
        });
      });

      const fields = this.grid.fields.filter((field) => field.tile === null);

      fields.forEach((field) => {
        this.grid.createTile(field);
      });

      matches = this.combinations.getMatches();
    }
  }
}
