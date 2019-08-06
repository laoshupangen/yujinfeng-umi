
import styles from './index.css';
import Link from 'umi/link';
import router from 'umi/router';

import { Layout, Menu, Icon, Breadcrumb, Affix, Avatar, Spin } from 'antd';
import { Component } from 'react';


const { SubMenu } = Menu
const { Sider, Content, Header } = Layout
function getValueByArray(menus, obj) {
  let tem = null, keyname = Object.keys(obj)[0]
  let temi = ''
  for (let i = 0; i < menus.length; i++) {

    for (let j = 0; j < menus[i].children.length; j++) {
      if (menus[i].children[j][keyname] === obj[keyname]) {
        tem = menus[i].children[j]
        temi = menus[i].key
        break
      }
    }

  }

  if (!tem) { temi = menus[0].key }
  return { currentMenu: tem, currentSub: temi }
}


class Home extends Component {
  state = {
    collapsed: false,
    routeHistory: [],
    selectedKey: [],
    defaultOpenKeys: ['sub-1'],
    openKeys: []

  }
  routes = []

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  menuChange = (item) => {

    this.setState({
      selectedKey: [item.key]
    })
    return
    let menus = this.menus
    let tem = getValueByArray(menus, { key: item.key })

    let index = this.routes.findIndex(r => r.key === tem.currentMenu.key)
    if (index > -1) return
    this.routes = [...this.routes, tem.currentMenu]
    this.state.routeHistory = this.routes.map(tem => <div className={styles.cheader_item} key={'cheader' + tem.key}><Link to={tem.route}>{tem.value}</Link><Icon onClick={this.handelClose.bind(this, tem)} type="close" /></div>)



  };
  handelOpenChange = (openkeys) => {

    this.setState({
      openKeys: openkeys,

    })
  };

  handelClose = (route) => {
    this.routes = this.routes.filter(r => r.key !== route.key)
    let length = this.routes.length
    let backRoute = length === 0 ? '/home' : this.routes[length - 1].route

    router.push(backRoute)
    this.setState({
      routeHistory: this.routes.map(tem => <div className={styles.cheader_item} key={'cheader' + tem.key}><Link to={tem.route}>{tem.value}</Link><Icon onClick={this.handelClose.bind(this, tem)} type="close" /></div>)
    })
  }
  loginOut = () => {
    const { dispatch } = window.g_app._store
    
    dispatch({ type: 'user/LoginQut'})
  }
  componentDidMount() {

    
    // const location = this.props.location.pathname.split('/').filter((l, index) => index < 3).join('/')
    // const currentMenu = getValueByArray(this.menus, { route: location })
    // if (currentMenu.currentMenu) {
    //   // console.log(currentMenu)
    //   this.routes = [currentMenu.currentMenu]
    //   this.setState({
    //     routeHistory: this.routes.map((tem => <div className={styles.cheader_item} key={'cheader' + tem.key}><Link to={tem.route}>{tem.value}</Link><Icon onClick={this.handelClose.bind(this, tem)} type="close" /></div>))
    //   })
    //   this.setState({
    //     selectedKey: [currentMenu.currentMenu.key],
    //     openKeys: [currentMenu.currentSub]
    //   })


    // } else {
    //   this.setState({
    //     defaultOpenKeys: [currentMenu.currentSub],
    //     openKeys: [currentMenu.currentSub]
    //   })
    // }

  }
  render() {
    const Authorization = false
    if (Authorization) {
      const menulist = JSON.parse(localStorage.getItem('menulist'))
      let sMenu = <Menu.Item key='smenu' disabled><Icon type='warning' />没有数据</Menu.Item>
      
      if (menulist instanceof Array) {
        sMenu = menulist.map(menu => {
          return <SubMenu key={menu.id} title={<div><Icon type='user' /><span>{menu.name}</span></div>} >
            {menu.childNodes.map((child) => <Menu.Item key={child.id}>{child.name}</Menu.Item>)}
          </SubMenu>
        });
      }


      return (
        <Layout style={{ height: '100%' }}>
          {/* <Spin wrapperClassName="" spinning={false}> */}
            <Header style={{
              padding: '0 25px',
              background: 'rgb(6,181,169)'
            }}>
              <span className={styles.headerLeft}>宿舍管理</span>
              <div className={styles.headerRight}>
                <div><Avatar icon="user" /></div>
                <div>你好,管理员!</div>
                <div>|</div>
                <div onClick={this.loginOut}>退出</div>
              </div>
            </Header>

            <Layout>
              <Sider style={{ overflow: 'auto' }} collapsible collapsed={this.state.collapsed} trigger={null}>
                <div className={styles.triggerWrap}>
                  <Icon className={styles.trigger}
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle} />

                </div>
                <Menu theme="dark" style={{ borderRight: 'none' }} inlineIndent={24} onOpenChange={this.handelOpenChange}
                  defaultOpenKeys={this.state.defaultOpenKeys}
                  openKeys={this.state.openKeys}
                  selectedKeys={this.state.selectedKey}
                  mode="inline" onSelect={this.menuChange}>
                  {sMenu}
                </Menu>
              </Sider>
              <Content className="ant-layout">
                <div>
                  <div className={styles.cheader}>
                    <div className={styles.cheader_item}><Link to="/home">首页</Link></div>
                    {this.state.routeHistory}
                  </div>
                </div>
                <div style={{ padding: '16px 16px 0', flex: '1' }}>
                  <div style={{ background: "#fff", height: '100%' }}>
                    {this.props.children}
                  </div>
                </div>
              </Content>
            </Layout>
          {/* </Spin> */}
        </Layout>
      )
    } else {
      return (<div style={{height:'100%'}}>
        {this.props.children}
      </div>)
    }
  }
}


export default Home