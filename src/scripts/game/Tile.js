import { App } from "../visualization/App";
import { gsap } from "gsap";

export class Tile {
  constructor(color) {
    // console.log("12", "Tile constructor");

    this.color = color;
    this.sprite = App.sprite(this.color);
    this.sprite.anchor.set(0.5);
  }

  isNeighbour(tile) {
    // console.log("37", "isNeighbour");

    return (
      Math.abs(this.field.row - tile.field.row) +
        Math.abs(this.field.col - tile.field.col) ===
      1
    );
  }

  setPosition(position) {
    // console.log("14", "setPosition");

    this.sprite.x = position.x;
    this.sprite.y = position.y;
  }

  moveTo(position, duration, delay, ease) {
    // console.log("39", "moveTo");

    return new Promise((resolve) => {
      gsap.to(this.sprite, {
        duration,
        delay,
        ease,
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

  remove() {
    // console.log("40", "remove");

    if (!this.sprite) {
      return;
    }
    this.sprite.destroy();
    this.sprite = null;
    if (this.field) {
      this.field.tile = null;
      this.field = null;
    }
  }

  fallDownTo(position, delay) {
    // console.log("41", "fallDownTo");

    return this.moveTo(position, 0.5, delay, "bounce.out");
  }
}
