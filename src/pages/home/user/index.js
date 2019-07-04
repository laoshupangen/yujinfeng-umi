import {connect} from 'dva';
import {Table} from 'antd'
function Users({campus,loading}){

    // const listItems = list.data.rows.map(item=><div key={item.id}>{item.name}</div>)
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="">{text}</a>,
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'UserType',
            dataIndex: 'userType',
            key: 'userType',
          },
    ]
    return (
       <div>
           <Table loading={loading} dataSource={campus} columns={columns}>

           </Table>
       </div>
    )
}

function mapStateToProps(state){
    // console.log(state)
    // const campus= state.users.campus.data.rows
    const campus = ''
    return {
        campus,
        loading:state.loading.models.users
    }
}

export default connect(mapStateToProps)(Users)
