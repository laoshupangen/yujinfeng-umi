import $ from '@/utils/fetch'
// 楼栋列表
export const getBuildingList = ({campusId})=>{
    return $.post('/Building/List',{campusId})
}
// 添加新的校区
export const addBuilding = ({title,floors,campusId,number,allowGender,autoGenerate,roomsPerFloor,bedsPerRoom})=>{
    return $.post('/Building/Add',{title,floors,campusId,number,allowGender,autoGenerate,roomsPerFloor,bedsPerRoom})
}
// 编辑楼栋信息
export const editBuilding = ({id,title,floors,campusId,number,allowGender})=>{
    return $.post('/Building/update',{id,title,floors,campusId,number,allowGender})
}
// 删除某个校区信息
export const deleteBuilding = (id)=>{
    return $.post('/Building/Delete',{id})
}
