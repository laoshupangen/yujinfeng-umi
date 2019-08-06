import { Table, Button, Modal, Form, Input, Select, Popconfirm } from 'antd'
import { connect } from 'dva'
import { Component } from 'react';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class buildings extends Component {
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
  columns =
    [
      {
        title: '操作', key: 'id', render: (text, record) => (<div>
          <a style={{ paddingRight: '1rem' }} onClick={() => this.showModal(record)}>编辑</a>
          <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record)}>
            <a href="javascript:">删除</a></Popconfirm></div>), align: 'center'
      },
      // { title:'id', dataIndex: 'id', key: 'id',colSpan:1},  
      { title: '楼栋名称', dataIndex: 'title', key: 'title', align: 'center', sorter: true },
      { title: '楼栋编号', dataIndex: 'number', key: 'number', align: 'center', editable: true, },

      { title: '所在校区', dataIndex: 'campusName', key: 'campusName', align: 'center' },
      { title: '楼层数', dataIndex: 'floors', key: 'floors', align: 'center' },
      {
        title: '楼栋类型', dataIndex: 'allowGender', key: 'allowGender', align: 'center', render: (text) => {
          text = text === '1' ? '男宿舍' : (text === '0' ? '女宿舍' : '未定义')
          return text
        }
      },
      { title: '管理员', dataIndex: '', key: '', align: 'center' },
      { title: '容纳人数', dataIndex: 'roomCount', key: 'roomCount', align: 'center' },

    ]
  componentWillMount() {



  }

  componentDidMount() {
    const { setFieldsValue } = this.props.form
    // setFieldsValue({buildingId:'42a62371-9fbf-4b0c-a086-5b6ed0ed8036'})
  }
  handleDelete = record => {
    const { dataSource, dispatch } = this.props;
    dispatch({ type: 'room/delete', payload: { id: record.id } })
    dispatch({ type: 'list/getBuildings' })

  };
  showModal = (record) => {
    const { getFieldsValue, setFieldsValue, resetFields } = this.props.form
    resetFields()

    this.setState({
      isAddShow: false,
      ModalTitle: '新增楼栋信息',
      selectItem: '',
      visible: true,
    })

    if (record.id) {
      this.setState({
        isAddShow: true,
        ModalTitle: '修改楼栋信息',
        selectItem: record.id
      })

      let formdata = getFieldsValue()
      let keys = Object.keys(formdata)
      keys.forEach((key, index) => {

        if (!formdata[key]) {
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
    const { dispatch } = this.props
    const { getFieldsValue } = this.props.form
    let forms = getFieldsValue()
    if (!this.state.isAddShow) {
      dispatch({ type: 'buildings/add', payload: forms })
    } else {
      console.log({ id: this.state.selectItem, ...forms })
      dispatch({ type: 'buildings/update', payload: { id: this.state.selectItem, ...forms } })
    }
    // dispatch({type:'room/get',payload:{pageIndex:this.props.pagination.current,pageSize:20}}) 
    this.setState({
      visible: false,
    });
  };
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props
    // dispatch({type:'room/get',payload:{pageIndex:pagination.current,pageSize:this.props.pagination.pageSize}})
    // dispatch({type:'room/paginationChange',payload:{current:pagination.current,pageSize:this.props.pagination.pageSize}})
  };
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <div style={{ padding: '5px 10px' }}><Button onClick={this.showModal} type="primary">增加</Button></div>
        <Table
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={this.props.data}
          pagination={false}
          loading={this.props.loading}
          bordered
        />
        <Modal
          title={this.state.ModalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
        >
          <Form hideRequiredMark={this.state.isAddShow}>
            <Form.Item label="楼栋编号" {...formItemLayout}>
              {getFieldDecorator('number', {
                rules: [
                  {

                    required: true,
                    message: '楼栋编号',
                  },
                ],
              })(<Input disabled={this.state.isAddShow} placeholder="楼栋编号" />)}
            </Form.Item>
            <Form.Item label="楼栋名称" {...formItemLayout}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '楼栋名称',
                  },
                ],
              })(<Input placeholder="楼栋名称" />)}
            </Form.Item>
            {this.state.isAddShow && <Form.Item label="所在区域" {...formItemLayout}>
              {getFieldDecorator('campusName', {
                rules: [
                  {
                    required: true,
                    message: '所在区域',
                  },
                ],
              })(<Input disabled placeholder="所在区域" />)}
            </Form.Item>}
            {!this.state.isAddShow && <Form.Item label="选择校区" {...formItemLayout}>
              {getFieldDecorator('campusId', {
                rules: [
                  {
                    required: true,
                    message: '选择所在区域',
                  },
                ],
              })((<Select placeholder="选择校区" onSelect={this.handleSelect} style={{ width: '100%' }}>
                {this.props.campus.map(d => (
                  <Select.Option key={d.id}>{d.name}</Select.Option>
                ))}
              </Select>))}
            </Form.Item>}
            {this.state.isAddShow && <Form.Item label="楼栋类型" {...formItemLayout}>
              {getFieldDecorator('allowGender', {
                rules: [
                  {
                    required: true,
                    message: '楼栋类型',
                  },
                ],
              })(<Input placeholder="楼栋类型" />)}
            </Form.Item>}
            {!this.state.isAddShow && <Form.Item label="楼栋类型" {...formItemLayout}>
              {getFieldDecorator('allowGender', {
                rules: [
                  {
                    required: true,
                    message: '选择楼栋类型',
                  },
                ],
              })(<Select placeholder="房间类型" style={{ width: '100%' }}>
                {this.props.allowGenders.map(gender => <Select.Option key={gender.key}>{gender.value}</Select.Option>)}
              </Select>)}</Form.Item>}
            <Form.Item label="楼层数" {...formItemLayout}>
                {getFieldDecorator('floors', {
                  rules: [
                    {
                      required: true,
                      message: '楼层数',
                    },
                  ],
                })(<Input disabled={this.state.isAddShow} placeholder="楼层数" />)}
              </Form.Item>
              <Form.Item label="宿舍管理员" {...formItemLayout}>
                {getFieldDecorator('gliyuan', {
                  rules: [
                    {
                      required: false,
                      message: '宿舍管理员',
                    },
                  ],
                })(<Input placeholder="宿舍管理员" />)}
              </Form.Item>
              <Form.Item label="自动生成房间" {...formItemLayout}>
                {getFieldDecorator('autoRoom  ', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input placeholder="自动生成" />)}
              </Form.Item>
          </Form>
        </Modal>
    
      </div>
          )
        }
      }
buildings = Form.create({})(buildings)
export default connect(state => {
            console.log('state.Build', state)
  return {
            allowGenders: state.list.allowGenders,
          loading: state.loading.models.buildings,
          data: state.buildings.buildings,
          campus: state.list.campus
    // pagination:{
            //   current:state.room.pagination.current,
            //   pageSize:state.room.pagination.pageSize,
            //   total:state.room.rooms.recordCount
            // }
          }
          })(buildings)
