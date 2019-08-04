import Room from '@/components/Room.js'
import Bar from '@/components/Bar.js'
import { Card ,Icon} from 'antd'
import router from 'umi/router'
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
    const title = 'XX楼栋'
    const handleBack = ()=>{
        router.push('/home/campus/campusDetail')
    }
    return (
        <div>
            <div style={{background:'#f0f2f5',padding:'0 10px 5px 10px',marginTop:'-10px'}}><a onClick={handleBack}><Icon type="arrow-left" />返回至上一页</a></div>
            <Card title="前湖校区" extra={<a style={{padding:'0',}}><Icon type="reload"/></a>} headStyle={{minHeight:'0',padding:'0 16px'}}>
              <Bar></Bar>       
            </Card>
            <Card title="前湖校区" extra={<a style={{padding:'0'}}><Icon type="reload"/></a>} headStyle={{minHeight:'0',padding:'0 16px'}}>
              <div className="selfFlex" style={{padding:'10px 20px 5%',margin:'auto'}}>
                  <Room current='3' total='4' roomNumber ='101' roomMember={{memberName:'张xx',class:'航天航空 1010班'}}></Room>
                  <Room current='4' total='4' roomNumber ='102' roomMember={{memberName:'张xx',class:'航天航空 1030班'}}></Room>
                 
              </div>
            </Card>
            

        </div>

    )

}
export default singleRoom