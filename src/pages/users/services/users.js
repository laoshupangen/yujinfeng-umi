import axios from '@/utils/request';
export const fetch = ({_page =1,_limit=5})=>{
    return axios.get('/api/users',{_page,_limit});
}
export const getCampusList = ()=>{
    return axios.get('/api/Campus/GetPage')
}