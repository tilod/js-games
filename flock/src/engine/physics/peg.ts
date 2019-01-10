import Point2D from '../geometry/point2d';

export default class Peg {
  public position: Point2D;
  public heading: Point2D;

  private _step: number;
  private _boardRatio: number;
  private _headingLength: number;

  constructor(
    position: Point2D = new Point2D(0, 0),
    heading: Point2D = new Point2D(0, 0),
  ) {
    this.position = position;
    this.heading = heading;
  }


  setupFrame(step: number, boardRatio: number): Peg {
    this._step = step;
    this._boardRatio = boardRatio;

    return this;
  }

  turn(direction: Point2D): Peg {
    this.heading = direction.normalize(this.headingLength());

    return this;
  }

  turnWithMax(direction: Point2D, maxTurnRate: number): Peg {
    const angle: number = this.heading.angleDeg(direction);
    const maxTurnAngle: number = this.step * maxTurnRate / 1000;

    if (angle > maxTurnAngle) {
      return this.turn(
        this.heading.interpolate(
          direction.normalize(this.headingLength()),
          maxTurnAngle / angle,
        )
      );
    } else {
      return this.turn(direction);
    }
  }

  executeMovement(): Peg {
    this.position =
      this.position.add(
        new Point2D(this.step * this.heading.x, this.step * this.heading.y),
      );

    return this;
  }

  bounceOfWalls(): Peg {
    if ((this.position.x < 0 && this.heading.x < 0) ||
        (this.position.x > 1 && this.heading.x > 0)) {
      this.heading = this.heading.mirrorVertical();
    }

    if ((this.position.y < 0 && this.heading.y < 0) ||
        (this.position.y > this.boardRatio && this.heading.y > 0)) {
      this.heading = this.heading.mirrorHorizontal();
    }

    return this;
  }


  private get step(): number { return this._step; }
  private get boardRatio(): number { return this._boardRatio; }

  private headingLength(): number {
    return this._headingLength || (this._headingLength = this.heading.length());
  }
}
