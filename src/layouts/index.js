import styles from './index.css';
import {Spin} from 'antd'

// 判断当前路由是否为合法


function BasicLayout(props) {  
  // matchRoutes(props.location.pathname,props.route.routes)?null:location.pathname = '404'
  console.log('.-.',window.g_app._models)
  const spining = window.g_app._models[2].state.spining
  return (
    
     
       <Spin wrapperClassName={styles.normal} tip="Loading..." spinning={spining}>{props.children}</Spin>       
    
  );
}

export default BasicLayout;
// export default connect(state=>{return{isLogin:state.user.loginStatus}})(BasicLayout)
