module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|woff|woff2|otf)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 100000,
          },
        },
      ],
    });

    return config;
  },
};
