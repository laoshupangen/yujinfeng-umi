import {Row,Col} from 'antd'
import Room from '@/components/Room'

const _chunk = function(array,n){
    let rows = Math.ceil(array.length/n)
    console.log(rows)
    let newA = []
    for(let i = 0;i<rows;i++){
        let temrow = []
        for (let j = 0;j<n;j++){
           if(array[i+j]) temrow.push(array[i+j]);
            
        }
       
        newA.push(temrow)
    }
    return newA
}
function Rooms(props){
  console.log(props.rooms)  
  const lists =_chunk(props.rooms,6) 
  console.log(lists)
  const listItme = lists.map(row=>{
      row = row.map(col => <Col span={4}><Room roomNum={col.roomNum } current={col.current} total={col.total}></Room></Col>)
      return <Row>{row}</Row>
  })
  console.log(listItme)
 return (<div>{listItme}</div>)
}
export default Rooms