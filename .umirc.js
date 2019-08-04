
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history: 'hash',
  // exportStatic: {
  //   htmlSuffix: true,
  //   dynamicRoot: true,
  // },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {webpackChunkName:true},
      title: '智慧校园',
      dll: false,
      routes:{
        exclude: [/models\//, /service/, /components/,],
      }
      
      
    }],
    ['./bMap.js']
  ],
  
   
    
  
  // publicPath:'./dist/static/js/',
  // cssPublicPath:'./dist/static/css/'
  

  
}
