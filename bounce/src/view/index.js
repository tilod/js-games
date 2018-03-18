class View {
  draw(items, scale, viewportHeight) {
    for (let item of items) item.draw(scale, viewportHeight);
  }
}

export default View;
