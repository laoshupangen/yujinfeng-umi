import {connect} from 'dva';
import {Table} from 'antd'
function Users({list,loading}){

    // const listItems = list.data.rows.map(item=><div key={item.id}>{item.name}</div>)
    console.log(list)
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
           <Table loading={loading} dataSource={list.data.rows} columns={columns}>

           </Table>
       </div>
    )
}

function mapStateToProps(state){
    const {list} = state.users
    return {
        list,
        loading:state.loading.models.users
    }
}

export default connect(mapStateToProps)(Users)
