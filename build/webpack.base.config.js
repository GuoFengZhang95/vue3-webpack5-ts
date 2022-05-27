const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成dist文件夹下的html模板
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const threadLoader = require('thread-loader')
threadLoader.warmup(
  {
    // the number of spawned workers, defaults to (number of cpus - 1) or
    // fallback to 1 when require('os').cpus() is undefined
    // workers: 4,

    // number of jobs a worker processes in parallel
    // defaults to 20
    workerParallelJobs: 20,

    // additional node.js arguments
    workerNodeArgs: ['--max-old-space-size=1024'],

    // Allow to respawn a dead worker pool
    // respawning slows down the entire compilation
    // and should be set to false for development
    poolRespawn: false,

    // timeout for killing the worker processes when idle
    // defaults to 500 (ms)
    // can be set to Infinity for watching builds to keep workers alive
    poolTimeout: 500,

    // number of jobs the poll distributes to the workers
    // defaults to 200
    // decrease of less efficient but more fair distribution
    poolParallelJobs: 200,
    // name of the pool
    // can be used to create different pools with elsewise identical options
    name: 'my-pool',
  },
  [
    'less-loader',
    'babel-loader',
    'vue-loader',
  ]
)
module.exports = {
  entry: [path.resolve(__dirname, '../src/main.ts')],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name][contenthash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      // vue$: "vue/dist/vue.esm.js", //加上这一句
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.vue', 'ts', '.js'],
  },
  module: {
    rules: [
      // js
      {
        test: /\.m?js$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/vuex'),
        ],
        use: [
          {
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader',
          },
        ]
      },
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        use: [
          {
            loader: 'ts-loader',
          },
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'thread-loader'
          },
          {
            loader: 'vue-loader'
          },
        ]
      },
      // css
      {
        test: /\.(c|sc|le|sa)ss$/,
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'thread-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#00C7DB',
                },
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, '../src/assets/style/mixins.less'),
              ],
              injector: 'prepend',
            },
          },
        ],
      },
      // image
      {
        test: /\.(png|jpg|gif|webp|svg|ico)$/,
        type: 'asset', // 代替file-loader url-loader
        // type: 'asset/resource' 代替file-loader
        // type: 'asset/inline' 代替url-loader
        // type: 'asset/source' 代替raw-loader
        generator: {
          filename: 'images/[hash][ext]',
        },
      },
      // font
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //生成的文件名称
      template: path.resolve(__dirname, '../src/index.html'), //模版源绝对路径
      // favicon: path.resolve(__dirname, '../public/favicon.ico') 使用这种方式感觉和CopyWebpackPlugin的范围冲突（实际不影响，但是模板html不能放在public文件夹下面）
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist/public'),
        },
      ],
    }),
    new VueLoaderPlugin(),
    new WebpackBar(),
  ],
}
