import $ from '@/utils/fetch'
// 获取校区列表
export const getCampusList = ({keyword})=>{
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
    return $.post('/Campus/Delete',{id})
}

// 获取楼栋
export const getBuildingList = ()=>{
    return $.post('/Building/List')
}

export const getBuild = ({buildingId})=>{
    return $.post('/bed/BuildingBedsInfo',{buildingId})
}

//根据buildingId获取响应数据
