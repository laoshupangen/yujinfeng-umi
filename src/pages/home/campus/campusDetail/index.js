import Scard from '@/components/Scard.js'
import Line from '@/components/Line.js'
import { Card ,Icon,Empty } from 'antd'
const { Grid } = Card
import router from 'umi/router'
import { connect } from 'dva'

function CampusDetail(props) {
    // console.log(props)

    const gridStyle = {
        width: '90px',
        height: '90px',
        textAlign: 'center',
        padding: '0',
        paddingTop:'5px'
        // boxShadow:'none'
    };
    const headStyle = {
      padding:'0',
      textAlign:'center',
      minHeight:'30px',
      borderBottom:'none'
    }
    
    
    const title = 'XX楼栋'
    const handleForward = (id) => {
        // router.push('/home/campus/campusDetail/singleRoom')
        // router.push(`/home/campus/campusDetail/singleRoom?id=${lou.id}`)
        router.push({pathname:'/home/campus/campusDetail/singleRoom',state:{id}})
    }
    const handleBack = () => {
        // router.push('/home/campus')
        router.goBack()
    }
    // let cam = props.location.state
    let cam = props.location.query.cid
    const male = props.data.length === 0 ? [] : props.data.filter(pd =>pd.allowGender&&pd.allowGender.indexOf('allowGenders.male') !== -1)
    // const female = props.data.filter(pd => pd.allowGender && pd.allowGender.indexOf('allowGenders.female') !== -1)
    const female = props.data
    const bodyStylem = male.length!==0?{}:{border:'1px solid #eee'}
    const bodyStylef = female.length!==0?{}:{border:'1px solid #eee'}
    const colors = ['#F6CD2D','#4EC4E5','#FA6249','#5AD3A7']

 //黄 #F6CD2D  蓝色 #5D55D6 灰色 #5AD3A7 橘红 #FA6249 浅蓝 #4EC4E5

    return (
        <>
            
            <div style={{ background: '#f0f2f5', padding: '0 10px 5px 10px' }}><a onClick={handleBack}><Icon type="arrow-left" />返回上一页</a></div>
            <Card title={props.location.query.cname} extra={<a onClick={()=>window.location.reload()} style={{ padding: '0', }}><Icon type="reload"/></a>} bodyStyle={{padding:'10px 24px'}} headStyle={{minHeight:'0',padding:'0 16px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card loading={props.loading} bordered={false} bodyStyle={bodyStylem} title="男宿舍楼" headStyle={headStyle} style={{ width: '450px' }}>
                        {male.length!==0&& male.map((ma,index) =>
                            (
                                <Grid key={ma.id} style={gridStyle} onClick={()=> handleForward(ma.id)}>
                                    <Scard title={ma.title} data={ma} color={colors[index]}></Scard>
                                </Grid>
                            )
                        )}
                        {
                            male.length === 0 && <Empty></Empty>
                        }
                        


                    </Card>
                    
                    <Card bordered={false} loading={props.loading} title="女宿舍楼" bodyStyle={bodyStylef} headStyle={headStyle} style={{ width: '450px' }}>
                        
                        {female.length!==0&&female.map((ma,index)=> (<Grid key={ma.id} style={gridStyle} onClick={()=>handleForward(ma.id)}>
                                <Scard title={ma.title} data={ma} color={colors[index%4]}></Scard>
                            </Grid>
                        ))}
                        {
                            female.length===0&& <Empty></Empty>
                        }
                    </Card>

                </div>


            </Card>
            <hr style={{height:'15px',background:'#f0f2f5',border:'none'}}></hr>
            <Card title={props.location.query.cname} extra={<a style={{ padding: '0', }}><Icon type="reload"/></a>} headStyle={{minHeight:'0',padding:'0 16px'}}>
                <Line data={props.data}></Line>
            </Card>

        </>

    )

}
export default connect(state => {
    return {
        data: state.campus.buildings,
        loading:state.loading.models.campus
    }
})(CampusDetail)