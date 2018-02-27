const Scene = () => {
  let items = new Map();

  const spawn = (key, construct) => {
    items.set(key, construct(key));
  };

  const kill = (key) => {
    item = item.get(key);
    if (item && item.die) item.die();
    items.delete(key);
  };

  const update = (step, height) => {
    items.forEach(item => item.update(step, height));
  };

  const draw = (scale) => {
    items.forEach(item => item.draw(scale));
  }

  return { spawn, kill, update, draw };
};

export default Scene;
