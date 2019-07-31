import {connect} from 'dva';
import {Table} from 'antd'
function Users(props){

    // const listItems = list.data.rows.map(item=><div key={item.id}>{item.name}</div>)
    
    const columns = [
        {
            title: '账户',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="">{text}</a>,
            align:'center'
          },
          {
            title: '姓名',
            dataIndex: 'email',
            key: 'email',
            align:'center'
          },
          {
            title: '岗位',
            dataIndex: '',
            key: '',
            align:'center'
          },
          {
            title: '隶属机构',
            dataIndex: '',
            key: '',
            align:'center'
          },
          {
            title: '手机号码',
            dataIndex: '',
            key: 'phoneNumber',
            align:'center'
          },
    ]
    return (
       <div>
           <Table loading={false}  columns={columns} bordered>

           </Table>
       </div>
    )
}

function mapStateToProps(state){
   
    
    return {
        
    }
}

export default connect(mapStateToProps)(Users)
