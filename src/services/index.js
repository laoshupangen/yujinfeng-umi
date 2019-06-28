import $ from '@/utils/fetch'
export const Login = ({phone,password})=>{
    return $.post('/api/User/Login',{phone,password})
}