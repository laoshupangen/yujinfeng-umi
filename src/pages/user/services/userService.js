import $ from '@/utils/fetch';
export const fetch = ({pageIndex =1,pageSize=10})=>{
    return $.get('http://localhost/api/user/getpage',{pageIndex,pageSize});
}
