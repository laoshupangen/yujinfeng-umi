import { Table, Button } from 'antd'
import {connect} from 'dva'
const campus = function ({campus,loading}) {
 
 
  const colums =
    [
     
      { title: '名称', dataIndex: 'name', key: 'name',align:'center'  }, { title: '学区编号', dataIndex: 'number', key: 'number',align:'center'  },
      { title: '连接', dataIndex: '', key: '',align:'center'}, 
      { title: '隶属系统', dataIndex: '', key: '',align:'center' },
      { title: '目标', dataIndex: '', key: '',align:'center' },
      { title: '菜单', dataIndex: '', key: '',align:'center' },
      { title: '展开', dataIndex: '', key: '',align:'center' },
      { title: '有效', dataIndex: '', key: '',align:'center' },
    ]

  
  
  return (
    <div>
      <Button type='primary'>新建</Button>
      <Table bordered loading={loading} columns={colums}  ></Table>
    </div>
  )
}

function mapStateToProps(state){
   console.log(state)
  
   return {
    
   }
}

export default connect(mapStateToProps)(campus)
