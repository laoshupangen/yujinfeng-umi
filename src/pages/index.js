import Redirect from 'umi/redirect';
import {connect} from 'dva'
function App(props){
    console.log('pages/index',props)
    return (

        //  !props.isLogin&&<Redirect to="/login" />
        <Redirect to="/login" />
         
        
    )
}
// export default connect(state=>{return{isLogin:state.user.loginStatus}})(Home)
export default App
