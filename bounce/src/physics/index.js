class Physics {
  reflect(collisions) {
    for (let collision of collisions) {
      const item1 = collision[0];
      const item2 = collision[1];
      const contactNormal1 = item1.position.normalize(item1.position.substract(item2.position));
      const contactNormal2 = contactNormal1.negate();

      item1.heading = item1.heading.substract(contactNormal1.multiply(2).multiply(contactNormal1.dot(item1.heading)));
      item2.heading = item2.heading.substract(contactNormal2.multiply(2).multiply(contactNormal2.dot(item2.heading)));
    }
  }

  // private

  doCollide(p1, s1, p2, s2) {
    return (p2.x - p1.x)*(p2.x - p1.x) + (p2.y - p1.y)*((p2.y - p1.y)) <= (s1 + s2)*(s1 + s2);
  }
}

export default Physics;
