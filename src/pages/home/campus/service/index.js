import $ from '@/utils/fetch'
export const getCampusPage = ({pageSize,pageIndex,sortName,sortOrder})=>{
    return $.get('/Campus/GetPage',{params:{
        pageSize,
        pageIndex,
        sortName,
        sortOrder
    }})
}