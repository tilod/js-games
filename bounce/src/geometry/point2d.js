class Point2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Point2D(this.x + other.x, this.y + other.y);
  }

  substract(other) {
    return new Point2D(this.x - other.x, this.y - other.y);
  }

  multiply(scalar) {
    return new Point2D(this.x * scalar, this.y * scalar);
  }

  divide(scalar) {
    return new Point2D(this.x / scalar, this.y / scalar);
  }

  mirrorVertical() {
    return new Point2D(this.x, -this.y);
  }

  mirrorHorizontal() {
    return new Point2D(-this.x, this.y);
  }

  negate() {
    return new Point2D(-this.x, -this.y);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    return this.divide(this.length());
  }

  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
}

export default Point2D;
