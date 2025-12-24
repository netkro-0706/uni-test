const path = require('path');
const devcert = require('devcert');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = async (env, { mode }) => {
  const isDevelopment = mode === 'development';
  const { key, cert } = await devcert.certificateFor('localhost');

  return {
    mode: mode,
    entry: './src/main.tsx',
    output: {
      // filename: 'main.js',

      filename: (pathData) => {
        return pathData.chunk.name === 'main' ? 'main.js' : '[name].bundle.js';
      },
      chunkFilename: '[name].bundle.js',
      path: path.resolve(
        `./dist/components@${process.env.npm_package_version}`
      ),
      publicPath: `./components@${process.env.npm_package_version}/`,
    },
    module: {
      rules: [
        mode === 'development'
          ? {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules/,
              use: { loader: 'babel-loader' },
            }
          : {},
        {
          enforce: 'pre',
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.svg/,
          type: 'asset/inline',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'json'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      https: {
        key,
        cert,
      },
      port: 9100,
      proxy: [
        {
          context: ['jp/api/commerce/v5/ja'],
          target: 'https://www.uni.com',
          secure: true,
          changeOrigin: true,
        },
      ],
    },
    devtool: isDevelopment ? 'source-map' : false,
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 60 * 1024, // 60KB
        minSize: 0,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'main',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: isDevelopment
        ? []
        : [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                toplevel: true,
                compress: {
                  pure_funcs: ['console.debug', 'console.log'],
                },
              },
            }),
          ],
    },
    plugins: [],
  };
};
