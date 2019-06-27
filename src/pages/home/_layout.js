
import styles from './index.css';
import Link from 'umi/link';

import {Layout,Menu,Icon} from 'antd';

const {SubMenu} = Menu
const {Sider,Content,Header} = Layout



export default function(props) {
  const user = {name:'admin'}
  const data = [{id:'1',title:'ddd'},{id:'22',title:'333'}]
  
  return (
    <Layout style={{height:'100%'}}>
      <Header style={{padding:'0 25px',boxShadow:'5px 5px 5px rgba(0,0,0,.3)',marginBottom:'7px',
      background:'linear-gradient(180deg,rgba(161, 161, 161, 1) 0%, rgba(161, 161, 161, 1) 0%, rgba(54, 54, 54, 1) 100%, rgba(54, 54, 54, 1) 100%)'}}>
          <span className={styles.headerLeft}>智慧校园管理平台</span>
          <div className={styles.headerRight}>
            <div>你好,{user.name}!</div>
            <div>|</div>
            <div>退出</div>
          </div>
      </Header>
      
      <Layout style={{height:'100%'}}>
      <Sider theme="light" width='140' style={{height:'100%',background:'#666',overflow:'auto'}}>
      <Menu style={{background:'#666',color:'#fff',borderRight:'none'}} mode="vertical">
           
            <SubMenu
              key="sub1"
              title={                                
                  <span>宿舍管理</span>               
              }
              style={{background:'#666666'}}
            >
            
              <Menu.Item key="3">
                {/* <Link to="home/roomInfo">基础数据</Link> */}
                <Menu mode="vertical" style={{borderRight:'none'}}>
                <SubMenu title={<span>基础数据</span>}>
                  <Menu.Item><Link to="/home/campus">学区</Link></Menu.Item>
                </SubMenu>

                </Menu>
             </Menu.Item>
              <Menu.Item key="4"><Link to="/home">home测试    </Link></Menu.Item>
              <Menu.Item key="5">宿舍信息管理</Menu.Item>
              <Menu.Item key="6">房间物品管理</Menu.Item>
              
            </SubMenu>
          
          </Menu>
       </Sider>
        <Content>
          {props.children}
          {console.log(props)}  
        </Content>
      </Layout>
    
      
    </Layout>
    
  );
}
