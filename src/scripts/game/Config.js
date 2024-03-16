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
};
