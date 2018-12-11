import Point2D from '../geometry/point2d';

export default class Peg {
  public position: Point2D;
  public heading: Point2D;

  constructor(
    position: Point2D = new Point2D(0, 0),
    heading: Point2D = new Point2D(0, 0),
  ) {
    this.position = position;
    this.heading = heading;
  }

  executeMovement(step: number): Peg {
    this.position =
      this.position.add(
        new Point2D(step * this.heading.x, step * this.heading.y),
      );

    return this;
  }

  bounceOfWalls(boardRatio: number): Peg {
    if ((this.position.x < 0 && this.heading.x < 0) ||
        (this.position.x > 1 && this.heading.x > 0)) {
      this.heading = this.heading.mirrorVertical();
    }

    if ((this.position.y < 0 && this.heading.y < 0) ||
        (this.position.y > boardRatio && this.heading.y > 0)) {
      this.heading = this.heading.mirrorHorizontal();
    }

    return this;
  }
}
