
import styles from './index.css';
import Link from 'umi/link';
import router from 'umi/router';

import { Layout, Menu, Icon, Breadcrumb, Affix } from 'antd';
import { Component } from 'react';


const { SubMenu } = Menu
const { Sider, Content, Header } = Layout
function getValueByArray(menus,obj){
  let tem = null,keyname = Object.keys(obj)[0]
  console.log('obj',obj,Object.keys(obj))   
  for (let i = 0; i < menus.length; i++) {
    console.log(menus[i])
    for (let j = 0; j < menus[i].children.length; j++) {
      if (menus[i].children[j][keyname] === obj[keyname]) {
        tem = menus[i].children[j]
        break
      }
    }

  }
  console.log('tem',tem)

  return tem
}


class Home extends Component {
  state = {
    collapsed: false,
    routeHistory:[]
    
  };
  
  routes=[]
  menus = [{
    key: 'sub-1', value: '系统菜单', icon: 'user', children: [{ key: '1', value: '系统设置', icon: 'user', route: '/home/sys' },
    { key: '2', value: '用户管理', icon: 'user', route: '/home/user' },
    { key: '3', value: '角色管理', icon: 'user', route: '/home/role' },
    { key: '4', value: '资源管理', icon: 'user', route: '/home/resource' },
    { key: '5', value: '组织架构', icon: 'user', route: '/home/org' },
    { key: '6', value: '菜单管理', icon: 'user', route: '/home/menu' },
    { key: '7', value: '字典管理', icon: 'user', route: '/home/dic' }]
  },
  {
    key: 'sub-2', value: '宿舍管理', icon: 'user', children: 
    [{ key: '8', value: '校区楼栋', icon: 'user', route: '/home/campus' },
    { key: '9', value: '楼栋管理', icon: 'user', route: '/home/buildings' },
    { key: '10', value: '房间管理', icon: 'user', route: '/home/room' }]
  }]
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  shouldComponentUpdate(){
    // console.log('s',this.state,this.props)  
    return true
  }
  componentWillReceiveProps(){
    // console.log('rp',this.state,this.props)

  }
  componentWillUpdate(){
    // console.log('wu',this.state,this.props)

  }
  componentDidMount() {
    
    const location = this.props.location.pathname
    const currentMenu =getValueByArray(this.menus,{route:location})
    console.log('current',currentMenu)
    if(currentMenu){
      this.routes = [currentMenu]
      this.setState({
        routeHistory:this.routes.map((tem=><div className={styles.cheader_item} key={'cheader'+tem.key}><Link to={tem.route}>{tem.value}</Link><Icon onClick={this.handelClose.bind(this,tem)} type="close" /></div>))
      })  
      // this.state.routeHistory = this.routes.map((tem=><div className={styles.cheader_item} key={'cheader'+tem.key}><Link to={tem.route}>{tem.value}</Link><Icon onClick={this.handelClose.bind(this,tem)} type="close" /></div>))

    }
  }
  // increment(state, props) {
  //   return {
  //     routes: [...state.routes,]
  //   }
  // }
  menuChange = (item) => {
    let menus = this.menus
    let tem = getValueByArray(menus,{key:item.key})

    
   
    // console.log('???',tem)
    let index =this.routes.findIndex(r => r.key === tem.key)
    if (index > -1) return
    this.routes = [...this.routes,tem]
     this.state.routeHistory = this.routes.map(tem=><div className={styles.cheader_item} key={'cheader'+tem.key}><Link to={tem.route}>{tem.value}</Link><Icon onClick={this.handelClose.bind(this,tem)} type="close" /></div>)



  }

  handelClose = (route) => {
    // let index = this.routes.findIndex(r => r.key === route.key)
    console.log('index', route)
    this.routes = this.routes.filter(r=>r.key!==route.key)
    console.log('routes',this.routes)
    let length = this.routes.length
    let backRoute = length === 0 ? '/home' : this.routes[length - 1].route

    router.push(backRoute)
    this.setState({
      routeHistory:this.routes.map(tem=><div className={styles.cheader_item} key={'cheader'+tem.key}><Link to={tem.route}>{tem.value}</Link><Icon onClick={this.handelClose.bind(this,tem)} type="close" /></div>)
    })
    // this.state.routeHistory = this.routes.map(tem=><div className={styles.cheader_item} key={'cheader'+tem.key}><Link to={tem.route}>{tem.value}</Link><Icon onClick={this.handelClose.bind(this,tem)} type="close" /></div>)
    // this.props.history.goBack()

    // routeHistory = routes.map(tem=><div className={styles.cheader_item} key={'cheader'+tem.key}><Link to={tem.route}>{tem.value}</Link><Icon onClick={this.handelClose.bind(this,tem)} type="close" /></div>)




  }

  render() {
    
    const sMenu =this.menus.map(menu => {
      return <SubMenu key={menu.key} title={<div><Icon type={menu.icon} /><span>{menu.value}</span></div>} >
        {menu.children.map((child) => <Menu.Item key={child.key}><Link to={child.route}>{child.value}</Link></Menu.Item>)}
      </SubMenu>
    })

    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{
          padding: '0 25px',
          marginBottom: '5px'
        }}>
          <span className={styles.headerLeft}>宿舍安全管理</span>
          <div className={styles.headerRight}>
            <div>你好,管理员!</div>
            <div>|</div>
            <div><Link to='/login'>退出</Link></div>
          </div>
        </Header>

        <Layout style={{ height: '100%' }}>
          <Sider width='140' style={{ height: '100%', overflow: 'auto' }} collapsible collapsed={this.state.collapsed} trigger={null}>
            <div className={styles.triggerWrap}>
              <Icon className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle} />

            </div>
            <Menu theme="dark" style={{ borderRight: 'none' }} defaultSelectedKeys={['10']} mode="inline" onSelect={this.menuChange}>
              {sMenu}
            </Menu>
          </Sider>
          <Content>
            {/* <Affix > */}
              <div className={styles.cheader}>
                <div className={styles.cheader_item}><Link to="/home">首页</Link></div>
                {this.state.routeHistory}
              </div>

            {/* </Affix> */}
            <div style={{ padding: '16px',}}>
              <div style={{ background: "#fff", height: '', }}>
                {this.props.children}
              </div>


            </div>



          </Content>

        </Layout>


      </Layout>)
  }


}

export default Home