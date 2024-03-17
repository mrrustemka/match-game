import { Game } from "./Game";
import { Tools } from "../system/Tools";

export const Config = {
  loader: Tools.massiveRequire(
    require["context"]("./../../images/", true, /\.(mp3|png|jpe?g)$/)
  ),
  scenes: {
    Game: Game,
  },
  grid: {
    rows: 8,
    cols: 8,
  },
  C: ["green", "orange", "brown", "red", "yellow-green", "yellow"  ],
  combinationRules: [[
    {col: 1, row: 0}, {col: 2, row: 0},
], [
    {col: 0, row: 1}, {col: 0, row: 2},
]]
};
