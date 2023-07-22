const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,

  devServer:{
    allowedHosts: "all",
    proxy:{
      '/api':{
        target:'http://localhost:8001/',
        secure: false,
        changeOrigin: true,
        pathRewrite:{'^/api' : '/api'},
        loglevel: 'debug'
      }
    }
  }
})
