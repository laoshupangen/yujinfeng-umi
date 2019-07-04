import $ from '@/utils/fetch'
// 添加房间
export const addRoom = ({buildingId,number,floor,title,bedCount,type})=>{
    return $.post('/Room/create',{buildingId,number,floor,title,bedCount,type})
}
// 编辑房间信息
export const editRoom = ({id,buildingId,number,floor,title,bedCount,type})=>{
    return $.post('/Room/modify',{id,buildingId,number,floor,title,bedCount,type})
}
// 删除
export const deleteRoom = (id)=>{
    return $.get('/Room/Delete',{params:{id}})
} 
// 获取房间列表
export const getRoom = ({pageSize,pageIndex,sortName,sortOrder})=>{
    return $.get('/Room/Getpage',{
        pageSize,pageIndex,sortName,sortOrder
    })
} 
// 单个房间分配
export const assignRoom = ({ studentId,roomId})=>{
    return $.post('/Room/Distribute',{
        studentId,roomId
    })
}
// 批量分配---localhost???
export const assignRoomAuto = ({studentId,roomId})=>{
    return $.post('/Room/BatchDistribute',{studentId,roomId})
}

// 入住登记
export const checkInRegister = ({type,sourceId,studentId,roomId})=>{
    return $.post('/Room/CheckIn',{type,sourceId,studentId,roomId})
}
// 房间调换
export const changeRoom = ({studentId,originRoomId,targetRoomId})=>{
    return $.post('/Room/Exchange',{studentId,originRoomId,targetRoomId})
}
// 退宿舍
export const checkOutRoon = ({checkInId,studentId,roomId})=>{
    return $.post('/Room/CheckOut',{checkInId,studentId,roomId})
} 