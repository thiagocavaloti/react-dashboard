/* eslint-disable no-undef */
require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new webpack.EnvironmentPlugin(process.env)
    ];

    return config;
  }
};
