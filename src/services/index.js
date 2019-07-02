import $ from '@/utils/fetch'
export const Login = ({phone,password})=>{
    return $.post('/User/Login',{phone,password})
}

