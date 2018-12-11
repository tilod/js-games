import { Item } from '../engine/interfaces';

import BrowserWindow from '../engine/browser-window';
import Point2D from '../engine/geometry/point2d';
import Peg from '../engine/physics/peg';
import Sprite from '../engine/view/sprite';
import World from '../engine/world';

export default class Hunter implements Item {
  public world: World;

  public peg: Peg;
  public sprite: Sprite;

  constructor() {
    this.peg = new Peg(new Point2D(0, 0.5), new Point2D(0.0001, 0.0002));
    this.sprite =
      new Sprite(document.documentElement, 'hunter', new Point2D(0.1, 0.1));
  }

  update(step: number, boardRatio: number): void {
    // follow the nearest bird --------
    const birds: Array<Item> = this.world.getItems('bird');

    let nearestDistance: number = 9999;
    let nearestBird: Item = null;
    for (const bird of birds) {
      const distance: number = this.peg.position.quadDistance(bird.peg.position);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestBird = bird;
      }
    }

    const directionToBird: Point2D = nearestBird.peg.position.substract(this.peg.position);
    const directionOrientation: number = directionToBird.orientationDeg();
    const hunterOrientation: number = this.peg.heading.orientationDeg();
    const orientationDiff: number = directionOrientation - hunterOrientation;
    if (orientationDiff > 15) {
      this.peg.heading = this.peg.heading.rotateDeg(15);
    } else if (orientationDiff < -15) {
      this.peg.heading = this.peg.heading.rotateDeg(-15);
    } else {
      this.peg.heading = this.peg.heading.rotateDeg(orientationDiff);
    }
    // --------

    this.peg
      .executeMovement(step)
      .bounceOfWalls(boardRatio);
  }

  render(browserWindow: BrowserWindow): void {
    this.sprite.render(browserWindow, this.peg.position, this.peg.heading);
  }
}
