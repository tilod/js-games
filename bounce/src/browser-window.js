const BrowserWindow = () => {
  let html = document.documentElement;

  const scale = () => {
    return html.scrollWidth / 1000;
  }

  const normalizedHeight = () => {
    return 1000 * (html.clientHeight / html.clientWidth);
  };

  return { scale, normalizedHeight };
};

export default BrowserWindow;
