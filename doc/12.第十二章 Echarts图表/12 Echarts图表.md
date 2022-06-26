# 12 Echarts 图表

> 百度Echarts是一个基于Canvas的纯Javascript图表库，提供直观、生动、可交互、可个性化定制的数据可视化图表。官网地址：<http://echarts.baidu.com/index.html>

---

原文: https://www.cnblogs.com/ljq66/p/10223002.html

[TOC]

[Github地址](https://github.com/lenvo222/imoocmanager/commit/7482c2b88954b31ecea20555b9c97f0005358d68)

## 一 Echarts基础

实例Demo：<http://echarts.baidu.com/examples/>

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190106180725704-699206000.png)

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190106181820896-888813973.png)



文档教程：<http://www.echartsjs.com/option.html#title>

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190106181228350-387785856.png)

主题下载/定制主题：[http://www.echartsjs.com/download-theme.html ](http://www.echartsjs.com/download-theme.html)

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190106182057753-307709725.png)

React组件化theme变量应用主题

### 1. 主题下载

- **echarts->echartTheme.js**

``` javascript
export default {
    "color": [
        "#f9c700",
        "#ff5400",
        "#6699cc",
        "#9cb3c5",
        "#e0e6ec",
        "#666666",
        "#787464",
        "#cc7e63",
        "#724e58",
        "#4b565b"
    ],
    "backgroundColor": "#ffffff",
    "textStyle": {},
    "title": {
        "textStyle": {
            "color": "#cccccc"
        },
        "subtextStyle": {
            "color": "#cccccc"
        }
    },
    "line": {
        "itemStyle": {
            "normal": {
                "borderWidth": 1
            }
        },
        "lineStyle": {
            "normal": {
                "width": 2
            }
        },
        "symbolSize": "10",
        "symbol": "emptyCircle",
        "smooth": false
    },
    "pie": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
            },
            "emphasis": {
                "borderWidth": 0,
                "borderColor": "#ccc"
            }
        }
    },
    "categoryAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#f1f3f5"
            }
        },
        "axisTick": {
            "show": true,
            "lineStyle": {
                "color": "#f1f3f5"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999",
                "fontSize": "14"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#f1f3f5"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        }
    },
    "valueAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#f1f3f5"
            }
        },
        "axisTick": {
            "show": true,
            "lineStyle": {
                "color": "#f1f3f5"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999",
                "fontSize": "14"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#f1f3f5"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        }
    },
    "toolbox": {
        "iconStyle": {
            "normal": {
                "borderColor": "#999999"
            },
            "emphasis": {
                "borderColor": "#666666"
            }
        }
    },
    "legend": {
        "textStyle": {
            "color": "#333333"
        }
    },
    "tooltip": {
        "axisPointer": {
            "lineStyle": {
                "color": "#cccccc",
                "width": 1
            },
            "crossStyle": {
                "color": "#cccccc",
                "width": 1
            }
        }
    },
    "timeline": {
        "lineStyle": {
            "color": "#293c55",
            "width": 1
        },
        "itemStyle": {
            "normal": {
                "color": "#293c55",
                "borderWidth": 1
            },
            "emphasis": {
                "color": "#a9334c"
            }
        },
        "controlStyle": {
            "normal": {
                "color": "#293c55",
                "borderColor": "#293c55",
                "borderWidth": 0.5
            },
            "emphasis": {
                "color": "#293c55",
                "borderColor": "#293c55",
                "borderWidth": 0.5
            }
        },
        "checkpointStyle": {
            "color": "#e43c59",
            "borderColor": "rgba(194,53,49,0.5)"
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#293c55"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#293c55"
                }
            }
        }
    },
    "markPoint": {
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#ffffff"
                }
            }
        }
    }
}
```

- **echarts->themeLight.js**

