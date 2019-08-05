//黄 #F6CD2D  蓝色 #5D55D6 灰色 #5AD3A7 橘红 #FA6249 浅蓝 #4EC4E5
import icon from '../assets/icon/ssl@2x.png'
function circle(props){
    
    const style = {
        width:props.size||60,
        height:props.size||60,
        borderColor:props.color||'#4EC4E5',
        lineHeight:props.size||'30px'
    }
    const imgStyle = {
        backgroundColor:props.color||'#4EC4E5',
    }

    return (
        <div className="selfcircle" style={style}>
          <div className="selfcircleWrap" style={{backgroundColor:props.color||'#4EC4E5'}}>
            <img src={icon} style={imgStyle}></img>
           </div>  

        </div>
    )

}
export default circle