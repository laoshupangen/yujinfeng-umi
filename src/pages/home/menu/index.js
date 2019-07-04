import { Table, Button } from 'antd'
import { connect } from 'dva'
const campus = function ({ campus, loading }) {
  let dataSource = campus.campusdata.data ? campus.campusdata.data.data.map(item => { item.key = item.id; return item }) : campus.campusdata
  const colums =
    [
      { title: '操作', key: 'action', render: (text, record) => (<span><a style={{ paddingRight: '1rem' }} href="javascript:">修改</a><a href="javascript:">删除</a></span>), align: 'center' },
      { title: '菜单名称', dataIndex: 'name', key: 'name', align: 'center' },
      { title: '排序', dataIndex: 'sort', key: 'sort', align: 'center' }
    ]
  return (
    <div>
      <Button>增加</Button>
      <Table bordered loading={loading} columns={colums} dataSource={dataSource} ></Table>
    </div>
  )
}

function mapStateToProps(state) {
  console.log(state)
  const { campus, loading } = state
  return {
    campus,
    loading: loading.models.campus
  }
}

export default connect(mapStateToProps)(campus)
