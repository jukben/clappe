/**
 * Build new settings state from objects from chrome.storage listener
 * @param {chrome.storage} objects
 */
export const getNewSettings = objects =>
  Object.keys(objects).reduce((a, v) => {
    a[v] = objects[v].newValue; // eslint-disable-line
    return a;
  }, {});

export default getNewSettings;
