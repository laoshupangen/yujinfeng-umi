import { Progress, Tooltip } from 'antd'

function InfoPanel(props) {
    
    return (
        <div className="floatInfo">
            <div className="fli">
                {
                    props.map(p => (
                        <div key={p.userId} className="selfFlex">
                            <div className="selfImg">
                                {p.avatar && <img src={p.avatar} style={{ width: '100%', height: '100%', display: 'block' }} />}
                            </div>
                            <div>
                                <div>{p.name}</div>
                                <div>{p.campusName+p.className}</div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
function Room(props) {
    return (
        <div className="selfcontainer selfFlex">
            <div className="selfcard gray">
                <Progress type="circle"  percent={Math.floor(props.current * 100 / props.total)} format={(percent) => percent === 100 ? '满员' : '未满'} width={40}></Progress>
            </div>
            <Tooltip placement="bottomLeft" title={props.members && InfoPanel(props.members)} arrowPointAtCenter >
                <div className="selfcard roomInfo self-font-9" >
                    <div>房间:{props.roomNumber}</div>
                    <div>入住:{props.current}/{props.total}</div>
                </div>

            </Tooltip>

        </div>
    )
}
export default Room