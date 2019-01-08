import { Item } from '../engine/interfaces';

import BrowserWindow from '../engine/browser-window';
import DistanceMap from '../engine/physics/distance_map';
import Point2D from '../engine/geometry/point2d';
import Peg from '../engine/physics/peg';
import Sprite from '../engine/view/sprite';
import World from '../engine/world';

export default class Bird implements Item {
  public readonly id: String;
  public world: World;
  public peg: Peg;
  public sprite: Sprite;

  private movementWish: Point2D;

  constructor(id: String) {
    this.id = id;

    this.peg =
      new Peg(
        id + '--peg',
        new Point2D(Math.random(), Math.random()),
        new Point2D(Math.random(), Math.random()).normalize(0.0002),
      );
    this.sprite =
      new Sprite(document.documentElement, 'bird', new Point2D(0.005, 0.005));
  }

  plan(step: number): void {
    let cohesionNeighborCount: number = 1;
    let cohesionPosition: Point2D = this.peg.position;

    let alignmentNeighborCount: number = 1;
    let alignmentHeading: Point2D = this.peg.heading;

    let separationNeighborCount: number = 0;
    let separationPosition: Point2D = new Point2D(0, 0);

    for (const item of this.world.getItems('bird')) {
      if (item === this) continue;
      const quadDistance = this.peg.position.quadDistance(item.peg.position)

      if (quadDistance > 0.04) continue;
      ++cohesionNeighborCount;
      cohesionPosition = cohesionPosition.add(item.peg.position);

      if (quadDistance > 0.01) continue;
      ++alignmentNeighborCount;
      alignmentHeading = alignmentHeading.add(item.peg.heading);

      if (quadDistance > 0.00025) continue;
      ++separationNeighborCount;
      separationPosition =
        separationPosition.add(
          item.peg.position.substract(this.peg.position)
        );
    }

    const cohesionDirection: Point2D =
      cohesionNeighborCount > 1
        ? cohesionPosition
            .divide(cohesionNeighborCount)
            .substract(this.peg.position)
            .normalize(1)
        : this.peg.heading.normalize(1);
    const alignmentDirection: Point2D =
      alignmentHeading
        .divide(alignmentNeighborCount)
        .normalize(4)
    const separationDirection: Point2D =
      separationNeighborCount > 0
        ? separationPosition
            .divide(separationNeighborCount)
            .negate()
            .normalize(2)
        : this.peg.heading.normalize(2);

    this.movementWish =
      cohesionDirection
        .add(alignmentDirection)
        .add(separationDirection)
        .normalize(0.0002);
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
