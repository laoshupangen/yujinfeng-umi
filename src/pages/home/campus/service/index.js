import $ from '@/utils/fetch'
// 获取校区列表
export const getCampusPage = ({keyword})=>{
    return $.post('/Campus/List',{
        keyword
    })
}
// 添加新的校区
export const addCampus = ({name,number,address})=>{
    return $.post('/Campus/Add',{name,number,address})
}
// 编辑校区信息
export const editCampus = ({id,name,number,address})=>{
    return $.post('/Campus/Update',{id,name,number,address})
}
// 删除某个校区信息
export const deleteCampus = (id)=>{
    return $.get('/Campus/Delete',{params:{id}})
}