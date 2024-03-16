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
    rows: 12,
    cols: 12,
  },
};
