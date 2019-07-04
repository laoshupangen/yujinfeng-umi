import $ from '@/utils/fetch'
// 获取校区列表
export const getBuildingPage = ({pageSize,pageIndex,sortName,sortOrder})=>{
    return $.get('/Building/GetPage',{params:{
        pageSize,
        pageIndex,
        sortName,
        sortOrder
    }})
}
// 添加新的校区
export const addBuilding = ({name,numbers,address})=>{
    return $.post('/Building/Create',{name,numbers,address})
}
// 编辑校区信息
export const editBuilding = ({id,name,number,address})=>{
    return $.post('/Building/Modify',{id,name,number,address})
}
// 删除某个校区信息
export const deleteBuilding = (id)=>{
    return $.get('/Building/Delete',{params:{id}})
}
