import styles from './login.css'
import {Form,Input,Button,Icon} from 'antd'
export default function(props){
    const colStyle = {}
    const handleSubmit = function(e){
      console.log(e)
    }
    return (
        <div className={styles.container}>
           <Form onSubmit={handleSubmit}>
               <Form.Item >
                   <Input placeholder="用户名"
                   prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}/>}/>

               </Form.Item>
               
                   <Form.Item >
                       <Input type="password" placeholder="密码"
                       prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}}/>}/>
                   </Form.Item>

               <Form.Item>
                   <Button type="primary" htmlType="submit" className={styles.loginForm}>登陆</Button>

               </Form.Item>
           </Form>
        </div>
    )
}