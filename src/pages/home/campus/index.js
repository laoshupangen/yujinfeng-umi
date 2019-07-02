import { Table, Button } from 'antd'
import {getCampusPage} from './service'
const campus = function (props) {
  const colums =
    [
      { title: '操作', key: 'action', render: (text, record) => (<span><a style={{ paddingRight: '1rem' }} href="javascript:">修改</a><a href="javascript:">删除</a></span>),align:'center' },
      { title: '学区名称', dataIndex: 'name', key: 'name',align:'center'  }, { title: '学区编号', dataIndex: 'number', key: 'number',align:'center'  },
      { title: '地址', dataIndex: 'address', key: 'address',align:'center'}, 
      { title: '宿舍楼栋数', dataIndex: 'buildingCount', key: 'building',align:'center' }]

  var data = [],loading = true
  
 
  console.log(data)
  return (
    <div>
      <Button>增加</Button>
      <Table bordered loading={loading} columns={colums} dataSource={data} ></Table>
    </div>
  )
}

export default campus
