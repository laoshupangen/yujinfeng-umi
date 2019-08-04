import Redirect from 'umi/redirect';
import {connect} from 'dva'
function App(props){
    console.log('pages/index',props)
    return (

        
        <Redirect to="/login" />
        // <div></div>
         
        
    )
}
// export default connect(state=>{return{isLogin:state.user.loginStatus}})(Home)
export default App
