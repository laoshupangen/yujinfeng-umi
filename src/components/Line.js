import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
class Line extends React.Component {
  state = {};
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    //this.props.data
    const seriesData = {'空床位':[120, 132, 101, 134, 90, 230, 210],'维修中':[220, 182, 191, 234, 290, 330, 310]}
    const xAxisData = ['M1栋','M2栋','M3栋','M4栋','M5栋','M6栋','M7栋']
    const myChart = echarts.init(document.getElementById('main'));
    window.onresize = function(){
        myChart.resize()
    }
   const option = {
       
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['空床位','维修中']
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
            type: 'value'
        },
        series: [
            {
                name:'空床位',
                type:'line',
                stack: '总量',
                data:seriesData['空床位'],
                areaStyle:{}
            },
            {
                name:'维修中',
                type:'line',
                stack: '总量',
                data:seriesData['维修中']
            },
           
        ]
    };
    // 绘制图表
    myChart.setOption(option);
  }
  render() {
    return (
      <div id="main" style={{ width: '100%', height: 400 }} />
    );
  }
}
export default Line;

