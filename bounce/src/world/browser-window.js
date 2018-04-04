class BrowserWindow {
  constructor() {
    this.html = document.documentElement;
  }

  scale() {
    return this.html.scrollWidth / 1000;
  }

  normalizedHeight() {
    return 1000 * (this.viewportHeight() / this.viewportWidth());
  }

  viewportWidth() {
    return this.html.clientWidth;
  }

  viewportHeight() {
    return this.html.clientHeight;
  }
}

export default BrowserWindow;
