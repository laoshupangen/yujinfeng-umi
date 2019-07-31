import { Table, Button ,Input} from 'antd'
import {connect} from 'dva'
const campus = function (props) {
  
 
  const colums =
    [
      { title: '角色名称', key: '', align:'center' },
      { title: '角色编码', dataIndex: '', key: '',align:'center'  }, 
      { title: '排序', dataIndex: '', key: '',align:'center'  },
       
    ]

  
  
  return (
    <div>
      <div style={{padding:'10px'}}>
         <Button type="primary">新建角色</Button>
         <Input.Search style={{width:'200px',marginLeft:'20px'}} placeholder="角色名称/角色编码"/>
      </div>
      <div style={{padding:'0 0 10px 10px'}}>
         
      </div>
      <Table bordered loading={false} columns={colums}  ></Table>
    </div>
  )
}

function mapStateToProps(state){
   
   return {
     
   }
}

export default connect(mapStateToProps)(campus)
