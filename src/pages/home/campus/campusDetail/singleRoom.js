import Room from '@/components/Room.js'
import Bar from '@/components/Bar.js'
import { Card ,Icon} from 'antd'
import router from 'umi/router'
import {connect} from 'dva'
function singleRoom(props) {
    
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
    
    const handleBack = ()=>{
        router.goBack()
    }
    const title = ` ${props.data.campusName}-${props.data.title}共计${props.data.checkinCount}个床位`
    return (
        <div>
            <div style={{background:'#f0f2f5',padding:'0 10px 5px 10px'}}><a onClick={handleBack}><Icon type="arrow-left" />返回至上一页</a></div>
            <Card title={title} extra={<a style={{padding:'0',}}><Icon type="reload"/></a>} headStyle={{minHeight:'0',padding:'0 16px'}}>
              <Bar></Bar>       
            </Card>
            <Card title={title} extra={<a style={{padding:'0'}}><Icon type="reload"/></a>} headStyle={{minHeight:'0',padding:'0 16px'}}>
              <div className="selfFlex" style={{padding:'10px 20px 5%',margin:'auto'}}>
                  <Room current='3' total='4' roomNumber ='101' roomMember={{memberName:'张xx',class:'航天航空 1010班'}}></Room>
                  
                 
              </div>
            </Card>
            

        </div>

    )

}
export default connect(state=>{
    //state.campus.build
    
    const data = [{id: "1FEC3387E5674792927BB32AFFC9015C",
     number: "10", title: "10", floors: 6,bedCount:4,checkinCount:786,
     campusName:'南航同步数据'}]
    return{
    data:data,
    campus:state.list.campus
}})(singleRoom)