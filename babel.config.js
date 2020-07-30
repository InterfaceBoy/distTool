module.exports = {
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      {
        useBuiltIns: "entry"
      }
    ]
  ],
  // 可选链插件
  plugins: ["@babel/plugin-proposal-optional-chaining"]
};