``` javascript
var colorPalette = [
    '#C1232B',
    '#27727B',
    '#FCCE10',
    '#E87C25',
    '#B5C334',
    '#FE8463',
    '#9BCA63',
    '#FAD860',
    '#F3A43B',
    '#60C0DD',
    '#D7504B',
    '#C6E579',
    '#F4E001',
    '#F0805A',
    '#26C0C0'
];
export default {
 
    color: colorPalette,
 
    title: {
        textStyle: {
            fontWeight: 'normal',
            color: '#27727B'
        }
    },
 
    visualMap: {
        color: ['#C1232B', '#FCCE10']
    },
 
    toolbox: {
        iconStyle: {
            normal: {
                borderColor: colorPalette[0]
            }
        }
    },
 
    tooltip: {
        backgroundColor: 'rgba(50,50,50,0.5)',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#27727B',
                type: 'dashed'
            },
            crossStyle: {
                color: '#27727B'
            },
            shadowStyle: {
                color: 'rgba(200,200,200,0.3)'
            }
        }
    },
 
    dataZoom: {
        dataBackgroundColor: 'rgba(181,195,52,0.3)',
        fillerColor: 'rgba(181,195,52,0.2)',
        handleColor: '#27727B'
    },
 
    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#27727B'
            }
        },
        splitLine: {
            show: false
        }
    },
 
    valueAxis: {
        axisLine: {
            show: false
        },
        splitArea: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: ['#ccc'],
                type: 'dashed'
            }
        }
    },
 
    timeline: {
        lineStyle: {
            color: '#27727B'
        },
        controlStyle: {
            normal: {
                color: '#27727B',
                borderColor: '#27727B'
            }
        },
        symbol: 'emptyCircle',
        symbolSize: 3
    },
 
    line: {
        itemStyle: {
            normal: {
                borderWidth: 2,
                borderColor: '#fff',
                lineStyle: {
                    width: 3
                }
            },
            emphasis: {
                borderWidth: 0
            }
        },
        symbol: 'circle',
        symbolSize: 3.5
    },
 
    candlestick: {
        itemStyle: {
            normal: {
                color: '#C1232B',
                color0: '#B5C334',
                lineStyle: {
                    width: 1,
                    color: '#C1232B',
                    color0: '#B5C334'
                }
            }
        }
    },
 
    graph: {
        color: colorPalette
    },
 
    map: {
        label: {
            normal: {
                textStyle: {
                    color: '#C1232B'
                }
            },
            emphasis: {
                textStyle: {
                    color: 'rgb(100,0,0)'
                }
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#ddd',
                borderColor: '#eee'
            },
            emphasis: {
                areaColor: '#fe994e'
            }
        }
    },
 
    gauge: {
        axisLine: {
            lineStyle: {
                color: [
                    [
                        0.2, '#B5C334'
                    ],
                    [
                        0.8, '#27727B'
                    ],
                    [1, '#C1232B']
                ]
            }
        },
        axisTick: {
            splitNumber: 2,
            length: 5,
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            length: '5%',
            lineStyle: {
                color: '#fff'
            }
        },
        title: {
            offsetCenter: [0, -20]
        }
    }
}
```

### 2. 引用主题

``` javascript
//导入主题
import echartTheme from './../echartTheme'
import themeLight from './../themeLight'　
```



### 3. componentWillMount()中`注册主题`

``` javascript
componentWillMount(){
        echarts.registerTheme('Default', echartTheme);
        echarts.registerTheme('Light', themeLight);
}
```

### 4. ReactEcharts组件中使用主题

``` javascript
<ReactEcharts theme="Default"/>
<ReactEcharts theme="Light"/>　
```

---

- 应用中安装echarts、echarts-for-react（常用）

  ```javascript
  npm install echarts echarts-for-react --save
  //或
  yarn add echarts echarts-for-react --save
  ```

- 引用echarts

  1. 方法一：加载全部echarts包（少用）

     ```
     //加载全部echarts
     import echarts from 'echarts'
     ```

  2. 方法二：**按需加载**（常用）

     ``` javascript
     //按需加载
     import echarts from 'echarts/lib/echarts'
     //必需基础组件
     import 'echarts/lib/component/tooltip'
     import 'echarts/lib/component/title'
     import 'echarts/lib/component/legend'
     import 'echarts/lib/component/markPoint'
     
     //导入矩形图
     import 'echarts/lib/chart/bar'　    
     ```

