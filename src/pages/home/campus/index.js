import { Table, Button } from 'antd'
export default function (props) {
  const colums =
    [
      { title: '操作', key: 'action', render: (text, record) => (<span><a style={{ paddingRight: '1rem' }} href="javascript:">修改</a><a href="javascript:">删除</a></span>) },
      { title: '学区名称', dataIndex: 'name', key: 'name' }, { title: '学区编号', dataIndex: 'number', key: 'number' },
      { title: '地址', dataIndex: 'address', key: 'address' }, { title: '宿舍楼栋数', dataIndex: 'buildingCount', key: 'building' }]

  const data = [
    {
      "id": "21b51421-e39a-4a09-a689-8ce6e5ba8bf9",
      "name": "东区1",
      "number": "C-0011",
      "address": "东区地址",
      "buildingCount": 1,
      "roomCount": 60
    }
  ]

  return (
    <div>
      <Button>增加</Button>
      <Table bordered columns={colums} dataSource={data} style={{ textAlign: 'center' }}></Table>
    </div>
  )
}
