module.exports = {
  head: {
    title: 'nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon' }
    ]
  },
  build: {
    vendor: ['~/plugins/mavon-editor'],
    extend (config, { isClient }) {
      // 为 客户端打包 进行扩展配置
      if (isClient) {
        config.resolve.alias['vue'] = 'vue/dist/vue.common'
      }
    },
    loaders: [
      {
        test: /\.vue$/,
        loader: 'iview-loader',
        options: {
          prefix: true
        }
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.sass$/,
        loader: "style-loader!css-loader!sass-loader"
      },
    ]
  },
  plugins: [
    { src: '~/plugins/mavon-editor', ssr: false },
    { src: '~/plugins/iview', ssr: false },
  ],
  css: [
    '~assets/css/app.css',
    'iview/dist/styles/iview.css',
  ],
  loading: '~/components/loading.vue',
}