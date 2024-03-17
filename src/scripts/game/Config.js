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
    rows: 5,
    cols: 5,
  },
  tilesColors: ["green", "orange", "brown", "red", "yellow-green", "yellow"],
  combinationRules: [
    [
      { col: 1, row: 0 },
      { col: 2, row: 0 },
    ],
    [
      { col: 0, row: 1 },
      { col: 0, row: 2 },
    ],
  ],
  turns: 0,
  points: 0,
  // teleport: false,
  teleportCount: 1,
};
