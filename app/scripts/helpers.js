export const getNewSettings = objects =>
  Object.keys(objects).reduce((a, v, i, arr) => {
    a[v] = objects[v].newValue;
    return a;
  }, {});
