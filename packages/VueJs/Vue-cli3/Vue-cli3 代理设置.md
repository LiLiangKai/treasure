# Vue-cli3 代理设置

在 `vue.config.js` 文件中做如下配置:

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': { // 代理的api
        target: 'http://localhost:10010/api', // 指向你请求的api的地址
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
        pathRewrite: { // 重写路径
          '^/api': ''
        }
      }
    }
  }
}
```

参考：https://cli.vuejs.org/zh/config/#devserver