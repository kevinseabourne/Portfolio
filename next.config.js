const withSourceMaps = require("@zeit/next-source-maps")();
const Dotenv = require("dotenv-webpack");

module.exports = withSourceMaps({
  webpack(config, _options) {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
});