- 引用并初始化ReactEcharts：**组件化开发，避免通过new对象的形式实现**

  ``` javascript
  import ReactEcharts from 'echarts-for-react'
   
  //render echarts options
  <ReactEcharts option={this.getOption()} theme="Default"/>
  ```


## 二 柱形图功能实现

### 2.0 路由配置

- echarts->bar->index.js : 对应路由/admin/charts/bar

- import 'echarts/lib/chart/bar'　    //导入矩形图

### 2.1 基本柱形图表

基本柱形图表

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190106230227034-230563706.png)

1. 初始化ReactEcharts

   ``` javascript
   <Card title="基本柱形图表">
         <ReactEcharts option={this.getOption()} theme="Default" style={{height: 500}}/>
   </Card>
   ```

2. getOption()渲染数据：series为核心整体数据源，type为'bar'

   ``` javascript
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
   
   ```

### 2.2 对比柱形图表

对比柱形图表

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190106230631309-424347818.png)

1. 初始化ReactEcharts

   ``` javascript
   <Card title="对比柱形图表">
             <ReactEcharts option={this.getOption2()} theme="Default" style={{height: 500}}/>
   </Card>
   ```

2. getOption2()渲染数据

   ``` javascript
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
   ```

### 2.3 完整实例

``` javascript
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
```



## 三 饼形图功能实现

### 3.0  路由配置

- echarts->pie->index.js：对应路由/admin/charts/pie
- 按需加载导入饼图

``` javascript
//导入饼图
import 'echarts/lib/chart/pie'
```

### 3.1 饼形图表

饼形图表

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190106234342231-364436500.png)

1. 初始化ReactEcharts

   ``` javascript
   <Card title="饼形图表">
         <ReactEcharts option={this.getOption()} theme="Light"/>
   </Card>
   ```

2. getOption()：关键在于option不同，type为**'pie'**，data数组元素为对象

   ``` javascript
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
   ```

   ### 3.2 环形图表

   环形图表

   ![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190106234942856-406830910.png)

   1. 初始化ReactEcharts

      ``` javascript
      <Card title="环形图表">
                 <ReactEcharts option={this.getOption2()} theme="Light"/>
      </Card>
      ```

   2. getOption2()：**radius属性**设置内环外环大小

      ``` javascript
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
      ```


   ### 3.3 南丁格尔图表

   > 表格按数据大小排序、半径或区域随数据递增

   南丁格尔图表

   ![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190106235603851-1580951987.png)

1. 初始化ReactEcharts

   ``` javascript
   <Card title="南丁格尔图表">
         <ReactEcharts option={this.getOption3()} theme="Light"/>
   </Card>
   ```

2. getOption3()：**roseType**属性指定半径radius或区域area

   ``` javascript
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
   ```

### 3.4 完整实例

``` javascript
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
```



## 四 折线图功能实现

### 4.0 路由配置

- echarts->pie->index.js：对应路由/admin/charts/pie

- 按需加载导入折线图

  ``` javascript
  //导入饼图
  import 'echarts/lib/chart/line'
  ```

### 4.1 基本折线图表

基本折线图表

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190107001917086-473025774.png)

1. 初始化ReactEcharts

   ``` javascript
   <Card title="基本折线图">
             <ReactEcharts option={this.getOption()} theme="Default" style={{height: 500}}/>
   </Card>
   ```

2. getOption()：**指定xAxis和yAxis的数据**，series中通过data**存储趋势点**

   ``` javascript
   getOption = () => {// 指定xAxis和yAxis的数据，series中通过data存储趋势点 type:'line'
       let option = {
         title: {
           text: '用户骑行订单'
         },
         tooltip: {
           trigger: 'axis',
         },
         xAxis: {
           data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
         },
         yAxis: {
           type: 'value'
         },
         series: [ // 整体数据源
           {
             name: '订单量',
             type: 'line',
             data: [1000, 2000, 1500, 3000, 2000, 1200, 800] //趋势点
           }
         ]
       };
       return option;
     };
   ```

