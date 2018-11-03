const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js", //start bundling from here
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, //exclude n0de_modules from bundling
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"] //extensions to bundle
  },
  output: {
    path: __dirname + "/dist", //where to bundle
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./dist", //fetch from here for developemnt
    hot: true
  }
};
