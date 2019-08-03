import { Table, Button, Modal, Form, Input ,InputNumber,Popconfirm} from 'antd'
import { connect } from 'dva'
import { Component} from 'react';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class buildings  extends Component {
  state = {
    data: [],
    pagination: {current:1},
    loading: false,
    isAddShow:false

  };
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    
  }
  columns =
  [
    { title: '操作', key: 'id', render: (text, record) => (<div>
      <a style={{ paddingRight: '1rem' }} onClick={()=>this.showModal(record)}>编辑</a> 
    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record)}>
    <a href="javascript:">删除</a></Popconfirm></div>), align: 'center' },
    // { title:'id', dataIndex: 'id', key: 'id',colSpan:1},  
    { title: '所属楼栋', dataIndex: 'buildingName', key: 'buildingName', align: 'center', sorter: true }, 
    { title: 'title?', dataIndex: 'title', key: 'title', align: 'center' ,editable: true,},
    { title: 'number?', dataIndex: 'number', key: 'number', align: 'center' ,editable: true},
    { title: '层数', dataIndex: 'floor', key: 'floor', align: 'center' },
    { title: '空余床位数', dataIndex: 'freeBeds', key: 'freeBeds', align: 'center' },
    { title: '总床位', dataIndex: 'bedCount', key: 'bedCount', align: 'center' },
    { title: '入住人员性别', dataIndex: 'allowGender', key: 'allowGender', align: 'center' ,render:(text)=>{
      text = text==='0'?'男生':(text==='allowGender.unlimited'?'未定义':'女生')
      return text
    }}
  
  ]
  componentWillMount (){
    
    

  }
  
  componentDidMount() {
    const {setFieldsValue} = this.props.form
    setFieldsValue({buildingId:'42a62371-9fbf-4b0c-a086-5b6ed0ed8036'})
  }
  handleDelete = record => {
    const {dataSource,dispatch} = this.props;
    console.log(this.props)
    
    //  dispatch({type:'room/delete',payload:{id:record.id}})
    //  dispatch({type:'room/get',payload:{pageIndex:this.props.pagination.current,pageSize:20}})
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  showModal = (record) => {
    this.setState({
      isAddShow:false
    })
    this.setState({
      visible: true,
    });
    
    if(record.id){
      
      this.setState({
        isAddShow:true
      })
      const {getFieldsValue,setFieldsValue,resetFields} = this.props.form
      resetFields()
      let formdata = getFieldsValue()
      let keys = Object.keys(formdata)
      keys.forEach((key,index)=>{
        console.log(key,formdata[key])
        if(!formdata[key]){
          let temobj = {}
          temobj[key] = record[key]
          setFieldsValue(temobj)
        }
      })
      
     
      
    }
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
    if(!this.state.isAddShow){
      // dispatch({type:'room/add',payload:forms})
    }else{
      // dispatch({type:'room/update',payload:forms})
    }
    // dispatch({type:'room/get',payload:{pageIndex:this.props.pagination.current,pageSize:20}}) 
    // this.setState({
    //   visible: false,
    // });
  };
  handleTableChange = (pagination, filters, sorter) => {
    const {dispatch} = this.props
    // dispatch({type:'room/get',payload:{pageIndex:pagination.current,pageSize:this.props.pagination.pageSize}})
    // dispatch({type:'room/paginationChange',payload:{current:pagination.current,pageSize:this.props.pagination.pageSize}})
  };
  render() {
    const { getFieldDecorator} = this.props.form
    return (
      <div>
        <div><Button onClick={this.showModal}>增加</Button></div>
        <Table
          rowSelection={this.rowSelection}
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={this.props.data}
          pagination={this.props.pagination}
          loading={this.props.loading}
          onChange={this.handleTableChange}
          bordered
        />
        <Modal
          title="新增房间"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
        >
          <Form hideRequiredMark={this.state.isAddShow}>
          <Form.Item label="楼栋id" {...formItemLayout}>
            {getFieldDecorator('buildingId', {
              rules: [
                {
                  
                  required: true,
                  message: '输入房间编号',
                },
              ],
            })(<Input  disabled/>)}
          </Form.Item>
          <Form.Item label="寝室号number" {...formItemLayout}>
            {getFieldDecorator('number', {
              rules: [
                {
                  required: true,
                  message: '输入寝室号',
                },
              ],
            })(<Input placeholder="输入寝室号" />)}
          </Form.Item>
          <Form.Item label="房间楼栋" {...formItemLayout}>
            {getFieldDecorator('floor', {
              rules: [
                {
                  required: true,
                  message: '输入房间楼栋',
                },
              ],
            })(<InputNumber/>)}
          </Form.Item>
          <Form.Item label="房间tilte?" {...formItemLayout}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '房间title',
                },
              ],
            })(<Input placeholder="填写房间tilte" />)}
          </Form.Item>
          <Form.Item label="床铺数目" {...formItemLayout}>
            {getFieldDecorator('bedCount', {
              rules: [
                {
                  required: true,
                  message: '床铺数目',
                },
              ],
            })(<InputNumber min={1} max={10} />)}
          </Form.Item>
          </Form>
        </Modal>

      </div>
    )
  }
}
buildings = Form.create({})(buildings)
export default connect(state => {
  console.log('state.Room',state)
  return {
    // btnList: ['增加', '删除'],
    // loading:state.loading.models.room,
    // data:state.room.rooms.list,
    // pagination:{
    //   current:state.room.pagination.current,
    //   pageSize:state.room.pagination.pageSize,
    //   total:state.room.rooms.recordCount
    // }
  }
})(buildings)
