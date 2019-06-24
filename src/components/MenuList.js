import {Menu ,Icon } from 'antd'
const {SubMenu} = Menu
function MenuList(props){
    handleClick = e =>{

    }
    const lists = props.dataSource
    const  listItems = lists.map(list=>{
        if(!list.children||list.children.length === 0){
          return <Menu.Item key={list.id}><Icon type="folder" theme="filled"></Icon><span>list.title</span></Menu.Item>
        }
        else{
          return <SubMenu key={`sub${list.id}`} title={<span><Icon type="caret-right" theme="filled"></Icon></span>}>
               <Icon type="folder" theme="filled"></Icon>
           </SubMenu>
        }
    }) 

    return (
        
            <Menu mode="inline"  onClick={this.handleClick}>
                {listItems}
            </Menu>
        
    )

}

export default MenuList