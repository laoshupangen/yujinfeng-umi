import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, Tree, Layout, Divider, Select } from 'antd'
import { connect } from 'dva'
import { Component } from 'react';
const { TreeNode } = Tree;
const { Option } = Select
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class Room extends Component {
  state = {
    data: [],
    pagination: { current: 1 },
    loading: false,
    isAddShow: false,
    selectItem: '',
    ModalTitle: '新增房间'

  };
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

  }
  buildingsSelect = []
  floorSelect = []
  columns =
    [
      {
        title: '操作', key: 'id', render: (text, record) => (<div>
          <a style={{ paddingRight: '1rem' }} onClick={() => this.showModal(record)}>编辑</a>
          <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record)}>
            <a href="javascript:">删除</a></Popconfirm></div>), align: 'center'
      },
      { title: '房间编号', dataIndex: 'number', key: 'number', align: 'center', editable: true },
      { title: '床位数', dataIndex: 'bedCount', key: 'bedCount', align: 'center' },
      { title: '空余床位', dataIndex: 'freeBeds', key: 'freeBeds', align: 'center' },
      {
        title: '性别', dataIndex: 'allowGender', key: 'allowGender', align: 'center', render: (text) => {
          text = text === 'allowGender.male' ? '男生' : (text === 'allowGender.female' ? '女生' : '未定义')
          return text
        }
      },
      { title: '所在楼栋', dataIndex: 'buildingName', key: 'buildingName', align: 'center', sorter: true },
      { title: '所在楼层', dataIndex: 'floor', key: 'floor', align: 'center', sorter: true },
      { title: '寝室长', dataIndex: '', key: '', align: 'center', sorter: true },
      { title: '空调', dataIndex: '', key: '', align: 'center' },
      { title: '热水器', dataIndex: '', key: '', align: 'center', sorter: true },
      { title: '房间名称', dataIndex: 'title', key: 'title', align: 'center', editable: true, },



    ]
  componentWillMount() {



  }

  componentDidMount() {
    const { setFieldsValue } = this.props.form
    // setFieldsValue({ buildingId: '42a62371-9fbf-4b0c-a086-5b6ed0ed8036' })
  }
  handleSelect = () => {
    const { getFieldsValue } = this.props.form
    let tems = getFieldsValue(['campusId', 'buildingId'])
    console.log(tems)
    if (tems.campusId && !tems.buildingId) {
      this.buildingsSelect = this.props.buildings.filter(b => b.campusId === tems.campusId).map(b => { return { key: b.id, value: b.title } })
    }
    if (tems.campusId && tems.buildingId) {
      let floors = this.props.buildings.find(b => b.id === tems.buildingId), tem = []
      console.log(floors)
      for (let i = floors.floors; i > 0; i--) {
        tem.push({ key: i, value: i })
      }
      this.floorSelect = tem
    }

  }
  handleDelete = record => {
    const { dataSource, dispatch } = this.props;
    console.log(this.props)

    dispatch({ type: 'room/delete', payload: { id: record.id } })
    dispatch({ type: 'room/get', payload: { pageIndex: this.props.pagination.current, pageSize: 20 } })
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  handleFormChange = () => {
    const { validateFields, getFieldsValue } = this.props.form
    let dlist = getFieldsValue(['campusId', 'title'])
    console.log(dlist)
    validateFields(['campusId', 'title'], (error, values) => {
      console.log(values)
    })
  };
  generateFloorSelect = (floors) => {
    let tem = []
    for (let i = Number(floors); i > 0; i--) {
      tem.push({ key: i, value: i })
    }
    return tem
  }

  showModal = (record) => {
    const { getFieldsValue, setFieldsValue, resetFields } = this.props.form
    resetFields()
    this.setState({
      isAddShow: false,
      visible: true,
      ModalTitle: '新增房间',
    })

    if (record.id) {

      this.setState({
        isAddShow: true,
        ModalTitle: '修改房间信息',
        selectItem: record
      })
      // this.floorSelect
      // let tembid = record.buildingId
      // let temfloors = this.props.buildings.find(b => b.id === tembid).floors
      // this.floorSelect = this.generateFloorSelect(temfloors)


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
    const { getFieldsValue, validateFieldsAndScroll } = this.props.form
    let forms = getFieldsValue()
    if (!this.state.isAddShow) {
      // buildingId,number,floor,title,bedCount,allowGender
      dispatch({ type: 'room/add', payload: forms })
    } else {
      dispatch({ type: 'room/update', payload: forms })
    }
    dispatch({ type: 'room/get', payload: { pageIndex: this.props.pagination.current, pageSize: 20 } })
    this.setState({
      visible: false,
    });
  };
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props
    dispatch({ type: 'room/get', payload: { pageIndex: pagination.current, pageSize: this.props.pagination.pageSize } })
    dispatch({ type: 'room/paginationChange', payload: { current: pagination.current, pageSize: this.props.pagination.pageSize } })
  };
  render() {

    const { getFieldDecorator, validateFields } = this.props.form
    const buildIds = this.props.data.reduce((pre, cur, index) => {
      if (pre && pre.findIndex(p => cur.buildingId === p) === -1) {
        return [...pre, cur.buildingId]
      } else {
        return pre
      }
    }, [])

    const campus = this.props.campus.map(c => {
      return {
        key: c.id, title: c.name,
        children: this.props.buildings.filter(p => p.campusId === c.id).map(b => { return { key: b.id, title: b.title } })
      }
    })
    return (
      <Layout style={{ height: '100%' }}>
        <Layout.Sider width={140} theme='light'>
          <Tree treeData={campus} defaultCheckedKeys={buildIds} style={{ overflow: 'auto', height: '100%' }} checkable>

          </Tree>
        </Layout.Sider>
        <Divider type="vertical" />
        <Layout.Content className='ant-layout ant-layout-content' style={{ background: '#fff' }}>
          <div style={{ padding: '10px' }}>
            <div className="selfFlex selfFlexSpaceBetween">
              <div>
                <Button type="primary" style={{ marginRight: '10px' }} onClick={this.showModal}>增加</Button>
                <Button type="primary" style={{ marginRight: '10px' }}>导入</Button>
                <Button type="primary" >导出</Button>
              </div>
              <div>
                <div className="selfFlex">
                  <Select defaultValue="楼层" style={{ width: 120, marginRight: '10px' }} loading={false}>
                    <Option value="lucy">楼层</Option>
                  </Select>
                  <Input placeholder="输入关键字" style={{ width: '140px', marginRight: '10px' }} />
                  <Button type="primary" >查询</Button>
                </div>
              </div>

            </div>
          </div>
          {this.props.data && <Table
            columns={this.columns}
            rowKey={record => record.id}
            dataSource={this.props.data}
            pagination={this.props.pagination}
            loading={this.props.loading}
            onChange={this.handleTableChange}
            bordered
            rowSelection={this.rowSelection}
          />}
          <Modal
            title={this.state.ModalTitle}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            centered
          >
            <Form hideRequiredMark={this.state.isAddShow}>
              <Form.Item label="房间编号" {...formItemLayout}>
                {getFieldDecorator('number', {
                  rules: [
                    {
                      required: true,
                      message: '输入房间编号',
                    },
                  ],
                })(<Input disabled={this.state.isAddShow} placeholder="输入房间编号" />)}
              </Form.Item>
              <Form.Item label="房间名称" {...formItemLayout}>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: '房间名称',
                    },
                  ],
                })(<Input placeholder="输入房间名称" />)}
              </Form.Item>
              {this.state.isAddShow &&<Form.Item label="所在校区" {...formItemLayout}>
                {getFieldDecorator('campusName', {
                  rules: [
                    {
                      required: true,
                      message: '选择',
                    },
                  ],
                })( <Input disabled/>)}
                 
              </Form.Item>}
               {!this.state.isAddShow&&<Form.Item label="所在校区" {...formItemLayout}>
               {getFieldDecorator('campusId', {
                  rules: [
                    {
                      required: true,
                      message: '选择',
                    },
                  ],
                })((<Select placeholder="选择校区" onSelect={this.handleSelect} style={{ width: '100%' }}>
                    {this.props.campus.map(d => (
                      <Option key={d.id}>{d.name}</Option>
                    ))}
                    </Select>))}
                  </Form.Item>
                }
                {this.state.isAddShow &&<Form.Item label="所在校区" {...formItemLayout}>
                {getFieldDecorator('buildingName', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })( <Input disabled/>)}
                 
              </Form.Item>}
              {!this.state.isAddShow&&<Form.Item label="所在楼栋" {...formItemLayout}>
                {getFieldDecorator('buildingId', {
                  rules: [
                    {
                      required: true,
                      message: '选择所在楼栋',
                    },
                  ],
                })((<Select placeholder="选择楼栋" onSelect={this.handleSelect} style={{ width: '100%' }}>
                  {this.buildingsSelect.map(d => (
                    <Option key={d.key}>{d.value}</Option>
                  ))}
                </Select>))}
              </Form.Item>}
              <Form.Item label="所在楼层" {...formItemLayout}>
                {getFieldDecorator('floor', {
                  rules: [
                    {
                      required: true,
                      message: '所在楼层',
                    },
                  ],
                })(<Select placeholder="选择楼层" style={{ width: '100%' }}>
                  {this.floorSelect.map(d => (
                    <Option key={d.key}>{d.value}</Option>
                  ))}
                </Select>)}
              </Form.Item>
              <Form.Item label="床位数" {...formItemLayout}>
                {getFieldDecorator('bedCount', {
                  rules: [
                    {
                      required: true,

                      message: '输入床位数',
                    },
                  ],
                })(<Input placeholder="输入床位数" />)}
              </Form.Item>
              <Form.Item label="房间类型" {...formItemLayout}>
                {getFieldDecorator('allowGender', {
                  rules: [
                    {
                      required: true,
                      message: '选择房间类型',
                    },
                  ],
                })(<Select placeholder="房间类型" style={{ width: '100%' }}>
                  {this.props.allowGenders.map(gender => <Option key={gender.key}>{gender.value}</Option>)}
                </Select>)}
              </Form.Item>
              <Form.Item label="寝室长" {...formItemLayout}>
                {getFieldDecorator('qinshizhang', {
                  rules: [
                    {
                      required: false,

                    },
                  ],
                })(<Input placeholder="输入寝室长" />)}
              </Form.Item>
              <Form.Item label="空调" {...formItemLayout}>
                {getFieldDecorator('kongtiao', {
                  rules: [
                    {
                      required: true,
                      message: '选择是与否',
                    },
                  ],
                })(<Select placeholder="是" style={{ width: '100%' }}>
                  {this.props.has.map(gender => <Option key={gender.key}>{gender.value}</Option>)}
                </Select>)}
              </Form.Item>
              <Form.Item label="热水器" {...formItemLayout}>
                {getFieldDecorator('reshuiqi', {
                  rules: [
                    {
                      required: true,
                      message: '选择是与否',
                    },
                  ],
                })(<Select placeholder="是" style={{ width: '100%' }}>
                  {this.props.has.map(gender => <Option key={gender.key}>{gender.value}</Option>)}
                </Select>)}
              </Form.Item>
            </Form>
          </Modal>

        </Layout.Content>

      </Layout>

    )
  }
}
Room = Form.create({})(Room)
export default connect(state => {
  console.log('state.Room', state)
  return {
    campus: state.list.campus,
    allowGenders: state.list.allowGenders,
    has: [{ key: 'true', value: '是' }, { key: 'false', value: '否' }],
    buildings: state.list.buildings,
    loading: state.loading.models.room,
    data: state.room.rooms,
    pagination: {
      current: state.room.pagination.current,
      pageSize: state.room.pagination.pageSize,
      total: state.room.pagination.total
    }
  }
})(Room)
