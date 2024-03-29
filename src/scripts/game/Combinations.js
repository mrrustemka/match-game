import { App } from "../visualization/App";

export class Combinations {
  constructor(grid) {
    this.grid = grid;
    // console.log("25", "Combinations constructor");
  }

  getMatches() {
    // console.log("26", "getMatches");

    let result = [];

    this.grid.fields.forEach((checkingField) => {
      const mathcesNum = 3; // переопределяю К, которая по умолчанию равна 2

      App.config.combinationRules.forEach((rule) => {
        let matches = [checkingField.tile];

        rule.forEach((position) => {
          const row = checkingField.row + position.row;
          const col = checkingField.col + position.col;
          const comparingField = this.grid.getField(row, col);
          if (
            comparingField &&
            comparingField.tile.color === checkingField.tile.color
          ) {
            matches.push(comparingField.tile);
          }
        });

        if (matches.length === mathcesNum) {
          result.push(matches);
        }
      });
    });

    return result;
  }
}
