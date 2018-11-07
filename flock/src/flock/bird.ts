import { Item } from '../engine/interfaces';

import BrowserWindow from '../engine/browser-window';
import Point2D from '../engine/geometry/point2d';
import Sprite from '../engine/view/sprite';

export default class Bird implements Item {
  private position: Point2D;
  private heading: Point2D;

  private sprite: Sprite;

  constructor() {
    this.position = new Point2D(0, 0);
    this.heading = new Point2D(0.0002, 0.0002);
    this.sprite =
      new Sprite(document.documentElement, 'bird', new Point2D(0.05, 0.05));
  }

  update(step: number, boardRatio: number): void {
    this.position =
      this.position.add(
        new Point2D(step * this.heading.x, step * this.heading.y),
      );

    if (this.position.x < 0 || this.position.x > 1) {
      this.heading = this.heading.mirrorVertical();
    }

    if (this.position.y < 0 || this.position.y > boardRatio) {
      this.heading = this.heading.mirrorHorizontal();
    }
  }

  render(browserWindow: BrowserWindow): void {
    this.sprite.render(browserWindow, this.position, this.heading);
  }
}
