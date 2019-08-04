import Redirect from 'umi/redirect';
import { Table, Tabs, Switch ,Form} from 'antd'
import React from 'react'
const { TabPane } = Tabs;
import EditableFormTable from '@/components/EditableFormTable'
import {connect} from 'dva'
function home (props) {
    const menulist = JSON.parse(localStorage.getItem('menulist'))
    function callback(key) {
        console.log(key);
    }
    function save(row,key) {
        const {dispatch} = props
        console.log('tt',row,key)
        dispatch({type:'list/updateResource',payload:{id:key,...row}})   
        
    }
    const columns1 = [{ title: '名称', dataIndex: 'name', key: 'name', align: '' },
    { key: 'url', title: '连接', dataIndex: 'url', align: 'center', editable: true },
    { title: '目标', key: 'parentId', align: 'center', dataIndex: 'parentId', editable: true },
    {
        title: '是否菜单', key: 'isMenu', align: 'center', dataIndex: 'isMenu', render: (text) => {
            return <Switch checked={text}></Switch>
        }
    }]
    const rowSelection = {}
    let dataSource = []
    if(menulist instanceof(Array)){
       dataSource = menulist.map(m => {
            if (m.childNodes.length === 0) {
                return {
                    key: m.id,
                    url: m.url,
                    name: m.name,
                    parentId: m.parentId,
                    isMenu: false
                }
            } else {
                return {
                    key: m.id,
                    url: m.url,
                    name: m.name,
                    parentId: m.parentId,
                    isMenu: true,
                    children: m.childNodes.map(child => {
                        return {
                            key: child.id,
                            url: child.url,
                            name: child.name,
                            parentId: child.parentId,
                            isMenu: false
                        }
                    })
                }
            }
        })

    }
    
    return (

        <div>
            <div style={{ padding: '5px 10px' }}>初始化设置,配置基础数据</div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="系统菜单配置" key="1">
                 <EditableFormTable data={dataSource} columns={columns1} save={save}></EditableFormTable>
                </TabPane>
                <TabPane tab="xx数据录入" key="2">
                    {/* <Table rowSelection={rowSelection} bordered columns={columns1} dataSource={dataSource}></Table> */}

                </TabPane>
                <TabPane tab="yy数据录入" key="3">
                    {/* <Table rowSelection={rowSelection} bordered columns={columns1} dataSource={dataSource}></Table> */}

                </TabPane>
            </Tabs>

        </div>
    )
}

export default connect(
    state=>{
        console.log('home',state)
        return {
            menulist:state.user.menulist
        }
    }
)(home)