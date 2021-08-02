module.exports = {
  images: {
    domains: [
      "emojipedia-us.s3.dualstack.us-west-1.amazonaws.com",
      "chpistel.sirv.com",
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp3|aif|svg)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "static/media/[name].[hash:8].[ext]",
          },
        },
      ],
    });

    return config;
  },
};
