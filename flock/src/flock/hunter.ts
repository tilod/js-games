import { Item } from '../engine/interfaces';

import BrowserWindow from '../engine/browser-window';
import Point2D from '../engine/geometry/point2d';
import Peg from '../engine/physics/peg';
import Sprite from '../engine/view/sprite';
import World from '../engine/world';

export default class Hunter implements Item {
  public readonly id: String;
  public world: World;
  public peg: Peg;
  public sprite: Sprite;

  private movementWish: Point2D;

  constructor(id: String) {
    this.id = id;
    this.peg =
      new Peg(
        'hunter--peg',
        new Point2D(0, 0),
        new Point2D(1, 1).normalize(0.0004));
    this.sprite =
      new Sprite(document.documentElement, 'hunter', new Point2D(0.05, 0.05));
  }

  plan(step: number): void {
    const birds: Array<Item> = this.world.getItems('bird');

    let nearestDistance: number = 1;
    let nearestBird: Item = null;
    for (const bird of birds) {
      const distance: number = this.peg.position.quadDistance(bird.peg.position);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestBird = bird;
      }
    }

    const directionToBird: Point2D = nearestBird.peg.position.substract(this.peg.position);
    this.movementWish = this.peg.heading.rotateTowards(directionToBird, step / 3);
  }

  move(step: number, boardRatio: number): void {
    this.peg.heading = this.movementWish;

    this.peg
      .executeMovement(step)
      .bounceOfWalls(boardRatio);
  }

  render(browserWindow: BrowserWindow): void {
    this.sprite.render(browserWindow, this.peg.position, this.peg.heading);
  }
}
