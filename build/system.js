var systemName = 'cloud-v1/'
var staticType = 'dist-'
module.exports = {
  // 此处是开发的项目的简称，需要找后端进行确认，便于后端nginx代理返回静态资源，最后访问的html的地址将变为http://localhost:8080/cloud-first/index.html
  name: systemName,
  // 静态资源最后打包的文件夹名称，也就是static文件夹下的文件最后打包的文件夹名称，默认 项目名称-static
  assetsSubDirectory: systemName + staticType + 'static',
  // 配置代理，便于本地开发过程中可以连到任意的地址进行调试，可以按照规则配置多个代理地址
  proxyTable: {
    '/api': { // ajax请求http://localhost:8080/api/123会被代理到http://139.159.241.21:10086
      // target: 'http://58.16.181.23:10087',
      // target: 'http://192.168.1.54:11003',
      // target: 'http://58.16.181.23:10087',
      target: 'http://192.168.1.92:11001',
      changeOrigin: true, // 改变源
      pathRewrite: {
        '^/api': '/api' // 路径重写
      }
    }
  }
}
