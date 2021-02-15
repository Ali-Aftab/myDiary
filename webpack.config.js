module.exports = {
  entry: "./client/index.js", // assumes your entry point is the index.js in the root of your project folder
  mode: "development",
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
