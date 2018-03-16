class View {
  draw(items, scale) {
    for (let item of items) item.draw(scale);
  }
}

export default View;
