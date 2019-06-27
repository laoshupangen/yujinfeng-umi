import {Menu ,Icon } from 'antd'
const {SubMenu} = Menu
function MenuList(props){
   
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
   console.log(listItems)
    return (
        
            <Menu mode="inline" >
                {listItems}
            </Menu>
        
    )

}

export default MenuList