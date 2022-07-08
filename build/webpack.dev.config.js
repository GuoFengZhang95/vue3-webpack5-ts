const BaseConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const openInEditor = require('launch-editor-middleware')
const Webpack = require('webpack')
const { getPort } = require('./utils')
module.exports = async entry => {
  const { mode, env } = entry
  const portInfo = await getPort({ port: 443, host: 'mysaas.17m17.com' })
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
      server: 'https',
      compress: true,
      proxy: {
        '/mall-api': {
          target: `https://mall-api${env}.mumuxili.com`,
          changeOrigin: true,
          pathRewrite: { '^/mall-api': '' },
        },
        '/vip-api': {
          target: `https://vip${env}.mumuxili.com`,
          changeOrigin: true,
          pathRewrite: { '^/vip-api': '' },
        },
        '/login-api': {
          target: `https://login-api${env}.mumuxili.com`,
          changeOrigin: true,
          pathRewrite: { '^/login-api': '' },
        },
        '/api-api': {
          target: `https://api${env}.mumuxili.com`,
          changeOrigin: true,
          pathRewrite: { '^/api-api': '' },
        },
        '/service-login-api': {
          target: `https://login${env}.mumuxili.com`,
          changeOrigin: true,
          pathRewrite: { '^/service-login-api': '' },
        },
        '/mis-service': {
          target: `https://mis-service${env}.mumuxili.com`,
          changeOrigin: true,
          pathRewrite: { '^/mis-service': '' },
        },
        '/yqmm-api': {
          target: `https://yqmm-api${env}.mumuxili.com`,
          changeOrigin: true,
          pathRewrite: { '^/yqmm-api': '' },
        },
        '/app-web-api': {
          target: `https://app-web${env}.17m17.com`,
          changeOrigin: true,
          pathRewrite: { '^/app-web-api': '' },
        },
        '/yqmm-service-api': {
          target: `https://yqmm-service${env}.mumuxili.com`,
          changeOrigin: true,
          pathRewrite: { '^/yqmm-service-api': '' },
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
