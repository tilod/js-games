class Background {
  constructor({ backgroundColor }) {
    this.element = document.body;
    this.element.style.backgroundColor = backgroundColor;
  }

  draw() {}
}

export default Background;
