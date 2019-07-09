
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'umi',
      dll: false,
      
      
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
