import { App } from "../system/App";
import { gsap } from "gsap";

export class Tile {
  constructor(color) {
    this.color = color;
    this.sprite = App.sprite(this.color);
    this.sprite.anchor.set(0.5);
  }

  setPosition(position) {
    this.sprite.x = position.x;
    this.sprite.y = position.y;
  }

  moveTo(position, duration) {
    return new Promise((resolve) => {
      gsap.to(this.sprite, {
        duration,
        pixi: {
          x: position.x,
          y: position.y,
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }
}
