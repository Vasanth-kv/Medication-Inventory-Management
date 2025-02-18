const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      timers: require.resolve("timers-browserify"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      process: require.resolve("process"), // ✅ FIXED
    },
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: "process",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  return config;
};







// const path = require('path');

// module.exports = function override(config, env) {
//     // Customize Webpack or other configurations here if needed
//     // config.resolve.fallback = {
//     //   "http": require.resolve("stream-http"),
//     //   "https": require.resolve("https-browserify"),
//     //   "url": require.resolve("url/"),
//     //   "buffer": require.resolve("buffer/"),
//     //   "timers": require.resolve("timers-browserify")
//     // };
//     return config;
//   };
  





  