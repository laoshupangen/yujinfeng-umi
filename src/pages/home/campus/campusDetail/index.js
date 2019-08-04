import Scard from '@/components/Scard.js'
import Line from '@/components/Line.js'
import { Card ,Icon} from 'antd'
const { Grid } = Card
import router from 'umi/router'
import { connect } from 'dva'

function CampusDetail(props) {
    console.log(props)

    const gridStyle = {
        width: '90px',
        height: '90px',
        textAlign: 'center',
        padding: '24px 0'
        // boxShadow:'none'
    };
    const headStyle = {
      padding:'0',
      textAlign:'center',
      minHeight:'30px'
    }
    
    const title = 'XX楼栋'
    const handleForward = () => {
        router.push('/home/campus/campusDetail/singleRoom')
    }
    const handleBack = () => {
        router.push('/home/campus')
    }
    // let cam = props.location.state
    let cam = '45314097-3d9d-41c9-899d-4cf1ba829d03'
    const male = props.data.length === 0 ? [] : props.data.filter(pd => pd.allowGender.indexOf('allowGenders.male') !== -1)
    const female = props.data.filter(pd => pd.allowGender.indexOf('allowGenders.female') !== -1)
    console.log(cam, male, female)


    return (
        <>
            <div style={{ background: '#f0f2f5', padding: '0 10px 5px 10px' }}><a onClick={handleBack}><Icon type="arrow-left" />返回上一页</a></div>
            <Card title="前湖校区" extra={<a onClick={()=>window.location.reload()} style={{ padding: '0', }}><Icon type="reload"/></a>} bodyStyle={{padding:'10px 24px'}} headStyle={{minHeight:'0',padding:'0 16px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card bordered={false} title="男宿舍楼" headStyle={headStyle} style={{ width: '450px' }}>
                        {male.map(ma =>
                            (
                                <Grid key={ma.id} style={gridStyle} onClick={handleForward}>
                                    <Scard title={ma.title}></Scard>
                                </Grid>
                            )

                        )}

                    </Card>
                    
                    <Card bordered={false} title="女宿舍楼" headStyle={headStyle} style={{ width: '450px' }}>
                        
                        {female.map(ma => (<Grid key={ma.id} style={gridStyle} onClick={handleForward}>
                                <Scard title={ma.title}></Scard>
                            </Grid>
                        ))}
                    </Card>

                </div>


            </Card>
            <hr style={{height:'15px',background:'#f0f2f5',border:'none'}}></hr>
            <Card title="前湖校区" extra={<a style={{ padding: '0', }}><Icon type="reload"/></a>} headStyle={{minHeight:'0',padding:'0 16px'}}>
                <Line data={props.data}></Line>
            </Card>

        </>

    )

}
export default connect(state => {
    return {
        data: state.campus.buildings
    }
})(CampusDetail)