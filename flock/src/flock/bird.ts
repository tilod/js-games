import { Item } from '../engine/interfaces';

import BrowserWindow from '../engine/browser-window';
import Point2D from '../engine/geometry/point2d';
import Peg from '../engine/physics/peg';
import Sprite from '../engine/view/sprite';
import World from '../engine/world';

export default class Bird implements Item {
  public world: World;

  public peg: Peg;
  public sprite: Sprite;

  private turnRate: number;

  constructor(turnRate: number) {
    this.turnRate = turnRate;

    this.peg = new Peg(new Point2D(0, 0), new Point2D(0.0002, 0.0002));
    this.sprite =
      new Sprite(document.documentElement, 'bird', new Point2D(0.05, 0.05));
  }

  update(step: number, boardRatio: number): void {
    this.peg.heading = this.peg.heading.rotateDeg(this.turnRate);

    this.peg
      .executeMovement(step)
      .bounceOfWalls(boardRatio);
  }

  render(browserWindow: BrowserWindow): void {
    this.sprite.render(browserWindow, this.peg.position, this.peg.heading);
  }
}
