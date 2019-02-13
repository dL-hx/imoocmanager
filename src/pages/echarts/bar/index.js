// src/pages/echarts/bar/index.js
import React from 'react';
import {Card} from 'antd';
import ReactEcharts from 'echarts-for-react';
import echartTheme from './../echartTheme';
import themeLight from './../themeLight';
//按需加载
import echarts from 'echarts/lib/echarts';
//必需基础组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
//导入矩形图
import 'echarts/lib/chart/bar';


export default class Bar extends React.Component {

  componentWillMount() {
    echarts.registerTheme('Default', echartTheme);
    echarts.registerTheme('Light', themeLight);
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: { // 提示条
        trigger: 'axis',
      },
      xAxis: { // X轴
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {// Y轴
        type: 'value'
      },
      series: [ // 整体数据源
        {
          name: '订单量',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    return option;
  };

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      legend: { // 图例
        data: ['OFO', '摩拜', '小蓝']
      },
      tooltip: { // 提示条
        trigger: 'axis',
      },
      xAxis: { // X轴
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {// Y轴
        type: 'value'
      },
      series: [ // 整体数据源
        {
          name: 'OFO',
          type: 'bar',
          data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
        }, {
          name: '摩拜',
          type: 'bar',
          data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
        }, {
          name: '小蓝',
          type: 'bar',
          data: [1000, 2500, 4000, 4500, 6000, 7000, 8000]
        }
      ]
    };
    return option;
  };

  render() {
    return (
      <div>
        <Card title="基本柱形图表">
          <ReactEcharts option={this.getOption()} theme="Default"/>
        </Card>
        <Card title="对比柱形图表" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} theme="Default" style={{height: 500}}/>
        </Card>
      </div>
    );
  }
}