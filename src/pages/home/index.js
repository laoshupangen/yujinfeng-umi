import Redirect from 'umi/redirect';
import { Table, Tabs, Switch ,Form} from 'antd'
import React from 'react'
const { TabPane } = Tabs;
import EditableFormTable from '@/components/EditableFormTable'
import {connect} from 'dva'
function home (props) {
    const isEditing = record => record.key === editingKey;
    // const menulist = JSON.parse(localStorage.getItem('menulist'))
    
    var editingKey = ''
    function callback(key) {
        console.log(key);
    }
  
    const columns1 = [{ title: '名称', dataIndex: 'name', key: 'name', align: '' },
    { key: 'url', title: '连接', dataIndex: 'url', align: 'center', editable: true },
    { title: '目标', key: 'parentId', align: 'center', dataIndex: 'parentId', editable: true },
    {
        title: '是否菜单', key: 'isMenu', align: 'center', dataIndex: 'isMenu', render: (text) => {
            return <Switch checked={text}></Switch>
        }
    }, {
        title: '操作',
        align:'center',
        // dataIndex:'',
        render: (text, record) => {
            // console.log('edit',record)
            let editable = isEditing(record)
            console.log(editable)
            return  editable? (
                <span>
                    <EditableContext.Consumer>
                        {form => (
                            <a
                                href="javascript:;"

                                style={{ marginRight: 8 }}
                            >
                                保存
                  </a>
                        )}
                    </EditableContext.Consumer>
                    <Popconfirm title="Sure to cancel?" >
                        <a>Cancel</a>
                    </Popconfirm>
                </span>

            ) : (<a disabled={editingKey !== ''} onClick={() => edit(record.key)}>
                编辑
          </a>)

        }
    }]
    const rowSelection = {}
    const dataSource = props.menulist.map(m => {
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
    const columns = columns1.map(col=>{
        
        if(!col.editable){
            return col
        }
        return {
            ...col,
            onCell:record=>({
                record,
                dataIndex:col.dataIndex,
                title:col.title,
                editing:isEditing(record)
            })
        }
    })
    return (

        <div>
            <div style={{ padding: '5px 10px' }}>初始化设置,配置基础数据</div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="系统菜单配置" key="1">
                 <EditableFormTable></EditableFormTable>
                </TabPane>
                <TabPane tab="xx数据录入" key="2">
                    <Table rowSelection={rowSelection} bordered columns={columns1} dataSource={dataSource}></Table>

                </TabPane>
                <TabPane tab="yy数据录入" key="3">
                    <Table rowSelection={rowSelection} bordered columns={columns1} dataSource={dataSource}></Table>

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