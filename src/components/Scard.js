
import { Avatar } from 'antd'

function Scard(props) {
    return (
        <div>
            <Avatar type="user" />
            <p style={{fontSize:'8px'}}>{props.title}</p>
        </div>
    )
}
export default Scard