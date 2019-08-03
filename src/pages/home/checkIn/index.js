import { Steps, Carousel, Button, Layout, Pagination } from 'antd'
import TableList from '@/components/TableList'
import { connect } from 'dva'

const { Step } = Steps

const { Footer, Content } = Layout



function checkIn(props) {
    let slider = null
    function onChange(c) {

        console.dir(c)
        slider.innerSlider.slickGoTo(c)
        const { dispatch } = props

        dispatch({ type: 'checkIn/save', payload: c })
        if(c===2){

            dispatch({ type: 'checkIn/reserve', payload: true})
        }
        if(c===0){
            dispatch({ type: 'checkIn/reserve', payload:false })
        }

    }
    function nextStep() {
        const { current, dispatch } = props
        let tem = current + 1
        console.log('next',current)
        slider.innerSlider.slickGoTo(tem)
        dispatch({ type: 'checkIn/save', payload: tem })
        if(tem===2){

            dispatch({ type: 'checkIn/reserve', payload: true })
        }
    }
    function preStep() {
        const { current, dispatch } = props
        let tem = current - 1
        slider.innerSlider.slickGoTo(tem)
        dispatch({ type: 'checkIn/save', payload: tem })
        if(tem===0){
            dispatch({ type: 'checkIn/reserve', payload: false })
        }
    }
    const table = {
        columns: [
        
        { title: '院系', dataIndex: 'departments', key: 'departments', align: 'center' },
        { title: '专业', dataIndex: 'specialities', key: 'specialities', align: 'center' },
        { title: '性别', dataIndex: 'gender', key: 'gender', align: 'center' },
        { title: '未分配数', dataIndex: 'unused', key: 'unused', align: 'center' },
        { title: '人数', dataIndex: 'numbers', key: 'numbers', align: 'center' },
        { title: '学历', dataIndex: 'qualifications', key: 'qualifications', align: 'center' },
        { title: '来源地', dataIndex: 'provenance', key: 'provenance', align: 'center' }],
        action:'',
        pagination: props.pagination,
        loading: false,
        rowSelection: {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              },

        }

    }
    const table2 = {
        columns: [{ title: '院系1', dataIndex: 'buildingName', key: 'buildingName', align: 'center' },
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
    const table3 = {
        columns: [{ title: '院系3', dataIndex: 'buildingName', key: 'buildingName', align: 'center' },
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
        <Layout style={{ height: '100%' }}>
            <div style={{ margin: '5px -10px 0 ', paddingBottom: '15px', background: '#f0f2f5' }}>
                <Steps current={props.current} onChange={onChange}>
                    <Step description="选择院系或专业" />
                    <Step description="设置校区和楼栋" />
                    <Step description="设置所在楼栋或房间" />
                </Steps>

            </div>

            <Content style={{ background: '#fff' }}>
                <Carousel dots={false} ref={el => (slider = el)}>
                    <TableList table={table} search={true} btnFunctions={{refreshBtn:true}}></TableList>
                    <TableList table={table2} search={true} btnFunctions={{refreshBtn:true}}></TableList>
                    <TableList table={table3} search={true} btnFunctions={{refreshBtn:true,confirmBtn:true}}></TableList>

                </Carousel>

               


            </Content>
            <Footer className='selfFlex selfFlexSpaceBetween'>
                <Pagination defaultCurrent={1} total={3} pageSize={1} />
               {console.log(props.reserve)}
                {!props.reserve&&<Button type="primary" onClick={nextStep}>下一步</Button>}
                {props.reserve&&<Button type="primary" onClick={preStep}>上一步</Button>}
            </Footer>
        </Layout>
    )
}
export default connect((state) => {
    const { checkIn, loading } = state
    
    return {
        current: checkIn.current,
        loading: loading.models.checkIn,
        reserve:checkIn.reserve
    }
})(checkIn)