import Point2D from '../../../src/engine/geometry/point2d';

describe(Point2D, () => {
  describe('.center', () => {
    it('returns the center of the points', () => {
      expect(Point2D.center([new Point2D(2, 1), new Point2D(1, 2)]))
        .toEqual(new Point2D(1.5, 1.5));
    });

    it('returns the point when only one point is passed', () => {
      expect(Point2D.center([new Point2D(3, 3)]))
        .toEqual(new Point2D(3, 3));
    });
  });

  describe('#clone', () => {
    it('returns a new point with the same coordinates', () => {
      const p1 = new Point2D(1, 1);
      const p2 = p1.clone();

      expect(p1).toEqual(p2);
      expect(p1).not.toBe(p2);
    });
  });

  describe('#add', () => {
    it('adds the two points together', () => {
      expect(new Point2D(1, 4).add(new Point2D(5, 3)))
        .toEqual(new Point2D(6, 7));
    });
  });

  describe('#substract', () => {
    it('substracts the two points', () => {
      expect(new Point2D(5, 3).substract(new Point2D(1, 4)))
        .toEqual(new Point2D(4, -1));
    });
  });

  describe('#multiply', () => {
    it('multiplies the point with a scalar', () => {
      expect(new Point2D(2, 3).multiply(4)).toEqual(new Point2D(8, 12));
    });
  });

  describe('#divide', () => {
    it('divides the point with a scalar', () => {
      expect(new Point2D(9, 15).divide(3)).toEqual(new Point2D(3, 5));
    });
  });

  describe('#mirrorHorizontal', () => {
    it('mirrors the point on the y axis', () => {
      expect(new Point2D(1, 2).mirrorHorizontal()).toEqual(new Point2D(1, -2));
    });
  });

  describe('#mirrorVertical', () => {
    it('mirrors the point on the x axis', () => {
      expect(new Point2D(1, 2).mirrorVertical()).toEqual(new Point2D(-1, 2));
    });
  });

  describe('#negate', () => {
    it('negates the point', () => {
      expect(new Point2D(1, 2).negate()).toEqual(new Point2D(-1, -2));
    });
  });

  describe('#rotateDeg', () => {
    it('rotates the point by the given angle in degree', () => {
      const p: Point2D = new Point2D(1, 0).rotateDeg(30);
      expect(p.x).toBeCloseTo(0.866);
      expect(p.y).toBeCloseTo(0.5);
    });
  });
});
