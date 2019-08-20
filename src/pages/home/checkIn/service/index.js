import $ from '@/utils/fetch'
export const getDiscipine = ({keyword})=>{
   return $.post('/Discipine/List',{keyword})
}
export const getBuilding = ({campusId})=>{
    return $.post('/Building/List',{campusId})
}
export const distributeDorm = ({colleges,rooms})=>{
    return $.post('/DormDistribute/Do',{colleges,rooms})
}
export const getFloors = ({buildingId})=>{
    return $.post('/Building/CheckInfo',{buildingId})
}