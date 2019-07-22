import { Table, Button } from 'antd'
import {connect} from 'dva'
const campus = function ({campus,loading}) {
  console.log(campus)
  let dataSource = campus.campusdata.data?campus.campusdata.data.data.map(item=>{item.key=item.id;return item}):campus.campusdata
 
  const colums =
    [
      { title: '操作', key: 'action', render: (text, record) => (<span><a style={{ paddingRight: '1rem' }} href="javascript:">修改</a><a href="javascript:">删除</a></span>),align:'center' },
      { title: '学区名称', dataIndex: 'name', key: 'name',align:'center'  }, { title: '学区编号', dataIndex: 'number', key: 'number',align:'center'  },
      { title: '地址', dataIndex: 'address', key: 'address',align:'center'}, 
      { title: '宿舍楼栋数', dataIndex: 'buildingCount', key: 'building',align:'center' }]

  
  
  return (
    <div>
      <Button>增加</Button>
      <Table bordered loading={loading} columns={colums} dataSource={dataSource} ></Table>
    </div>
  )
}

function mapStateToProps(state){
   console.log(state)
   const {campus,loading} = state
   return {
     campus,
     loading:loading.models.campus
   }
}

// export default connect(mapStateToProps)(campus)
export default campus