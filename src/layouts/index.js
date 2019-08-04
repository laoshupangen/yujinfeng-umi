import styles from './index.css';


// 判断当前路由是否为合法


function BasicLayout(props) {  
  // matchRoutes(props.location.pathname,props.route.routes)?null:location.pathname = '404'
      //  <Spin wrapperClassName={styles.normal} tip="Loading..." spinning={spining}></Spin>       

  console.log('.-.',window.g_app._models)
  const spining = window.g_app._models[2].state.spining
  return (
    <div className={styles.normal}>{props.children}</div>
     
    
  );
}

export default BasicLayout;
// export default connect(state=>{return{isLogin:state.user.loginStatus}})(BasicLayout)
