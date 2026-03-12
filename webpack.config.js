const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

const pkg = require("./package.json");
const { execSync } = require("child_process");
const git_hash = execSync("git rev-parse --short HEAD").toString().trim();
const git_tag = execSync("git tag -l --contains HEAD").toString().trim();
let version = pkg.version;
if (!git_tag) version += "-dev";

const banner_text = `
furnace, a service by solo central
`

const bundles = [
  {
    name: "wool_frame",
    entry: "./src/frame/index.mjs",
    output: {
      filename: "wool_frame.js",
      library: {
        name: "wool_frame",
        type: "var"
      }
    },
    mode: "development"
  },
  {
    name: "wool",
    dependencies: ["wool_frame"],
    entry: "./src/host/index.mjs",
    output: {
      filename: "wool.js",
      library: {
        name: "wool",
        type: "var"
      }
    },
    module: {
      rules: [
        {
          resource: /dist\/wool_frame\.js$/,
          type: "asset/source"
        },
      ],
    },
    mode: "development",
    optimization: {
      minimizer: [
        new TerserPlugin({extractComments: false})
      ],
    },  
    plugins: [
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(version),
        __GIT_HASH__: JSON.stringify(git_hash)
      }),
      new webpack.BannerPlugin({banner: banner_text.trim()})
    ]
  },
];

bundles.push({
  ...bundles[1],
  name: bundles[1].name + "_es6",
  experiments: {outputModule: true},
  output: {
    filename: "wool.mjs",
    library: {
      type: "module"
    }
  }
});

module.exports = bundles;