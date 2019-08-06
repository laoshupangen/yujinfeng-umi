import Room from '@/components/Room.js'
import Bar from '@/components/Bar.js'
import { Card, Icon, Dropdown, Menu, Empty, Carousel, Input, message } from 'antd'
import router from 'umi/router'
import { connect } from 'dva'
function singleRoom(props) {
    let slider = null
    const buidIds = JSON.parse(sessionStorage.getItem('buildIds'))
    const bb = buidIds.find(b=>b.key===props.location.query.id)
    
    function inputChange(e) {
        e.persist()
        const { dispatch } = props

        dispatch({ type: 'campus/save', payload: { curStep: e.target.value } })


        //    slider.innerSlider.slickGoTo(Number(props.step))

    }
    function inputEnter(e) {
        e.persist()
        if(!Number(e.target.value)){
            message.info('请输入数字')
            return
        }
        slider.innerSlider.slickGoTo(Number(e.target.value))


    }

    function preStep() {
        const { dispatch, step } = props
        let s = step - 1
        if (s === 0) {
            return
        }
        dispatch({ type: 'campus/save', payload: { curStep: s } })

        slider.innerSlider.slickGoTo(s)
    }
    function nextStep() {
        const { dispatch, step } = props
        let s = Number(step) + 1
        dispatch({ type: 'campus/save', payload: { curStep: s } })
        slider.innerSlider.slickGoTo(s)
    }
    
    function change(item) {
        const {dispatch} = props
        const cc = buidIds.find(b=>b.key===item.key)
        const  title =  `${props.location.query.cname}-${cc.value}(共计${cc.freeBeds}个空余床位)`
        dispatch({type:'campus/save',payload:{title}})
        dispatch({type:'campus/getBuild',payload:{buildingId:item.key}})

    }
    const gridStyle = {
        width: '90px',
        height: '90px',
        textAlign: 'center',
        padding: '24px 0'
        // boxShadow:'none'
    };
    const headStyle = {
        textAlign: 'center'
    }

    const handleBack = () => {
        router.goBack()
    }

   
    
    

    const testdata = [{}]
    // const floor = props.data[0].rooms
    return (
        <div>
            <div style={{ background: '#f0f2f5', padding: '0 10px 5px 10px' }}><a onClick={handleBack}><Icon type="arrow-left" />返回至上一页</a></div>
            <Card loading={props.loading} title={props.title} extra={<div style={{ padding: '0 5px' }}>
                <Dropdown overlay={<Menu onClick={change} style={{ height: '200px', overflow: 'auto' }}>
                    {
                        buidIds && buidIds.map(b => (
                            <Menu.Item key={b.key}><a>{b.value}</a></Menu.Item>
                        ))
                    }

                </Menu>} trigger={['click']}><a><Icon type="menu-unfold" /><Icon type="down" /></a></Dropdown>
                <a style={{ padding: '0' }}><Icon type="reload" /></a></div>} headStyle={{ minHeight: '0', padding: '0 16px' }}>
                {props.data && props.data.length !== 0 && <Bar data={props.data}></Bar>}
                {!props.data || props.data.length === 0 && <Empty></Empty>}
            </Card>
            <Card loading={props.loading} title={<span><a disabled={props.step === 1}><Icon type="arrow-left" onClick={preStep}></Icon></a><Input onChange={inputChange} onPressEnter={inputEnter} size="small" value={props.step} style={{ width: '30px', textAlign: 'center', cursor: 'pointer' }}></Input><a disabled={ props.step === props.data.length}><Icon type="arrow-right" onClick={nextStep}></Icon></a></span>} extra={<a style={{ padding: '0', }}><Icon type="reload" /></a>} headStyle={{ minHeight: '0', padding: '0 16px' }}>
                <Carousel ref={el => (slider = el)}>
                    {/* {
                            props.data && props.data[0] && props.data[0].rooms.map(r => (
                                <Room key={r.roomId} members={r.members} current={r.checkinCount} total={r.bedsCount} roomNumber={r.roomName}></Room>
                            ))
                        }
                        {
                            !props.data && <Empty></Empty>
                        } */}
                    {
                        props.data && props.data.map(d => d = d.rooms).map((r, index) => (
                            // console.log(r)
                            <div key={index} className="selfFlex" style={{ padding: '10px 20px 5%', margin: 'auto' }}>
                            {r.map(((ir,index) => (
                                    <Room key={ir.roomId} members={ir.members} current={ir.checkinCount} total={ir.bedsCount} roomNumber={ir.roomName}></Room>
                            )))}
                            </div>
                        ))
                    }
                    {/* {
                        ['a','b'].map((s,index)=>(
                            <div key={index}>{s}</div>

                        ))
                    } */}


                </Carousel>

            </Card>


        </div>

    )

}
export default connect(state => {
    //state.campus.build
    console.log('single', state)
    

    return {
        data: state.campus.build,
        step: state.campus.curStep,
        title:state.campus.title,
        campus: state.list.campus,
        loading: state.loading.models.campus
    }
})(singleRoom)