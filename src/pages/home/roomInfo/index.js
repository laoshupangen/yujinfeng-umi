import Rooms from '@/components/Rooms'
console.log(Rooms)
const rooms = [{id:'1',roomNum:'101',current:75,total:100},{
    id:'2',roomNum:'102',current:100,total:100
}]
function roomInfo(props){
    return (
        <Rooms rooms={rooms}></Rooms>
    )
}
export default roomInfo