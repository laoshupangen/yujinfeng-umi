import { Steps, Affix, Button,Layout ,Pagination } from 'antd'
import TableList from '@/components/TableList'
import { connect } from 'dva'
const { Step } = Steps
const {Footer,Content} = Layout



function checkIn(props) {
    function onChange(c) {
        console.dir(props)
        console.log(c)
        const { dispatch } = props
        dispatch({ type: 'checkIn/save', payload: c })

    }
    function nextStep(){
        const {current,dispatch} = props
        let tem = current===3?0:current+1
        dispatch({ type: 'checkIn/save', payload: tem })
    }
    const table = {
        columns: [{ title: '院系', dataIndex: 'buildingName', key: 'buildingName', align: 'center' },
        { title: '专业', dataIndex: '', key: '', align: 'center' },
        { title: '性别', dataIndex: '', key: '', align: 'center' },
        { title: '未分配数', dataIndex: '', key: '', align: 'center' },
        { title: '人数', dataIndex: '', key: '', align: 'center' },
        { title: '学历', dataIndex: '', key: '', align: 'center' },
        { title: '来源地', dataIndex: '', key: '', align: 'center' }],
        data: [],
        pagination: props.pagination,
        loading: false,
        rowSelection: {

        }

    }


    return (
        <Layout style={{height:'100%'}}>
            <div style={{ margin: '5px -10px 0 ', paddingBottom: '15px', background: '#f0f2f5' }}>
                <Steps current={props.current} onChange={onChange}>
                    <Step description="选择院系或专业" />
                    <Step description="设置校区和楼栋" />
                    <Step description="设置所在楼栋或房间" />
                </Steps>

            </div>

            <Content style={{background:'#fff'}}>

                <TableList table={table} ></TableList>
                {/* <TableList table={table} ></TableList>
                    <TableList table={table} ></TableList> */}


            </Content>
            <Footer className='selfFlex selfFlexSpaceBetween'>
                <Pagination defaultCurrent={1} total={3} pageSize={1}/>  
                <Button type="primary" onClick={nextStep}>下一步</Button>
            </Footer>
        </Layout>
    )
}
export default connect((state) => {
    const { checkIn, loading } = state
    console.log(checkIn)
    return {
        current: checkIn.current,
        loading: loading.models.checkIn
    }
})(checkIn)