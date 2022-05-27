const BaseConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const openInEditor = require('launch-editor-middleware')
const Webpack = require('webpack')
const { getPort } = require('./utils')
module.exports = async entry => {
  const { mode, env } = entry
  const portInfo = await getPort({ port: 4396, host: 'localhost' })
  const devServerConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
    // devtool: 'eval-cheap-source-map',
    devServer: {
      host: portInfo.host,
      port: portInfo.port,
      hot: true,
      open: false,
      historyApiFallback: true,
      client: {
        logging: 'error',
        overlay: true,
        progress: true,
        reconnect: true,
      },
      server: 'http',
      compress: true,
      proxy: {
        '/api': {
          target: `https://api${env}.mumuxili.com`,
          changeOrigin: true,
          pathRewrite: { '^/mall-api': '' },
        },
      },
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined')
        }
        // 指定在那种编辑器中打开组件
        devServer.app.use('/__open-in-editor', openInEditor('code'))
        return middlewares
      },
    },
    module: {
      rules: [
        {
          test: /\.(c|sc|le|sa)ss$/,
          use: [
            {
              loader: 'style-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env.MODE': JSON.stringify(mode),
        'process.env.ENV': JSON.stringify(env),
      }),
    ],
  }
  return merge(devServerConfig, BaseConfig)
}
