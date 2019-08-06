import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
class Line extends React.Component {
  constructor(props){
    super(props)
  }
  
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    //this.props.data
    console.log(this.props)
    const xAxisData = this.props.data.map(d=>d.title)   
   
    const seriesData = {
        '空床位':this.props.data.map(p=> p =Math.abs( p.bedCount-p.checkinCount)),
        '维修中':this.props.data.map(p=> p=0),
    }
    console.log()
    // const seriesData = {'空床位':[10, 20, 15, 18, 22, 29, 35],'维修中':[14, 23, 28, 32, 34, 24, 26]}
    // const xAxisData = ['M1栋','M2栋','M3栋','M4栋','M5栋','M6栋','M7栋']
    const myChart = echarts.init(document.getElementById('main'));
    window.onresize = function(){
        myChart.resize()
    }
   const option = {
       
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['空床位','维修中'],
            right:'0'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
       
        xAxis: {
            type: 'category',
            min:'dataMin',
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value',
            
        },
        series: [
            {
                name:'空床位',
                type:'line',
                // stack: '总量',
                data:seriesData['空床位'],
                areaStyle:{}
            },
            {
                name:'维修中',
                type:'line',
                // stack: '总量',
                data:seriesData['维修中'],
                areaStyle:{}
            },
           
        ]
    };
    // 绘制图表
    myChart.setOption(option);
  }
  render() {
    return (
      <div id="main" style={{ width: '100%', height: 300 }} />
    );
  }
}
export default Line;

