import {Card,Progress} from 'antd'
function Room(props){
    const {roomNum,current,total} = props
    let percent = Math.round(current*100/total)
    const gridStyle1 = {
        width:'40%',
        textAlign:'center'
    }
    const gridStyle2 = {
        width:'60%',
        textAlign:'center'
    }
    return (
       <Card style={{width:'100%',height:'100%'}}>
           <Card.Grid style={gridStyle1}>
           <Progress type="circle" percent={percent} format={percent=>percent!==100?'未满':'满员'}></Progress>

           </Card.Grid>
           <Card.Grid style={gridStyle2}>
               <p>房间：{roomNum}</p>
               <p>入住：{current+'/'+total}</p>

           </Card.Grid>
            

       </Card>
    )
}
export default Room