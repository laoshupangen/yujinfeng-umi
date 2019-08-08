import Scard from '@/components/Scard.js'
import Line from '@/components/Line.js'
import { Card ,Icon,Empty } from 'antd'
const { Grid } = Card
import router from 'umi/router'
import { connect } from 'dva'

function CampusDetail(props) {
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
    
    
   
    const handleForward = (id) => {
        // router.push('/home/campus/campusDetail/singleRoom')
        let freeBeds = id.bedCount-id.checkinCount
        router.push(`/home/campus/campusDetail/singleRoom?id=${id.id}&lname=${id.title}`+
        `&cname=${props.location.query.cname}&freeBeds=${freeBeds}`)
        // router.push({pathname:'/home/campus/campusDetail/singleRoom',query:{id}})
    }
    const handleBack = () => {
        // router.push('/home/campus')
        router.goBack()
    }
    
    const male = props.data.length === 0 ? [] : props.data.filter(pd =>pd.allowGender&&pd.allowGender.indexOf('allowGenders.male') !== -1)
    const female = props.data.filter(pd => pd.allowGender && pd.allowGender.indexOf('allowGenders.female') !== -1)
    // const female = props.data
    const bodyStylem = male.length!==0?{}:{border:'1px solid #eee'}
    const bodyStylef = female.length!==0?{}:{border:'1px solid #eee'}
    const colors = ['#F6CD2D','#4EC4E5','#FA6249','#5AD3A7']
    let sum = 0
    for (let i=0;i<props.data.length;i++){
        sum +=Math.abs(props.data[i].bedCount - props.data[i].checkinCount) 
    }
    
    
    console.log(props)
    const title1 = `${props.location.query.cname}(共有${sum}个空床位)`
      
 //黄 #F6CD2D  蓝色 #5D55D6 灰色 #5AD3A7 橘红 #FA6249 浅蓝 #4EC4E5

    return (
        <>
            <div style={{ background: '#f0f2f5', padding: '0 10px 5px 10px' }}><a onClick={handleBack}><Icon type="arrow-left" />返回上一页</a></div>
            <Card title={props.location.query.cname} extra={<a onClick={()=>window.location.reload()} style={{ padding: '0', }}><Icon type="reload"/></a>} bodyStyle={{padding:'10px 24px'}} headStyle={{minHeight:'0',padding:'0 16px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card loading={props.loading} bordered={false} bodyStyle={bodyStylem} title="男宿舍楼" headStyle={headStyle} style={{ width: '450px' }}>
                        {male.length!==0&& male.map((ma,index) =>
                            (
                                <Grid key={ma.id} style={gridStyle} onClick={()=> handleForward(ma)}>
                                    <Scard title={ma.title} data={ma} color={colors[index%4]}></Scard>
                                </Grid>
                            )
                        )}
                        {
                            male.length === 0 && <Empty></Empty>
                        }
                        


                    </Card>
                    
                    <Card bordered={false} loading={props.loading} title="女宿舍楼" bodyStyle={bodyStylef} headStyle={headStyle} style={{ width: '450px' }}>
                        
                        {female.length!==0&&female.map((ma,index)=> (<Grid key={ma.id} style={gridStyle} onClick={()=>handleForward(ma)}>
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
            <Card title={title1} extra={<a style={{ padding: '0', }}><Icon type="reload"/></a>} headStyle={{minHeight:'0',padding:'0 16px'}}>
              {props.data&&props.data.length!==0&&<Line data={props.data}></Line>}
              {!props.data||props.data.length===0&&<Empty></Empty>}  
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