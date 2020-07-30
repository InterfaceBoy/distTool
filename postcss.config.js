module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue(css) {
        if (css.file.includes("iview")) {
          return 14; // iview 默认 14px === 1rem
        } else {
          return 19.2;
        }
      },
      minPixelValue: 3, // < 3 的不转换
      propList: ["*"],
      unitPrecision: 2
    }
  }
};
