import {connect} from 'dva';
import {Table} from 'antd'
function Users({list,loading}){
    const listItems = list.map(item=><div key={item.id}>{item.name}</div>)
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
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
          },
          {
            title: 'Operation',
            key: 'operation',
            dataIndex:'id'
          },
    ]
    return (
       <div>
           <Table loading={loading} dataSource={list} columns={columns}>

           </Table>
       </div>
    )
}

function mapStateToProps(state){
    console.log(state.loading)
    const {list} = state.users
    return {
        list,
        loading:state.loading.models.users
    }
}

export default connect(mapStateToProps)(Users)
// export default Users;