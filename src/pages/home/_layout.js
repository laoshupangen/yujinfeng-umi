
import styles from './index.css';
import Link from 'umi/link';

import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu
const { Sider, Content, Header } = Layout

export default function (props) {
  const user = { name: 'admin' }
  const data = [{ id: '1', title: 'ddd' }, { id: '22', title: '333' }]
  return (
    <Layout style={{ height: '100%' }}>
      <Header style={{
        padding: '0 25px', boxShadow: '5px 5px 5px rgba(0,0,0,.3)', marginBottom: '7px',
        background: 'linear-gradient(180deg,rgba(161, 161, 161, 1) 0%, rgba(161, 161, 161, 1) 0%, rgba(54, 54, 54, 1) 100%, rgba(54, 54, 54, 1) 100%)'
      }}>
        <span className={styles.headerLeft}>智慧校园管理平台</span>
        <div className={styles.headerRight}>
          <div>你好,{user.name}!</div>
          <div>|</div>
          <div><Link to='/login'>退出</Link></div>
        </div>
      </Header>

      <Layout style={{ height: '100%' }}>
        <Sider theme="light" width='140' style={{ height: '100%', background: '#666', overflow: 'auto' }}>
          <Menu style={{ background: '#666', color: '#fff', borderRight: 'none' }} mode="inline">
            <SubMenu key="sub_1" title={<span>System</span>} style={{ background: '#666666' }}>
              <Menu.Item key="2"><Link to="/home/sys">system</Link>     </Menu.Item>
              <Menu.Item key="1"><Link to="/home/user">user</Link>         </Menu.Item>
              <Menu.Item key="3"><Link to="/home/role">role</Link>         </Menu.Item>
              <Menu.Item key="4"><Link to="/home/resource">resource</Link> </Menu.Item>
              <Menu.Item key="5"><Link to="/home/org">org</Link>           </Menu.Item>
              <Menu.Item key="6"><Link to="/home/menu">menu</Link>         </Menu.Item>
              <Menu.Item key="7"><Link to="/home/dic">dic</Link>           </Menu.Item>
            </SubMenu>

            <SubMenu key="sub_2" title={<span>Dorm</span>} style={{ background: '#666666' }}>
              <Menu.Item key="1"><Link to="/home/campus">campus</Link>       </Menu.Item>
              <Menu.Item key="2"><Link to="/home/building">building</Link>   </Menu.Item>
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
