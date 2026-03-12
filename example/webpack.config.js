module.exports = {
  name: "wool_frontend",
  entry: "./main.mjs",
  output: {
    filename: "wool_frontend.js"
  },
  module: {
    rules: [
      {
        resource: /resources\/.+\.html$/,
        type: "asset/source"
      },
    ],
  },
  mode: "development"
}