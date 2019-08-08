import { Table, Button, Modal, Form, Input, TreeSelect, Popconfirm, message } from 'antd'
import { connect } from 'dva'
import { Component } from 'react';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class graduate extends Component {
  state = {
    data: [],
    pagination: { current: 1 },
    loading: false,
    isAddShow: false,
    ModalTitle: '新增楼栋',
    selectItem: ''

  };
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

  }
  treeData = [
    {
      title: '航空制造工程学院',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
    },
  ];

  columns =
    [
      { title: '姓名', dataIndex: 'name', key: 'name', align: 'center', sorter: true },
      { title: '学号', dataIndex: 'number', key: 'number', align: 'center', editable: true, },

      { title: '院系', dataIndex: 'college', key: 'college', align: 'center' },
      { title: '班级', dataIndex: 'floors', key: 'floors', align: 'center' },

      { title: '毕业时间', dataIndex: '', key: '', align: 'center' },
      { title: '宿舍', dataIndex: 'roomName', key: 'roomName', align: 'center' },

    ]
  componentWillMount() {



  }

  componentDidMount() {
   
  }
  handleDelete = record => {
    const { dataSource, dispatch } = this.props;
   

  };
  toastInfo = ()=>{
    message.success('退宿成功!')
  }



  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props
    // dispatch({type:'room/get',payload:{pageIndex:pagination.current,pageSize:this.props.pagination.pageSize}})
    // dispatch({type:'room/paginationChange',payload:{current:pagination.current,pageSize:this.props.pagination.pageSize}})
  };
  treeChange = (value, label,)=>{
    console.log(value,label)

  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div style={{ padding: '5px 10px' }}>
          <Button onClick={this.toastInfo} type="primary">一键退宿</Button>
          
          {/* <TreeSelect treeData={this.treeData} style={{ width: 200 ,float:'right',marginRight:'10px'}} 
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="选择楼栋" onChange={this.treeChange}></TreeSelect>
          <TreeSelect treeData={this.treeData} style={{ width: 200 ,float:'right',marginRight:'10px'}} 
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="选择院系" onChange={this.treeChange}></TreeSelect> */}
        </div>
        <Table
          rowSelection={this.rowSelection}
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={this.props.data}
          pagination={this.props.pagination}
          loading={this.props.loading}
          bordered
        />
      </div>
    )
  }
}
graduate = Form.create({})(graduate)
export default connect(state => {
  console.log('state.graduate', state)
  return {
    data:state.graduate.graduates,
    pagination: {
      current: state.graduate.pagination.current,
      pageSize: state.graduate.pagination.pageSize,
      total: state.graduate.pagination.total
    }

  }
})(graduate)
