import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, Tree, Layout, Divider, Select } from 'antd'
import { connect } from 'dva'
import { Component } from 'react';
const { TreeNode } = Tree;
const { Option } = Select
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

import EditableFormTable from '@/components/EditableFormTable'

class campusEdit extends Component {
  state = {
    data: [],
    pagination: { current: 1 },
    loading: false,
    isAddShow: false

  };
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

  }
  columns =
    [
      // {
      //   title: '操作', key: 'id', render: (text, record) => (<div>
      //     <a style={{ paddingRight: '1rem' }} onClick={() => this.showModal(record)}>编辑</a>
      //     <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record)}>
      //       <a href="javascript:">删除</a></Popconfirm></div>), align: 'center'
      // },
      { title: '校区名称', dataIndex: 'name', key: 'name', align: 'center'},
      { title: '校区编号', dataIndex: 'number', key: 'number', align: 'center'},
      { title: '地址', dataIndex: 'address', key: 'address', align: 'center', editable: true },
      { title: '宿舍楼栋数', dataIndex: 'buildingCount', key: 'buildingCount', align: 'center', editable: true, },



    ]
  componentWillMount() {



  }

  componentDidMount() {
    const { setFieldsValue } = this.props.form
    // setFieldsValue({ id: '42a62371-9fbf-4b0c-a086-5b6ed0ed8036' })
  }
  
  handleDelete = record => {
    const { dispatch } = this.props;
    console.log(record)
    // dispatch({type:'',payload:{id:record.id}})
    
  };
  showModal = (record) => {
    this.setState({
      isAddShow: false
    })
    this.setState({
      visible: true,
    });

    if (record.id) {

      this.setState({
        isAddShow: true
      })
      const { getFieldsValue, setFieldsValue, resetFields } = this.props.form
      resetFields()
      let formdata = getFieldsValue()
      let keys = Object.keys(formdata)
      keys.forEach((key, index) => {
        console.log(key, formdata[key])
        if (!formdata[key]) {
          let temobj = {}
          temobj[key] = record[key]
          setFieldsValue(temobj)
        }
      })



    }
  };  
  
  save = (row,key)=>{
    const {dispatch} = this.props
    dispatch({type:'campusEdit/update',payload:{id:key,...row}})
  }
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  handleOk = e => {
    const { dispatch } = this.props
    const { getFieldsValue } = this.props.form
    let forms = getFieldsValue()
    // new Promise()
    dispatch({ type: 'campusEdit/add', payload: forms })

    dispatch({ type: 'campusEdit/get', payload: { keyword: '' } })
    this.setState({
      visible: false,
    });
  };
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props
    
  };
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout style={{ height: '100%' }}>
        <Layout.Sider width="200" theme='light'>
          <Tree checkable>
            <TreeNode title="校区列表" key="0-0">
              {this.props.data.map(tree=>(<TreeNode title={tree.name} key={tree.id}></TreeNode>))}
            </TreeNode>
          </Tree>
        </Layout.Sider>
        <Divider type="vertical" />
        <Layout.Content className='ant-layout ant-layout-content' style={{ background: '#fff' }}>
          <div style={{ padding: '10px' }}>
            <div className="selfFlex selfFlexSpaceBetween">
              <div>
                <Button type="primary" style={{ marginRight: '10px' }} onClick={this.showModal}>增加</Button>
                <Button type="primary" style={{ marginRight: '10px' }}>批量删除</Button>

              </div>
            </div>
          </div>
          <EditableFormTable data={this.props.data} columns={this.columns} pagination={false} save={this.save} handleDelete={this.handleDelete}></EditableFormTable>
          <Modal
            title="新增校区"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            centered
          >
            <Form hideRequiredMark={this.state.isAddShow}>
              <Form.Item label="校区编号" {...formItemLayout}>
                {getFieldDecorator('number', {
                  rules: [
                    {
                      required: true,
                      message: '校区编号',
                    },
                  ],
                })(<Input placeholder="输入校区编号" />)}
              </Form.Item>
              <Form.Item label="校区名称" {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '房间名称',
                    },
                  ],
                })(<Input placeholder="输入校区名称" />)}
              </Form.Item>
              <Form.Item label="校区地址" {...formItemLayout}>
                {getFieldDecorator('address', {
                  rules: [
                    {
                      required: true,
                      message: '校区地址',
                    },
                  ],
                })(<Input placeholder="输入校区地址" />)}
              </Form.Item>
              <Form.Item label="宿舍楼栋数" {...formItemLayout}>
                {getFieldDecorator('buildingCount', {
                  rules: [
                    {
                      required: false,
                      message: '',
                    },
                  ],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Form>
          </Modal>

        </Layout.Content>

      </Layout>

    )
  }
}
campusEdit = Form.create({})(campusEdit)
export default connect(state => {
 
  return {
    loading: state.loading.models.campusEdit,
    data: state.campusEdit.campus,

  }
})(campusEdit)
