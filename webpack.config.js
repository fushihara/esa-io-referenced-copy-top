const webpack = require("webpack");
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        // これが無いと、funtion a(...b:any) でエラーが出る
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  output: {
    filename: "script.user.js",
    path: path.resolve(__dirname, "out"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `// ==UserScript==
      // @name         esa.io Referenced Copy Top
      // @namespace    https://github.com/fushihara/xxxxxx
      // @match        https://*.esa.io/posts/*
      // @description  esa.ioのReferenced をページのヘッダー部分にも表示する
      // @version      ${process.env.npm_package_version}
      // @grant        none
      // @license      MIT
      // @source       https://github.com/fushihara/xxxxx
      // @homepage     https://greasyfork.org/ja/scripts/xxxxxx
      // @noframes
      // ==/UserScript==`
        .split("\n")
        .map((a) => a.trim())
        .join("\n"),
      raw: true,
    }),
  ],
};
