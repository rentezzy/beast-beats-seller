module.exports = {
  webpack: {
    configure: {
      mode: "production",
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              name: "node_vendors",
              test: /[\\/]node_modules[\\/]/,
              chunks: "all",
            },
            common: {
              test: /[\\/]src[\\/]components[\\/]/,
              chunks: "all",
              minSize: 0,
            },
          },
        },
      },
    },
  },
};
