const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
// to be updated for production
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// let localEnv;
// if (process.env.NODE_ENV === 'test') {
//   const { parsed: localEnv } = require('dotenv').config({ path: '.env.test' });
// } else if (process.env.NODE_ENV === 'development') {
//   const { parsed: localEnv } = require('dotenv').config({ path: '.env.development' });
// }

const webpack = require('webpack');

module.exports = withCSS(withSass({
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(require('dotenv').config({ path: '.env.development' }).parsed))

    return config
  }
}));