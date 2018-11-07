export default class Point2D {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Point2D {
    return this.divide(this.length());
  }

  dot(other: Point2D): number {
    return this.x * other.x + this.y * other.y;
  }

  orientationDeg(): number {
    return (this.x < 0 ? 270 : 90) - this.angleRad() * 180/Math.PI;
  }

  orientationRad(): number {
    return (this.x < 0 ? 3/2*Math.PI : 1/2*Math.PI) - this.angleRad();
  }

  // private --------

  private angleRad(): number {
    return Math.atan(this.x / this.y);
  }
}
