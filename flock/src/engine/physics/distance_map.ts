import Point2D from '../geometry/point2d';
import Peg from './peg';

export default class DistanceMap {
  private distance: Map<String, Map<String, Number>>;

  constructor() {
    this.distance = new Map();
  }

  distanceBetween(peg1: Peg, peg2: Peg): Number {
    if (!this.distance.get(peg1.id)) this.distance.set(peg1.id, new Map());

    const savedDistance: Number = this.distance.get(peg1.id).get(peg2.id);
    if (savedDistance) {
      return savedDistance;
    } else {
      const calculatedDistance = peg1.position.quadDistance(peg2.position);
      this.distance.get(peg1.id).set(peg2.id, calculatedDistance);

      if (!this.distance.get(peg2.id)) this.distance.set(peg2.id, new Map());
      this.distance.get(peg2.id).set(peg1.id, calculatedDistance);

      return calculatedDistance;
    }
  }
}
