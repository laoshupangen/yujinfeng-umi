import { Progress, Tooltip } from 'antd'

function InfoPanel(props) {
    console.log('iii',props)
    return (
        <div className="floatInfo">
            <div className="fli">
                <div className="selfFlex">
                    <div className="selfImg"></div>
                    <div>
                        <div>{props.roomMember.memberName}</div>
                        <div>{props.roomMember.class}</div>   
                    </div>
                </div>
            </div>
        </div>
    )
}
function Room(props) {
    return (
        <div className="selfcontainer selfFlex">
            <div className="selfcard gray">
                <Progress type="circle" percent={Math.floor(props.current*100/props.total)} format={(percent) =>percent===100?'满员':'未满' } width={60}></Progress>
            </div>
            <Tooltip placement="bottomLeft" title={InfoPanel(props)} arrowPointAtCenter >
                <div className="selfcard roomInfo self-font-9" >
                    <div>房间:{props.roomNumber}</div>
                    <div>入住:{props.current}/{props.total}</div>
                </div>

            </Tooltip>

        </div>
    )
}
export default Room