import { Table, Button, Modal, Form, Input } from 'antd'
import { connect } from 'dva'
import { Component } from 'react';

const columns =
  [
    { title: '操作', key: 'id', render: (text, record) => (<span><a style={{ paddingRight: '1rem' }} href="javascript:">修改</a><a href="javascript:">删除</a></span>), align: 'center' },
    // { title:'id', dataIndex: 'id', key: 'id',colSpan:1},  
    { title: '学区名称', dataIndex: 'name', key: 'name', align: 'center', sorter: true, }, { title: '学区编号', dataIndex: 'number', key: 'number', align: 'center' },
    { title: '地址', dataIndex: 'address', key: 'address', align: 'center' },
    { title: '宿舍楼栋数', dataIndex: 'buildingCount', key: 'building', align: 'center' }]

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  // getCheckboxProps: record => ({
  //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //   name: record.name,
  // }),
};
class Campus extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false

  };
  componentWillMount (){
    
    

  }
  
  componentDidMount() {
    // this.fetch();
    // this.setState((state, props) => ({
    //   counter: props.pagination
    // }));
    
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  handleOk = e => {
    const {dispatch} = this.props
    const {getFieldsValue} = this.props.form
    let forms = getFieldsValue()
    console.log('forms',dispatch)
    dispatch({type:'campus/add',payload:forms})
    dispatch({type:'campus/fetch',payload:{pageIndex:1}}) 
    // this.setState({
    //   visible: false,
    // });
  };
  handleTableChange = (pagination, filters, sorter) => {
    console.log('pagination', pagination)
    const {dispatch} = this.props
    // const pager = { ...this.state.pagination }
    // pager.current = pagination.current
    dispatch({type:'campus/fetch',payload:{pageIndex:pagination.current}})

    // this.setState({ pagination: pager })
  };
  render() {
    console.log('wprops',this.props)
    const { getFieldDecorator} = this.props.form
    return (
      <div>
        {/* <div><Button onClick={this.showModal}>增加</Button></div> */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.props.data}
         
          loading={this.props.loading}
         
          bordered
        />
        {/* <Modal
          title="新增校区"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
        >
          <Form.Item label="校区编号" {...formItemLayout}>
            {getFieldDecorator('number', {
              rules: [
                {
                  required: true,
                  message: '输入校区编号',
                },
              ],
            })(<Input placeholder="输入校区名称" />)}
          </Form.Item>
          <Form.Item label="校区名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '输入校区名称',
                },
              ],
            })(<Input placeholder="校区编号" />)}
          </Form.Item>
          <Form.Item label="校区名称" {...formItemLayout}>
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '校区地址',
                },
              ],
            })(<Input placeholder="填写校区地址" />)}
          </Form.Item>
        </Modal> */}

      </div>
    )
  }
}
Campus = Form.create({})(Campus)
export default connect(state => {
  console.log('state.campus',state)
  return {
    btnList: ['增加', '删除'],
    loading:state.loading.models.campus,
    data: state.campus.campusdata,
   
  }
})(Campus)
