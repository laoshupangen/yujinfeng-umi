import $ from '@/utils/fetch'
export const graduateList = ({isGraduationQuery,collegeId,campusId,pageSize,pageIndex,sortName,sortOrder})=>{
    return $.post('/student/Page',{
        isGraduationQuery,collegeId,campusId,pageSize,pageIndex,sortName,sortOrder
    })
}