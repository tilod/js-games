import Point2D from '../geometry/point2d';
import Sprite from '../view/sprite';

class Ball {
  constructor({
    size = 100,
    position = [Ball.RADIUS, Ball.RADIUS],
    heading = [1, 1],
    view
  }) {
    this.size = size;
    this.position = new Point2D(position[0], position[1]);
    this.heading = new Point2D(heading[0], heading[1]);

    this.view =
      new Sprite(Object.assign({
        backgroundColor: 'red',
        borderRadius: '50%'
      }, view));

    this.colliding = false;
  }

  update(step, height) {
    this.catchResize(height);
    this.translate(step);
    this.bounceOfWalls(height);
  }

  draw(scale, viewportHeight) {
    this.view.draw(
      this.position,
      this.heading,
      this.size,
      scale,
      viewportHeight
    );
  }

  // private

  catchResize(height) {
    if (this.position.y > height - this.size)
      this.position.y = height - this.size;
  }

  translate(step) {
    this.position = this.position.add(this.heading.multiply(step / 10));
  }

  bounceOfWalls(height) {
    if (this.position.x < this.size || this.position.x > (1000 - this.size))
      this.heading = this.heading.mirrorHorizontal();

    if (this.position.y < this.size || this.position.y > (height - this.size))
      this.heading = this.heading.mirrorVertical();
  }
}

export default Ball;
