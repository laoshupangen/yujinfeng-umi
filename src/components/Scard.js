import Circle from '@/components/circle'
import { Tooltip } from 'antd'
function InfoPanel(props) {
    return (
        <div className="floatInfo">
            <div className="fli">
               <div>{props.data.title}</div>
               <div>共{props.data.bedCount}个床位,共{props.data.floors}层,入住{props.data.checkinCount}床位,空余{ Math.abs(props.data.bedCount-props.data.checkinCount)}床位</div>
            </div>
        </div>
    )
}
function Scard(props) {
    return (
        <Tooltip  placement="topLeft" title={InfoPanel(props)} >
            <div className="gridContentWrap">
                <Circle color={props.color} self="b"></Circle>
                <div style={{ fontSize: '12px', padding: '0' }}>{props.title}</div>
            </div>
        </Tooltip>
    )
}
export default Scard