import { message, Spin } from 'antd'
import { connect } from 'dva'
import { Component } from 'react'
import router from 'umi/router'

const { BMap, BMAP_STATUS_SUCCESS } = window
// 测试采点 115.834109,28.658445,115.834648,28.658191

class Campus extends Component {
  state = {
    spining: true
  }
  map = null
  // map = new BMap.Map("bMap", {enableClick: false,});
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
  componentWillMount(){
    console.log('will',this.map)
    // if(this.map){
    //   this.map = new BMap.Map("bMap", {
    //     enableClick: false,
    //   });
    // }
  }
  componentDidMount() {
    console.log('cm',this.map)
    // if(this.map){
    //   this.map = new BMap.Map("bMap", {
    //     enableClick: false,
    //   });
    // }

  }
  componentWillUnmount(){
    // this.map = null
    // console.log('um',this.map)
  }
  shouldComponentUpdate(){
    console.log('su',this.map)
    if(this.map){
      this.map = new BMap.Map("bMap", {
        enableClick: false,
      });
    }
    return true
  }
  
  componentDidUpdate() {
    
    this.map = new BMap.Map("bMap", {
      enableClick: false,
    });
    console.log(this.props)
    const mapGeo = new BMap.Geocoder()
    //地址解析
    mapGeo.getPoint("北京市海淀区上地10街10号", function (point) {
      if (point) {
        // message.info(JSON.stringify(point))
        // alert(point)
        // this.map.centerAndZoom(point, 16);
        // this.map.addOverlay(new BMap.Marker(point));
      }
    },"北京市");
    let point = new BMap.Point(115.835319,  28.662582 )
    this.map.enableAutoResize()
    this.map.enableScrollWheelZoom()
    this.map.centerAndZoom(point, 14);
    this.map.setMapStyle({
      styleId: '65a2034e61a54228c1bb34e99780e977'
    });
    // this.getLocation(this.map)
    const marks = [{ lng: 115.835319, lat: 28.662582 }, { lng: 115.834109, lat: 28.658445 }]
    this.addMarks(marks)
  }


  addMarks = (marks) => {
    // const data = props.data
    const data = [{id:'45314097-3d9d-41c9-899d-4cf1ba829d03',name:'南航测试数据'},
    {id:'45314097-3d9d-41c9-899d-4cf1ba829d03',name:'南航测试数据'}]
    marks.forEach((mark,index) => {
      let point = new BMap.Point(mark.lng, mark.lat)
      let ma = new BMap.Marker(point)
      let infoWin = new BMap.InfoWindow('宿舍', { width: 250, height: 100, title: '前湖校区' })
      ma.addEventListener('mouseover', function (e) {
        ma.openInfoWindow(infoWin)
      })
      ma.addEventListener('mouseout', function (e) {
        ma.closeInfoWindow(infoWin)
      })
      ma.addEventListener('click', function () {
        // router.push({ pathname: '/home/campus/campusDetail', state: { id: '45314097-3d9d-41c9-899d-4cf1ba829d03' } })
        router.push(`/home/campus/campusDetail?cid=${data[index].id}&cname=${data[index].name}`)
      })

      this.map.addOverlay(ma)
    })
  }


  render() {
    console.log('render',this.map)
    return (
      <div style={{ width: '100%', height: '100%' }} id="bMap" ></div>
    )
  }
}


export default connect(state => {
  return {
    data: state.campus.campus
  }
})(Campus)
