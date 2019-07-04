import $ from '@/utils/fetch'
// 获取校区列表
export const getCampusPage = ({pageSize,pageIndex,sortName,sortOrder})=>{
    return $.get('/Campus/GetPage',{params:{
        pageSize,
        pageIndex,
        sortName,
        sortOrder
    }})
}
// 添加新的校区
export const addCampus = ({name,numbers,address})=>{
    return $.post('/Campus/Create',{name,numbers,address})
}
// 编辑校区信息
export const editCampus = ({id,name,number,address})=>{
    return $.post('/Campus/Modify',{id,name,number,address})
}
// 删除某个校区信息
export const deleteCampus = (id)=>{
    return $.get('/Campus/Delete',{params:{id}})
}