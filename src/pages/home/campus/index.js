import { message, Icon, Tooltip } from 'antd'
import { connect } from 'dva'
import { Component } from 'react'
import router from 'umi/router'
import styles from './index.css'
import pic from '../../../assets/testmap.png'
const { BMap, BMAP_STATUS_SUCCESS } = window
// 测试采点 115.834109,28.658445,115.834648,28.658191
class Campus extends Component {
  state = {
    spining: true
  }
  map = null

  getLocation = (map) => {
    const geolocation = new BMap.Geolocation();
    const _this = this
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        // map.panTo(r.point);
        map.centerAndZoom(r.point, 14);

        // message.info('您的位置：' + r.point.lng + ',' + r.point.lat);
      }
      else {
        // alert('failed' + this.getStatus());
        message.error(this.getStatus())
      }
    });
    // _this.setState({
    //   spining:false
    // })

    // var myCity = new BMap.LocalCity();
    // myCity.get(function(r){
    //   message.info('您的位置：' +r.name);
    //   map.setCenter(r.name)
    // });

  }
  geocoder = (ads) => {
    const mapGeo = new BMap.Geocoder()
    //地址解析
    if(!ads.address){
      return 
    }
    let _this = this
    mapGeo.getPoint(ads.address, function (point) {
      if (point) {
        console.log(point,'??')
        _this.makeMark(point,ads)
        
      }
    }, "南昌市");

  }
  componentWillMount() {

  }

  componentDidMount() {
    this.map = new BMap.Map("bMap", {
      enableClick: true,
    });
    // BMap.Point(115.835319, 28.662582)
    let point = new BMap.Point(120.78961,30.751547)
    this.map.enableAutoResize()
    this.map.enableScrollWheelZoom()
    this.map.centerAndZoom(point, 18);
     this.map.setMapStyle({
      styleId: '65a2034e61a54228c1bb34e99780e977'
    });
    

  }
  componentWillUnmount() {
    // this.map = null
    // console.log('um',this.map)
  }

  componentDidUpdate() {


    // const mapGeo = new BMap.Geocoder()
    // //地址解析
    // mapGeo.getPoint("北京市海淀区上地10街10号", function (point) {
    //   if (point) {
    //     // message.info(JSON.stringify(point))
    //     // alert(point)
    //     // this.map.centerAndZoom(point, 16);
    //     // this.map.addOverlay(new BMap.Marker(point));
    //   }
    // },"北京市");
    // let point = new BMap.Point(115.835319,  28.662582 )
    // this.map.enableAutoResize()
    // this.map.enableScrollWheelZoom()
    // this.map.centerAndZoom(point, 14);
    // this.map.setMapStyle({
    //   styleId: '65a2034e61a54228c1bb34e99780e977'
    // });
    // this.getLocation(this.map)
    // const marks = [{ lng: 115.835319, lat: 28.662582 }, { lng: 115.834109, lat: 28.658445 }]
    // this.addMarks(marks)
  }
  makeMark = (point,data) => {
    console.log(point,data)
    point = new BMap.Point(point.lng,point.lat)
    let ma = new BMap.Marker(point)
    console.log(ma)
    let rate = Math.floor(data.checkinCount * 10000 / data.bedCount) / 100 + '%'
    let content = `<span>共${data.buildingCount}栋宿舍楼,共${data.bedCount}床位,已住${data.checkinCount},入住率:${rate}</span>`
    let infoWin = new BMap.InfoWindow(content, {
      width: 250, height: 100,
      title: data.name
    })
    ma.addEventListener('mouseover', function (e) {
      ma.openInfoWindow(infoWin)
    })
    ma.addEventListener('mouseout', function (e) {
      ma.closeInfoWindow(infoWin)
    })
    ma.addEventListener('click', function () {
      // router.push({ pathname: '/home/campus/campusDetail', query: { cid: data[index].id,cname:data[index].name } })
      router.push(`/home/campus/campusDetail?cid=${data.id}&cname=${data.name}`)
    })

    this.map.addOverlay(ma)

  }

  addMarks = () => {
    // const data = props.data
    const data = this.props.data
    data.forEach(d => {
      this.geocoder(d)
    });
  }

  iconClick = (d) => {
    router.push(`/home/campus/campusDetail?cid=${d.id}&cname=${d.name}`)
  }


  render() {
    this.addMarks()
    return (
      <div style={{ width: '100%', height: '85%' }} id="bMap" ></div>
    )
    // return (
    //   <div style={{ width: '100%', height: '85%'}} className={styles.bMap}>
    //     <img className={styles.imgtest} src={pic}/>
    //     {
    //       this.props.data.map((d,index)=>(
    //         <div key={index} className={styles.icon} style={{top:`2${index/2+5}0px`,left:`4${index*2+5}0px`}}>
    //           <Tooltip title="百度地图无法">
    //             <Icon type="eye" onClick={()=>this.iconClick(d)} theme="twoTone" twoToneColor="darkblue"></Icon>
    //           </Tooltip></div>
    //       ))
    //     }
    //   </div>
    //)
  }
}


export default connect(state => {
  return {
    data: state.campus.campus
  }
})(Campus)
