export default class Point2D {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static center(points: Array<Point2D>): Point2D {
    if (points.length === 1) {
      return points[0];
    } else {
      return points
        .reduce((centerPoint, point) => centerPoint.add(point))
        .divide(points.length);
    }
  }

  clone(): Point2D {
    return new Point2D(this.x, this.y);
  }

  add(other: Point2D): Point2D {
    return new Point2D(this.x + other.x, this.y + other.y);
  }

  substract(other: Point2D): Point2D {
    return new Point2D(this.x - other.x, this.y - other.y);
  }

  multiply(scalar: number): Point2D {
    return new Point2D(this.x * scalar, this.y * scalar);
  }

  divide(scalar: number): Point2D {
    return new Point2D(this.x / scalar, this.y / scalar);
  }

  mirrorHorizontal(): Point2D {
    return new Point2D(this.x, -this.y);
  }

  mirrorVertical(): Point2D {
    return new Point2D(-this.x, this.y);
  }

  negate(): Point2D {
    return new Point2D(-this.x, -this.y);
  }

  rotateDeg(angle: number): Point2D {
    return this.rotateRad(angle * Math.PI / 180);
  }

  rotateDegMax(angle: number, maxTurnRate: number): Point2D {
    if (angle > maxTurnRate) return this.rotateDeg(maxTurnRate);
    if (angle < -maxTurnRate) return this.rotateDeg(-maxTurnRate);

    return this.rotateDeg(angle);
  }

  rotateRad(angle: number): Point2D {
    const sin: number = Math.sin(angle);
    const cos: number = Math.cos(angle);

    return new Point2D(
      cos * this.x - sin * this.y,
      sin * this.x + cos * this.y,
    );
  }

  rotateRadMax(angle: number, maxTurnRate: number): Point2D {
    if (angle > maxTurnRate) return this.rotateRad(maxTurnRate);
    if (angle < -maxTurnRate) return this.rotateRad(-maxTurnRate);

    return this.rotateRad(angle);
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(length: number = 1): Point2D {
    return this.divide(this.length() / length);
  }

  dot(other: Point2D): number {
    return this.x * other.x + this.y * other.y;
  }

  angleRad(other: Point2D): number {
    return Math.acos(this.dot(other) / (this.length() * other.length()));
  }

  angleDeg(other: Point2D): number {
    return this.angleRad(other) * 180/Math.PI;
  }

  orientationDeg(): number {
    return (this.y < 0 ? 180 : 0) - Math.atan(this.x / this.y) * 180/Math.PI;
  }

  orientationRad(): number {
    return (this.y < 0 ? Math.PI : 0) - Math.atan(this.x / this.y);
  }

  quadDistance(other: Point2D): number {
    return Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2)
  }

  distance(other: Point2D): number {
    return Math.sqrt(this.quadDistance(other));
  }

  interpolate(other: Point2D, loading: number) {
    return this.multiply(1 - loading).add(other.multiply(loading));
  }
}
