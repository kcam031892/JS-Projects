module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /.html$/,
        use: ['html-loader']
      },
      {
        test: /.(png|jpe?g|svg|gif)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      }
    ]
  }
};
