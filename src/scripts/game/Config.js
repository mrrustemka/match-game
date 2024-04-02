import { Game } from "./Game";
import { Tools } from "../visualization/Tools";

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
  tilesColors: ["blue", "green", "purple", "red", "yellow"],

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
  turns: 10, // number of turns
  points: 0, // number of points
  teleportCount: 1, // number of bonus turns
  matchesNum: 2, // number of tiles to fire
  goal: 42, // game goal
};
