// src/pages/echarts/pie/index.js
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
//导入饼图
import 'echarts/lib/chart/pie';


export default class Bar extends React.Component {

  componentWillMount() {
    echarts.registerTheme('Default', echartTheme);
    echarts.registerTheme('Light', themeLight);
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center' // 水平方向居中
      },
      legend:{ // 图例
        orient:'vertical',// 垂直方向排列
        right:10,         // 绝对定位位置
        top:20,
        bottom:20,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      tooltip: { // 提示条
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)' //格式化提示项
      },
      series: [ // 整体数据源
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1000,
              name: '周二'
            },
            {
              value: 2000,
              name: '周三'
            },
            {
              value: 1500,
              name: '周四'
            },
            {
              value: 3000,
              name: '周五'
            },
            {
              value: 2000,
              name: '周六'
            },
            {
              value: 1200,
              name: '周日'
            }
          ]
        }
      ]
    };
    return option;
  };

  getOption2 = () => {// radius属性设置内环外环大小
    let option = {
      title: {
        text: '用户骑行订单',
        x:'center' // 水平方向居中
      },
      legend: {
        orient:'vertical',// 垂直方向排列
        right:10,         // 绝对定位位置
        top:20,
        bottom:20,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      tooltip: { // 提示条
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)' //格式化提示项
      },
      series: [ // 整体数据源
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%','80%'], //内环外环大小
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1000,
              name: '周二'
            },
            {
              value: 2000,
              name: '周三'
            },
            {
              value: 1500,
              name: '周四'
            },
            {
              value: 3000,
              name: '周五'
            },
            {
              value: 2000,
              name: '周六'
            },
            {
              value: 1200,
              name: '周日'
            }
          ]
        }
      ]
    };
    return option;
  };

  getOption3  = () => { // roseType:'radius', roseType属性指定半径radius或区域area(数据大、半径大)
    let option = {
      title: {
        text: '用户骑行订单',
        x:'center' // 水平方向居中
      },
      legend: {
        orient:'vertical',// 垂直方向排列
        right:10,         // 绝对定位位置
        top:20,
        bottom:20,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      tooltip: { // 提示条
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)' //格式化提示项
      },
      series: [ // 整体数据源
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 1000,
              name: '周二'
            },
            {
              value: 2000,
              name: '周三'
            },
            {
              value: 1500,
              name: '周四'
            },
            {
              value: 3000,
              name: '周五'
            },
            {
              value: 2000,
              name: '周六'
            },
            {
              value: 1200,
              name: '周日'
            }
          ].sort((a, b) => { // 数据排序
            return a.value - b.value
          }),
          roseType:'radius', //数据大、半径大
        }
      ]
    };
    return option;
  };

  render() {
    return (
      <div>
        <Card title="饼形图表">
          <ReactEcharts option={this.getOption()} theme="Light"/>
        </Card>
        <Card title="环形图表" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} theme="Light"/>
        </Card>
        <Card title="南丁格尔图表" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption3()} theme="Light"/>
        </Card>
      </div>
    );
  }
}