module.exports = {
  rollup(config, options) {
    if (options.env === 'production') {
      config.output.file = 'public/null';
    } else {
      config.output.file = 'dist/index.js';
    }
    return config;
  },
};