### 4.2 对比折线图表

对比折线图表

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190107003243840-1755283257.png)

1. 初始化ReactEcharts

   ``` javascript
   <Card title="对比折线图">
            <ReactEcharts option={this.getOption2()} theme="Default" style={{height: 500}}/>
   </Card>
   ```

2. getOptions2()：**series整体数据源中多个数据对象对比**

   ``` javascript
   getOption2 = () => {// type:'line'
       let option = {
         title: {
           text: '用户骑行订单'
         },
         legend: {
           data: ['OFO订单量', '摩拜订单量']
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
             name: 'OFO订单量',
             type: 'line',
             data: [1200, 3000, 4500, 6000, 8000, 12000, 20000] //趋势点
           }, {
             name: '摩拜订单量',
             type: 'line',
             data: [1000, 2000, 5500, 6000, 8000, 10000, 12000] //趋势点
           }
         ]
       };
       return option;
     };
   ```


### 4.3 区域折线图表

区域折线图表

![](https://img2018.cnblogs.com/blog/1244398/201901/1244398-20190107004440915-114837697.png)

1. 初始化ReactEcharts

   ``` javascript
   <Card title="区域折线图">
           <ReactEcharts option={this.getOption3()} theme="Default" style={{height: 500}}/>
   </Card>
   ```

2. getOption3()：**boundaryGap**属性指定坐标轴从0开始，**areaStyle**属性指定区域填充样式

   ``` javascript
   getOption3 = () => {   // 1. boundaryGap     2. areaStyle
       let option = {
         title: {
           text: '用户骑行订单'
         },
         tooltip: {
           trigger: 'axis'
         },
         xAxis: {
           boundaryGap: false, //坐标轴从起点开始，true时在中间
           data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
         },
         yAxis: {
           type: 'value'
         },
         series: [
           {
             name: '订单量',
             type: 'line',
             data: [1000, 2000, 1500, 3000, 2000, 1200, 800], //趋势点
             areaStyle: {} //区域填充颜色
           }
         ]
       };
       return option;
     };
   ```

### 4.4 完整实例

``` javascript
// src/pages/echarts/line/index.js
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
//导入折线图
import 'echarts/lib/chart/line';


export default class Bar extends React.Component {

  componentWillMount() {
    echarts.registerTheme('Default', echartTheme);
    echarts.registerTheme('Light', themeLight);
  }

  getOption = () => {// 指定xAxis和yAxis的数据，series中通过data存储趋势点 type:'line'
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [ // 整体数据源
        {
          name: '订单量',
          type: 'line',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800] //趋势点
        }
      ]
    };
    return option;
  };

  getOption2 = () => {// type:'line'
    let option = {
      title: {
        text: '用户骑行订单'
      },
      legend: {
        data: ['OFO订单量', '摩拜订单量']
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
          name: 'OFO订单量',
          type: 'line',
          data: [1200, 3000, 4500, 6000, 8000, 12000, 20000] //趋势点
        }, {
          name: '摩拜订单量',
          type: 'line',
          data: [1000, 2000, 5500, 6000, 8000, 10000, 12000] //趋势点
        }
      ]
    };
    return option;
  };
  getOption3 = () => {   // 1. boundaryGap     2. areaStyle
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        boundaryGap: false, //坐标轴从起点开始，true时在中间
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800], //趋势点
          areaStyle: {} //区域填充颜色
        }
      ]
    };
    return option;
  };

  render() {
    return (
      <div>
        <Card title="基本折线图">
          <ReactEcharts option={this.getOption()} theme="Default" style={{height: 500}}/>
        </Card>
        <Card title="对比折线图" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption2()} theme="Default" style={{height: 500}}/>
        </Card>
        <Card title="区域折线图" style={{marginTop: 10}}>
          <ReactEcharts option={this.getOption3()} theme="Default" style={{height: 500}}/>
        </Card>
      </div>
    );
  }
}
```





