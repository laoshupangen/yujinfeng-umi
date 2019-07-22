import { Table, Button } from 'antd'
import { connect } from 'dva'
import {Component} from 'react'
import router from 'umi/router'

// 测试采点 115.834109,28.658445,115.834648,28.658191

class building extends Component {
  componentDidMount(){
    const { BMap, BMAP_STATUS_SUCCESS } = window
    const map = new BMap.Map("bMap"); 
    const mapGeo =  new BMap.Geocoder()
    const point = new BMap.Point(116.404, 39.915,{
      enableClick:false,
    })
    var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_LEFT});
    map.addControl(mapType2);  
    map.disableDoubleClickZoom()
    // map.disableDragging()
    map.centerAndZoom(point, 16); 
    // map.setMapStyle({     
    //   styleId: '65a2034e61a54228c1bb34e99780e977'
    // });
    // map.setMapType(BMAP_PERSPECTIVE_MAP)
    map.setCurrentCity("北京市")
    const marks = [{lng:115.835319,lat:28.662582},{lng:115.834109,lat:28.658445}]
    addMarks(marks)
    
    function addMarks(marks) {

      marks.forEach((mark)=>{
        let point = new BMap.Point(mark.lng,mark.lat)
        let ma = new BMap.Marker(point)
        let infoWin = new BMap.InfoWindow('宿舍',{width:250,height:100,title:'前湖校区'})
        ma.addEventListener('click',function(e){
            console.log(e)
            console.log(this)
            // mapGeo.getLocation(point,function(result){
            //   console.log(result)
            // })
            ma.openInfoWindow(infoWin)
            // router.push({pathname:'/home/campus'})

        })
        map.addOverlay(ma)
      })
    } 

  }
  

  render(){
    return (
      <div id="bMap" style={{  width: '100%', height: '100%' }}></div>
    )
  }
}   

// function building(props){

//   return (
//   <div>
//     <div id="bMap" style={{ position: "absolute", top: 0, left: 0, width: '100vw', height: '100vh' }}></div>
//   </div>)
// }
export default building
