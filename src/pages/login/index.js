import styles from './login.css'
import { Form, Input, Button, Icon, message, Row, Col } from 'antd'
import md5 from 'md5'

import { connect } from 'dva';


const App = function (props) {
    console.log(props)
    const state = {
        userName: '',
        password: '',        
    }
    const getFormName = (e) => {
        e.persist()
        state.userName = e.target.value
    }
    const getFormPassword = (e) => {
        e.persist()
        state.password = e.target.value
    }

    // 校验用户名[/^1(3|4|5|7|8)\d{9}$/,/(\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14})/]
    const valid = function (str) {
        let phoneReg = /^1(3|4|5|7|8)\d{9}$/,
            emailReg = /(\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14})/
        if (phoneReg.test(str)) {
            return 2
        } else if (emailReg.test(str)) {
            return 1
        } else {
            return 0
        }

    }

    const handleSubmit = function (e) {
        e.preventDefault()       
        
        if (state.password === '' || state.userName === '') {
            message.warn('账号或密码不能为空')
            return
        }
        let k = valid(state.userName);
        state.password = md5(state.password)
        console.log(state.userName, k)
        props.dispatch({type:'user/btnStatus',payload:{data:true}})
        switch (k) {
            case 0:
                props.dispatch({ type: 'user/Login',payload:{account:state.userName,password:state.password}});
                break;
            case 1:
                props.dispatch({ type: 'user/Login',payload:{email:state.userName,password:state.password}});
                break;
            case 2:               
               props.dispatch({ type: 'user/Login',payload:{phone:state.userName,password:state.password}});               
                break;
        }
        


    }
  

    return (
        <Row className={styles.container}>
            <Col xs={{span:12,offset:6}} sm={{span:6,offset:9}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Item >
                        <Input placeholder="用户名/手机号/邮箱"
                            onChange={getFormName}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />

                    </Form.Item>

                    <Form.Item >
                        <Input type="password" placeholder="密码"
                            onChange={getFormPassword}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    </Form.Item>

                    <Form.Item>
                        <Button loading={props.loading} type="primary" htmlType="submit" className={styles.loginForm}>登陆</Button>

                    </Form.Item>
                </Form>

            </Col>

        </Row>


    )
}
function mapState(state) {
  console.log(state)
  return {
      loading:state.user.btnStatus,      
  };
}


export default connect(mapState)(App)
// export default App