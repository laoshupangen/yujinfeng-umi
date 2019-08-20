import { Steps, Carousel, Button, Layout, Pagination, message } from 'antd'
import TableList from '@/components/TableList'
import { connect } from 'dva'

const { Step } = Steps

const { Footer, Content } = Layout



function checkIn(props) {
    let slider = null
    function onChange(c) {
        slider.innerSlider.slickGoTo(c)
        const { dispatch } = props

        dispatch({ type: 'checkIn/save', payload: { current: c } })
        if (c === 2) {
            dispatch({ type: 'checkIn/save', payload: { reserve: true } })
        }
        if (c === 0) {
            dispatch({ type: 'checkIn/save', payload: { reserve: false } })
        }

    }
    function nextStep() {
        const { current, dispatch } = props
        let tem = current + 1
        console.log('next', current)
        slider.innerSlider.slickGoTo(tem)
        dispatch({ type: 'checkIn/save', payload: { current: tem } })
        if (tem === 2) {

            dispatch({ type: 'checkIn/save', payload: { reserve: true } })
        }
    }
    function preStep() {
        const { current, dispatch } = props
        let tem = current - 1
        slider.innerSlider.slickGoTo(tem)
        dispatch({ type: 'checkIn/save', payload: tem })
        if (tem === 0) {
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
        data: [{
            id: '1', departid: '3993b053e01fa94699053797b9ee6dd2', departments: '航空制造工程学院',
            specialities: '飞行器制造工程系', gender: '男生', unused: '0', numbers: '156', qualifications: '本科', provenance: '国内'
        },
        {
            id: '2', departid: '3993b053e01fa94699053797b9ee6dd2', departments: '航空制造工程学院',
            specialities: '飞行器制造工程系', gender: '女生', unused: '0', numbers: '30', qualifications: '本科', provenance: '国内'
        },
        {
            id: '3', departid: '96b2cc8fc78e474d8fc1781c2075cb50', departments: '音乐学院',
            specialities: '美声', gender: '女生', unused: '200', numbers: '230', qualifications: '本科', provenance: '国内'
        },
        {
            id: '4', departid: '96b2cc8fc78e474d8fc1781c2075cb50', departments: '音乐学院',
            specialities: '美声', gender: '男生', unused: '100', numbers: '130', qualifications: '本科', provenance: '国内'
        },
        {
            id: '5', departid: '90d7603fca1f93429614229951a5a6df', departments: '艺术与设计学院',
            specialities: '艺术与设计', gender: '男生', unused: '320', numbers: '350', qualifications: '本科', provenance: '国内'
        },
        {
            id: '6', departid: '90d7603fca1f93429614229951a5a6df', departments: '艺术与设计学院',
            specialities: '艺术与设计', gender: '女生', unused: '140', numbers: '240', qualifications: '本科', provenance: '国内'
        },],
        action: '',
        pagination: props.pagination,
        loading: false,
        rowSelection: {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                let selectColloges = selectedRows.map(r=>({collegeId:r.departid,gender:r.allowGender}))
                 const {dispatch} = props
                 dispatch({type:'checkIn/save',payload:{selectColloges}})
            },

        },
        treeSelect: {
            placeholder: '选择院系或专业',
            treeData: [
                {
                    title: '航空制造工程学院',
                    value: '0-0',
                    key: '3993b053e01fa94699053797b9ee6dd2',
                    children: [
                        {
                            title: '飞行器制造工程系',
                            value: '0-0-1',
                            key: 'jdisia4699053797b9ee6dd2',
                        },

                    ],
                },
                {
                    title: '音乐学院',
                    value: '0-10-1',
                    key: '96b2cc8fc78e474d8fc1781c2075cb50',
                    children: [
                        {
                            title: '美声',
                            value: '0-0-2',
                            key: 'gdgggggb9ee6dd2',
                        },

                    ],
                },
                {
                    title: '艺术与设计学院',
                    value: '0-0-4',
                    key: '90d7603fca1f93429614229951a5a6df',
                    children: [
                        {
                            title: '艺术与设计',
                            value: '0-0-5',
                            key: '34455053797b9ee6dd2',
                        },

                    ],
                },
            ]

        },
        select: {
            placeholder: '选择性别',
            selectData: [{ key: '1', value: '男' }, { key: '2', value: '女' }],
            onSelect: function () {

            }

        },



    }
    const table2 = {
        columns: [{ title: '校区', dataIndex: 'campusName', key: 'campusName', align: 'center' },
        { title: '楼栋名称', dataIndex: 'title', key: 'title', align: 'center' },
        { title: '楼栋类型', dataIndex: 'allowGender', key: 'allowGender', render:(record,text)=>{
            return record === 'allowGenders.male'?'男生':(record === 'allowGenders.female'?'女生':'混合')
        },align: 'center' },
        { title: '空余床位', dataIndex: 'bedCount', key: 'bedCount',align: 'center',render:(record,text)=>{
            
            return text.bedCount - text.checkinCount
        } },
        // { title: '空余房间', dataIndex: 'roomCount', key: 'roomCount', align: 'center',render:(record,text)=>{
        //     return text.roomCount 
        // } },
        { title: '楼层数', dataIndex: 'floors', key: 'floors', align: 'center' },
        { title: '楼栋管理员', dataIndex: 'managment', key: 'managment', align: 'center' }],
        data: props.buildings,
        pagination: props.pagination,
        loading: false,
        rowSelection: {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                let selectRooms = selectedRows.map(r=>r.id)
                 const {dispatch} = props
                 dispatch({type:'checkIn/save',payload:{selectRooms}})
                 dispatch({type:'checkIn/getFloors',payload:{buildingId:selectRooms[0]}})
            },
        },
        select: {
            placeholder: '选择校区',
            selectData: [{ key: '1', value: '校区' }]
        }


    }
    const table3 = {
        columns: [{ title: '楼栋', dataIndex: 'buildingName', key: 'buildingName', align: 'center' },
        { title: '楼层', dataIndex: 'floorNumber', key: 'floorNumber', align: 'center' },
        // { title: '宿舍号', dataIndex: 'rooms', key: 'rooms', align: 'center',render:(record,text)=>{
        //     let roomNums = text.rooms.map(t=>t.roomName).join(',')
        //     return roomNums
        // } },
        { title: '空余床位', dataIndex: 'freeBedsCount', key: 'freeBedsCount', align: 'center' },
        { title: '总床位', dataIndex: 'bedCount', key: 'bedCount', align: 'center' },
        // { title: '房间类型', dataIndex: '', key: '', align: 'center' },
        // { title: '所在区域', dataIndex: '', key: '', align: 'center' }
       ],
        data:props.floors.map((f,index)=>({id:index,buildingName:f.buildingName,floorNumber:f.floorNumber,freeBedsCount:f.freeBedsCount,bedCount:f.bedCount})),
        pagination: props.pagination,
        loading: false,
        rowSelection: {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                const {dispatch} = props
                if(selectedRows.length>0){
                    dispatch({type:'checkIn/save',payload:{disabled:false,current:2}})

                }else{
                    dispatch({type:'checkIn/save',payload:{disabled:true,current:2}})
                }
            },

        },
        Cascader: {
            options: [
                {
                    value: '2344',
                    label: '1栋',
                    children: [
                        {
                            value: '23441',
                            label: '第一层',
                        },
                    ],
                },
                {
                    value: '2345',
                    label: '2栋',
                    children: [
                        {
                            value: '23451',
                            label: '第一层',
                        },
                    ],
                },
            ]
        }

    }
   
    function tableconfirm(){
        const {dispatch,selectColloges,selectRooms} = props
        if(selectColloges.length===0||selectRooms.length===0){
            message.info('请确认第一步或者第二部已完成')
            return
        }
        dispatch({type:'checkIn/distributeDorm',payload:{colleges:selectColloges,rooms:selectRooms}})
    }

    return (
        <Layout style={{ height: '100%' }}>
            <div style={{ margin: '5px -10px 0 ', padding: '0 20px 15px 20px', background: '#f0f2f5' }}>
                <Steps current={props.current} onChange={onChange}>
                    <Step description="选择院系或专业" />
                    <Step description="设置校区和楼栋" />
                    <Step description="设置所在楼栋或房间" />
                </Steps>

            </div>

            <Content style={{ background: '#fff' }}>
                <Carousel dots={false} ref={el => (slider = el)}>
                    <TableList table={table} search={true} btnFunctions={{ refreshBtn: true }}></TableList>
                    <TableList table={table2} search={true} btnFunctions={{ refreshBtn: true }}></TableList>
                    <TableList table={table3} search={true} 
                    btnFunctions={{refreshBtn: true,confirmBtn:{confirm:tableconfirm,disabled:props.disabled}}}></TableList>

                </Carousel>




            </Content>
            <Footer className='selfFlex selfFlexSpaceBetween'>
                {/* <Pagination defaultCurrent={1} total={3} pageSize={1} /> */}
                <div></div>
                {!props.reserve && <Button type="primary" onClick={nextStep}>下一步</Button>}
                {props.reserve && <Button type="primary" onClick={preStep}>上一步</Button>}
            </Footer>
        </Layout>
    )
}
export default connect((state) => {
    console.log('checkin', state)
    const { checkIn, loading } = state

    return {
        current: checkIn.current,
        loading: loading.models.checkIn,
        reserve: checkIn.reserve,
        buildings:checkIn.builds,
        floors:checkIn.floors,
        selectRooms:checkIn.selectRooms,
        selectColloges:checkIn.selectColloges,
        disabled:state.checkIn.disabled
    }
})(checkIn)