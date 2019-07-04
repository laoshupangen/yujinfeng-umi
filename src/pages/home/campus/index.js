import { Table, Button } from 'antd'
import { connect } from 'dva'

export default connect(state => {

  console.table(state)
  const { campus, loading } = state
  return { campus, loading: loading.models.campus }

})(function ({ campus, loading }) {
  let dataSource = campus.campusdata.data
    ? campus.campusdata.data.data.map(item => { item.key = item.id; return item })
    : campus.campusdata
  const colums =
    [
      { title: '操作', key: 'action', render: (text, record) => (<span><a style={{ paddingRight: '1rem' }} href="javascript:">修改</a><a href="javascript:">删除</a></span>), align: 'center' },
      { title: '校区Id', dataIndex: 'id', key: 'id', align: 'center' },
      { title: '校区名称', dataIndex: 'name', key: 'name', align: 'center' },
      { title: '校区编号', dataIndex: 'number', key: 'number', align: 'center' },
      { title: '地址', dataIndex: 'address', key: 'address', align: 'center' },
      { title: '楼栋总数', dataIndex: 'buildingCount', key: 'building', align: 'center' },
      { title: '房间总数', dataIndex: 'roomCount', key: 'roomCount', align: 'center' }
    ]

  return (
    <div>
      <Button>增加</Button>
      <Table bordered loading={loading} columns={colums} dataSource={dataSource} ></Table>
    </div>
  )
})
