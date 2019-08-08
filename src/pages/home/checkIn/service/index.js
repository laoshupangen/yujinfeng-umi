import $ from '@/utils/fetch'
export const getDiscipine = ({keyword})=>{
   return $.post('/Discipine/List',{keyword})
}
export const getBuilding = ({campusId})=>{
    return $.post('/Building/List',{campusId})
}