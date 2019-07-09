import $ from '@/utils/fetch'
export const Login = ({phone,email,account,password})=>{
    return $.post('/User/Login',{phone,email,account,password})
}
export const LoginQut = ()=>{
    return $.post('/User/Logout')
}

