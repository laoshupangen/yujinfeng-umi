
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  singular:true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'umi',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /model\//,
          /services\//,
          /service\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  

  // proxy:{
  //   "/api":{
  //     target:'http://jsonplaceholder.typicode.com/',
  //     changeOrigin:true,
  //     pathRewrite: { "^/api" : "" }
  //   }
  // }
}
