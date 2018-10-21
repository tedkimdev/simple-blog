const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const getClientEnvironment = require('./env');

// Setting environment variables
const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
entry: paths.ssrJs,
  target: 'node', // building for node
  output: {
    path: paths.ssrBuild,
    filename: 'render.js',
    // Allow Node.js to load as require
    libraryTarget: 'commonjs2'
  },
  module: {
    // Set when loading each file
    rules: [
      {
        // oneOf will try all of the internal loaders
        // if not, run the bottom-most file-loader
        oneOf: [
          {
            // JS files are converted using barbell
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true
            },
          },
          /* When importing css and scss files
          It is important to run css-loaders/locals.
          Because it does not create files.*/
          {
            test: /\.css$/,
            loader: require.resolve('css-loader/locals'),
          },
          /* In the case of scss,
             set it up the same as production to ensure the css module works properly
             apply css-loaders/locals, too.
           */
          {
            test: /\.scss$/,
            use: [
              {
                loader: require.resolve('css-loader/locals'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  includePaths: [paths.globalStyles]
                }
              }
            ]
          },
          // If it is not a JavaScript or a style, it treats it as a file.
          // It is important to set emitFile: false 
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
              // It only creates paths and does not actually save the files.
              emitFile: false
            },
          }
        ]
      }
    ]
  },
  resolve: {
    // Settings in production makes NODE_PATH work properly.
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    )
  },
  // It is only need to apply the environment variable related plug-ins here.
  plugins: [
    new webpack.DefinePlugin(env.stringified),
  ],
};