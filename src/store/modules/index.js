const files = require.context(".", true, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key === "./index.js") {
    return;
  }
  const moduleName = key.replace(/^\.\/([a-z]+)\.js$/, "$1");
  modules[moduleName] = files(key).default;
});

export default modules;
