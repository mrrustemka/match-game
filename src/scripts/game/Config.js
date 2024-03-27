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
    // размер игрового поля N*M
    rows: 3, // N
    cols: 3, // M
  },
  tilesColors: ["blue", "green", "purple", "red", "yellow"], // количество возможныхвариантов цветов (C)

  combinationRules: [
    // правила комбинаций при попытки сжигании тайлов
    [
      { col: 1, row: 0 },
      { col: 2, row: 0 },
    ],
    [
      { col: 0, row: 1 },
      { col: 0, row: 2 },
    ],
  ],
  turns: 10, // колиечство ходов (Y)
  points: 0, // количество очков (X)
  teleportCount: 1, // количество бонусных ходов
};
