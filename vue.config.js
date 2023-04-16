const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
})
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({ /* options */ }),
      require('unplugin-auto-import/webpack')({ /* options */ })
    ]
  }
}
